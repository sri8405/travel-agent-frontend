"""
Pydantic models for the AI Gateway request/response schemas.
"""

from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, Field


# ──────────────────────────────────────────────
#  Frontend → AI Gateway
# ──────────────────────────────────────────────

class TravelDates(BaseModel):
    start: str = Field(..., description="Trip start date (YYYY-MM-DD)")
    end: str = Field(..., description="Trip end date (YYYY-MM-DD)")


class TripRequest(BaseModel):
    """Raw booking request from the frontend — may contain PII."""

    customer_name: str = Field(..., description="Customer full name")
    source: str = Field(..., description="Departure city")
    destination: str = Field(..., description="Destination city")
    travel_dates: TravelDates
    budget: float = Field(..., gt=0, description="Total budget amount")
    currency: str = Field(default="INR", description="Budget currency code")
    num_travelers: int = Field(..., ge=1, description="Number of travelers")
    meal_preference: str = Field(default="No Preference", description="Dietary preference")

    # PII fields — will be stripped before AI inference
    passport_number: Optional[str] = Field(default=None, description="Passport number (PII)")
    phone: Optional[str] = Field(default=None, description="Phone number (PII)")
    email: Optional[str] = Field(default=None, description="Email address (PII)")
    loyalty_id: Optional[str] = Field(default=None, description="Loyalty program ID (PII)")


# ──────────────────────────────────────────────
#  Booking Service response
# ──────────────────────────────────────────────

class BookingContext(BaseModel):
    """Normalized booking context returned by the Booking Service."""

    source: str
    destination: str
    start_date: str
    end_date: str
    budget: float
    currency: str
    num_travelers: int
    meal_preference: str
    trip_duration_days: int


# ──────────────────────────────────────────────
#  Privacy Service response
# ──────────────────────────────────────────────

class TravelerPersona(BaseModel):
    """Privacy-preserving traveler persona — no PII."""

    traveler_type: str = Field(..., description="e.g. Solo, Couple, Family, Group")
    age_group: str = Field(..., description="e.g. 18-24, 25-35, 36-50, 50+")
    meal_preference: str
    travel_style: str = Field(..., description="e.g. Leisure, Adventure, Business, Cultural")
    budget_tier: str = Field(..., description="e.g. Budget, Mid-Range, Premium, Luxury")
    num_travelers: int


# ──────────────────────────────────────────────
#  AI Recommendation
# ──────────────────────────────────────────────

class ItineraryDay(BaseModel):
    day: int
    title: str
    activities: list[str]


class Recommendation(BaseModel):
    flight: str
    hotel: str
    itinerary: list[ItineraryDay]


class TripResponse(BaseModel):
    """Final response sent back to the frontend."""

    recommendation: Recommendation
    confidence: int = Field(..., ge=0, le=100)
    reason: str
    persona_used: TravelerPersona
    pii_fields_removed: list[str]
