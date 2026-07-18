"""
Realistic mock/fallback responses for standalone development.
Used when downstream services are unavailable and USE_MOCKS=true.
"""

from models import (
    BookingContext,
    ItineraryDay,
    Recommendation,
    TravelerPersona,
    TripRequest,
)


def mock_booking_context(request: TripRequest) -> BookingContext:
    """Generate a mock booking context from the raw request."""
    from datetime import datetime

    start = datetime.strptime(request.travel_dates.start, "%Y-%m-%d")
    end = datetime.strptime(request.travel_dates.end, "%Y-%m-%d")
    duration = (end - start).days

    return BookingContext(
        source=request.source,
        destination=request.destination,
        start_date=request.travel_dates.start,
        end_date=request.travel_dates.end,
        budget=request.budget,
        currency=request.currency,
        num_travelers=request.num_travelers,
        meal_preference=request.meal_preference,
        trip_duration_days=max(duration, 1),
    )


def mock_traveler_persona(request: TripRequest) -> TravelerPersona:
    """Generate a mock privacy-preserving persona from the raw request."""

    # Derive traveler type from number of travelers
    n = request.num_travelers
    if n == 1:
        traveler_type = "Solo"
    elif n == 2:
        traveler_type = "Couple"
    elif n <= 4:
        traveler_type = "Family"
    else:
        traveler_type = "Group"

    # Derive budget tier from budget amount (INR)
    if request.budget < 100_000:
        budget_tier = "Budget"
    elif request.budget < 200_000:
        budget_tier = "Mid-Range"
    elif request.budget < 500_000:
        budget_tier = "Premium"
    else:
        budget_tier = "Luxury"

    return TravelerPersona(
        traveler_type=traveler_type,
        age_group="25-35",
        meal_preference=request.meal_preference,
        travel_style="Leisure",
        budget_tier=budget_tier,
        num_travelers=request.num_travelers,
    )


def mock_ai_recommendation() -> dict:
    """Return a realistic mock recommendation for a Tokyo trip."""
    return {
        "recommendation": Recommendation(
            flight="Air India AI-305 (BLR → NRT, Direct) — Departs 23:30, Arrives 11:15+1",
            hotel="Hotel Gracery Shinjuku, Tokyo — Premium Double Room with City View",
            itinerary=[
                ItineraryDay(
                    day=1,
                    title="Arrival & Shinjuku Exploration",
                    activities=[
                        "Arrive at Narita International Airport",
                        "Take Narita Express to Shinjuku Station",
                        "Check in at Hotel Gracery Shinjuku",
                        "Evening walk through Shinjuku Gyoen National Garden",
                        "Vegetarian dinner at Ain Soph Journey (plant-based restaurant)",
                    ],
                ),
                ItineraryDay(
                    day=2,
                    title="Traditional Tokyo",
                    activities=[
                        "Morning visit to Senso-ji Temple in Asakusa",
                        "Explore Nakamise Shopping Street",
                        "Vegetarian lunch at T's TanTan (Tokyo Station)",
                        "Afternoon at teamLab Borderless digital art museum",
                        "Evening stroll along Sumida River",
                    ],
                ),
                ItineraryDay(
                    day=3,
                    title="Harajuku & Shibuya",
                    activities=[
                        "Meiji Shrine morning visit",
                        "Walk down Takeshita Street in Harajuku",
                        "Vegetarian lunch at Afuri Ramen (veggie option)",
                        "Shibuya Crossing experience",
                        "Shopping at Shibuya 109 & PARCO",
                    ],
                ),
                ItineraryDay(
                    day=4,
                    title="Day Trip to Hakone",
                    activities=[
                        "Take Romance Car to Hakone",
                        "Hakone Open-Air Museum",
                        "Cruise on Lake Ashi",
                        "View Mt. Fuji from Owakudani",
                        "Return to Tokyo by evening",
                    ],
                ),
                ItineraryDay(
                    day=5,
                    title="Akihabara & Ueno",
                    activities=[
                        "Morning at Ueno Park & Tokyo National Museum",
                        "Vegetarian lunch at Komaki Shokudo in Ueno",
                        "Afternoon exploring Akihabara electronics district",
                        "Evening at an Akihabara themed café",
                    ],
                ),
                ItineraryDay(
                    day=6,
                    title="Day Trip to Kamakura",
                    activities=[
                        "Train to Kamakura (1 hour)",
                        "Visit the Great Buddha (Kotoku-in)",
                        "Explore Hase-dera Temple",
                        "Walk along Yuigahama Beach",
                        "Vegetarian dinner back in Tokyo at Ain Soph Ripple",
                    ],
                ),
                ItineraryDay(
                    day=7,
                    title="Tsukiji & Ginza",
                    activities=[
                        "Morning at Tsukiji Outer Market (vegetarian street food)",
                        "Walk through Ginza shopping district",
                        "Lunch at Itadaki Zen (vegan Japanese fine dining)",
                        "Afternoon at Mori Art Museum in Roppongi",
                        "Tokyo Tower sunset view",
                    ],
                ),
                ItineraryDay(
                    day=8,
                    title="Odaiba & Departure Prep",
                    activities=[
                        "Visit Odaiba — Statue of Liberty replica & Rainbow Bridge",
                        "TeamLab Planets immersive experience",
                        "Vegetarian lunch at DiverCity food court",
                        "Afternoon souvenir shopping in Shinjuku",
                        "Pack and prepare for departure",
                    ],
                ),
                ItineraryDay(
                    day=9,
                    title="Departure",
                    activities=[
                        "Early breakfast at hotel",
                        "Narita Express to airport",
                        "Departure via Air India AI-306 (NRT → BLR)",
                    ],
                ),
            ],
        ),
        "confidence": 94,
        "reason": (
            "Recommended based on Premium budget tier allowing high-quality accommodations "
            "and experiences. Itinerary balances cultural immersion with leisure activities "
            "suitable for a couple. All dining recommendations cater to vegetarian preferences "
            "with highly-rated plant-based restaurants in Tokyo. Day trips to Hakone and "
            "Kamakura provide variety while keeping the home base in Shinjuku for convenience."
        ),
    }
