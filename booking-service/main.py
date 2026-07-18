# Fixed port 8002 — see team port map in README (booking=8002, privacy=8003, gateway=8000, frontend=3000)
import logging
import uvicorn
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from schemas import BookingRequest, BookingContextResponse, BookingContext, DatesModel, ErrorResponse
from normalizer import (
    derive_budget_tier,
    compute_duration,
    parse_iso_date
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("booking_service")

app = FastAPI(
    title="IntentOS Booking Context Service",
    description="Microservice to normalize and validate raw booking requests into clean booking context for AI processing.",
    version="1.0.0"
)

# CORS: only the AI Gateway calls this service directly (server-to-server).
# Wildcard is NOT needed in the real flow, but left permissive here for local
# curl/Postman testing during hackathon dev. Tighten to the Gateway's actual
# origin/port before demo day if time allows.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "*"],  # 8000 = AI Gateway (Person 3)
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    """
    Liveness probe for the AI Gateway and status check.
    """
    return {"status": "ok"}

@app.post(
    "/booking-context",
    response_model=BookingContextResponse,
    status_code=status.HTTP_200_OK,
    responses={
        422: {"model": ErrorResponse, "description": "Validation Error"}
    }
)
def get_booking_context(request: BookingRequest):
    """
    Normalizes the input booking details into a structured context.
    """
    # 1. Normalize dates and compute duration
    dates_out = None
    duration_days = None

    if request.dates:
        start = request.dates.start_date
        end = request.dates.end_date
        
        start_dt = parse_iso_date(start)
        end_dt = parse_iso_date(end)
        
        if start_dt and end_dt and start_dt <= end_dt:
            dates_out = DatesModel(
                start_date=start_dt.strftime("%Y-%m-%d"),
                end_date=end_dt.strftime("%Y-%m-%d")
            )
            duration_days = compute_duration(
                start_dt.strftime("%Y-%m-%d"),
                end_dt.strftime("%Y-%m-%d")
            )
        else:
            logger.warning(
                f"Invalid or out-of-order dates: start_date={start}, end_date={end}. Setting dates context to null."
            )

    # 2. Derive budget tier
    budget_tier = derive_budget_tier(request.budget)

    # 3. Build the response context
    # trip_type defaults to "Vacation". In the future, business rules could infer "Business"
    # (e.g., if travellers == 1 and duration_days < 4).
    booking_context = BookingContext(
        origin=request.source,
        destination=request.destination,
        budget=request.budget,
        budget_tier=budget_tier,
        trip_type="Vacation",
        travellers=request.travellers,
        duration_days=duration_days,
        dates=dates_out
    )

    return BookingContextResponse(booking_context=booking_context)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)
