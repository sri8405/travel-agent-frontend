"""
AI Gateway — IntentOS Central Orchestrator

The single entry point the frontend communicates with.
Orchestrates Booking Service → Privacy Service → Sarvam 105B
and returns a structured travel recommendation.
"""

import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from models import (
    Recommendation,
    ItineraryDay,
    TravelerPersona,
    TripRequest,
    TripResponse,
)
from prompt_builder import SYSTEM_PROMPT, build_user_prompt
from services.booking import get_booking_context
from services.privacy import get_traveler_persona
from services.sarvam import get_ai_recommendation

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(name)-25s | %(levelname)-7s | %(message)s",
)
logger = logging.getLogger("ai-gateway")

# ── FastAPI App ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="IntentOS AI Gateway",
    description="Central orchestrator for the IntentOS Enterprise AI Travel Platform.",
    version="1.0.0",
)

# CORS — allow the Next.js frontend to call us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── PII field names that must never reach the LLM ───────────────────────────
PII_FIELDS = ["customer_name", "passport_number", "phone", "email", "loyalty_id"]


# ── Endpoints ────────────────────────────────────────────────────────────────

@app.get("/health")
async def health_check():
    """Simple health/readiness probe."""
    return {
        "status": "healthy",
        "service": "ai-gateway",
        "use_mocks": settings.use_mocks,
        "sarvam_key_set": bool(settings.sarvam_api_key),
    }


@app.post("/plan-trip", response_model=TripResponse)
async def plan_trip(request: TripRequest):
    """
    Main orchestration endpoint.

    Flow:
        1. Receive TripRequest from the frontend
        2. Call Booking Service → BookingContext
        3. Call Privacy Service → TravelerPersona (PII-free)
        4. Build prompt from BookingContext + TravelerPersona
        5. Call Sarvam 105B → AI recommendation
        6. Assemble & return TripResponse
    """
    logger.info(
        "▶ /plan-trip called — %s → %s (%d travelers)",
        request.source,
        request.destination,
        request.num_travelers,
    )

    # Identify which PII fields were present in the request
    pii_removed = [
        field for field in PII_FIELDS
        if getattr(request, field, None) is not None
    ]

    try:
        # ① Booking context
        logger.info("  ① Calling Booking Service …")
        booking_ctx = await get_booking_context(request)
        logger.info("  ✔ Booking context received (duration=%d days)", booking_ctx.trip_duration_days)

        # ② Privacy persona
        logger.info("  ② Calling Privacy Service …")
        persona = await get_traveler_persona(request)
        logger.info("  ✔ Persona generated: %s / %s / %s", persona.traveler_type, persona.budget_tier, persona.travel_style)

        # ③ Build prompt (zero PII)
        logger.info("  ③ Building prompt …")
        user_prompt = build_user_prompt(booking_ctx, persona)
        logger.info("  ✔ Prompt built (%d chars). PII fields removed: %s", len(user_prompt), pii_removed)

        # ④ Call Sarvam 105B
        logger.info("  ④ Calling Sarvam 105B …")
        ai_result = await get_ai_recommendation(SYSTEM_PROMPT, user_prompt)
        logger.info("  ✔ AI recommendation received.")

        # ⑤ Assemble response
        # Handle both dict and model returns from the AI/mock
        rec_data = ai_result.get("recommendation", ai_result)

        # If recommendation is already a Recommendation model (from mocks)
        if isinstance(rec_data, Recommendation):
            recommendation = rec_data
        else:
            # Parse from dict (from real AI response)
            itinerary = [
                ItineraryDay(**day) if isinstance(day, dict) else day
                for day in rec_data.get("itinerary", [])
            ]
            recommendation = Recommendation(
                flight=rec_data.get("flight", rec_data.get("recommended_flight", "")),
                hotel=rec_data.get("hotel", rec_data.get("recommended_hotel", "")),
                itinerary=itinerary,
            )

        # Persona: could be a dict or model
        if isinstance(persona, dict):
            persona = TravelerPersona(**persona)

        response = TripResponse(
            recommendation=recommendation,
            confidence=ai_result.get("confidence", 90),
            reason=ai_result.get("reason", ""),
            persona_used=persona,
            pii_fields_removed=pii_removed,
        )

        logger.info("✅ /plan-trip complete — confidence=%d%%", response.confidence)
        return response

    except Exception as exc:
        logger.exception("❌ /plan-trip failed: %s", exc)
        raise HTTPException(status_code=500, detail=str(exc)) from exc


# ── Run with uvicorn ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.gateway_port,
        reload=True,
    )
