from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, Field, field_validator, model_validator
from datetime import datetime

from normalizer import clean_budget, normalize_place_name, parse_iso_date, BudgetTier

class DatesModel(BaseModel):
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class BookingRequest(BaseModel):
    source: Any
    destination: Any
    budget: Any
    travellers: Any
    dates: Optional[DatesModel] = None

    @field_validator("source")
    @classmethod
    def validate_source(cls, v: Any) -> str:
        try:
            return normalize_place_name(v)
        except ValueError as e:
            raise ValueError(str(e))

    @field_validator("destination")
    @classmethod
    def validate_destination(cls, v: Any) -> str:
        try:
            return normalize_place_name(v)
        except ValueError as e:
            raise ValueError(str(e))

    @model_validator(mode="after")
    def validate_places_not_equal(self) -> "BookingRequest":
        src = self.source
        dest = self.destination
        if isinstance(src, str) and isinstance(dest, str):
            if src.lower() == dest.lower():
                raise ValueError("Source and destination cannot be identical")
        return self

    @field_validator("budget")
    @classmethod
    def validate_budget(cls, v: Any) -> int:
        try:
            return clean_budget(v)
        except ValueError as e:
            raise ValueError(str(e))

    @field_validator("travellers")
    @classmethod
    def validate_travellers(cls, v: Any) -> int:
        # Coerce to integer
        if v is None:
            raise ValueError("Travellers is required")
        try:
            val = int(v)
        except (ValueError, TypeError):
            raise ValueError("Travellers must be a valid integer")
        
        if val < 1:
            raise ValueError("Travellers must be greater than or equal to 1")
        return val


class BookingContext(BaseModel):
    origin: str
    destination: str
    budget: int
    budget_tier: BudgetTier
    trip_type: str = "Vacation"
    travellers: int
    duration_days: Optional[int] = None
    dates: Optional[DatesModel] = None


class BookingContextResponse(BaseModel):
    booking_context: BookingContext


class ErrorDetail(BaseModel):
    loc: List[Union[str, int]]
    msg: str
    type: str

class ErrorResponse(BaseModel):
    detail: List[ErrorDetail]
