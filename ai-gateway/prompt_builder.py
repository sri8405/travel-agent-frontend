"""
Prompt Builder for the AI Gateway.
Constructs the system and user prompts sent to Sarvam 105B,
using only the privacy-safe TravelerPersona (no PII).
"""

from models import BookingContext, TravelerPersona


SYSTEM_PROMPT = """\
You are an expert travel planning AI for a premium airline.
Given a privacy-safe traveler profile and trip details, recommend:
1. The best flight option
2. A suitable hotel
3. A detailed day-by-day itinerary

Rules:
- Never ask for or reference any personally identifiable information.
- All dining suggestions must respect the traveler's meal preference.
- Match the experience level to the budget tier.
- Provide practical, actionable recommendations.

You MUST respond with valid JSON in exactly this format (no markdown, no extra text):
{
    "recommendation": {
        "flight": "<airline and flight details>",
        "hotel": "<hotel name, room type, and location>",
        "itinerary": [
            {
                "day": 1,
                "title": "<day title>",
                "activities": ["<activity 1>", "<activity 2>", "..."]
            }
        ]
    },
    "confidence": <integer 0-100>,
    "reason": "<brief explanation of why these recommendations fit the traveler>"
}
"""


def build_user_prompt(
    booking: BookingContext,
    persona: TravelerPersona,
) -> str:
    """
    Build the user-facing prompt from booking context and traveler persona.
    This prompt contains ZERO PII — only abstract travel attributes.
    """
    return f"""\
Plan a trip with the following details:

**Trip Details:**
- Source: {booking.source}
- Destination: {booking.destination}
- Travel Dates: {booking.start_date} to {booking.end_date} ({booking.trip_duration_days} days)
- Budget: {booking.currency} {booking.budget:,.0f}
- Number of Travelers: {booking.num_travelers}

**Traveler Profile (Privacy-Safe):**
- Traveler Type: {persona.traveler_type}
- Age Group: {persona.age_group}
- Meal Preference: {persona.meal_preference}
- Travel Style: {persona.travel_style}
- Budget Tier: {persona.budget_tier}

Provide your recommendation as JSON.
"""
