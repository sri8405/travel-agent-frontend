import re
from datetime import datetime
from enum import Enum
from typing import Any, Optional

# Budget Tier Constants
BUDGET_BUDGET_LIMIT = 50000
BUDGET_STANDARD_LIMIT = 150000
BUDGET_PREMIUM_LIMIT = 350000

class BudgetTier(str, Enum):
    BUDGET = "Budget"
    STANDARD = "Standard"
    PREMIUM = "Premium"
    LUXURY = "Luxury"

def clean_budget(budget: Any) -> int:
    """
    Coerce the budget raw input to a clean positive integer.
    Removes currency symbols, commas, and whitespace.
    Raises ValueError for non-positive or unparseable values.
    """
    if budget is None:
        raise ValueError("Budget is required")
        
    if isinstance(budget, (int, float)):
        val = int(budget)
        if val <= 0:
            raise ValueError("Budget must be a positive number")
        return val

    if not isinstance(budget, str):
        raise ValueError("Budget must be a string or number")

    # Clean string: remove commas, currency symbols, and whitespace
    cleaned = re.sub(r"[^\d\.]", "", budget)
    if not cleaned:
        raise ValueError(f"Could not parse budget: {budget}")

    try:
        val = int(float(cleaned))
    except ValueError:
        raise ValueError(f"Could not parse budget: {budget}")

    if val <= 0:
        raise ValueError("Budget must be a positive number")

    return val

def normalize_place_name(name: Any) -> str:
    """
    Trims whitespace and title-cases the place name.
    Raises ValueError if the name is empty or invalid.
    """
    if not isinstance(name, str):
        raise ValueError("Place name must be a string")
    
    cleaned = name.strip()
    if not cleaned:
        raise ValueError("Place name cannot be empty")
        
    return cleaned.title()

def parse_iso_date(date_str: Any) -> Optional[datetime]:
    """
    Parses a date string in ISO 8601 format (YYYY-MM-DD).
    Returns a datetime object or None if invalid.
    """
    if not isinstance(date_str, str):
        return None
    try:
        # Simple ISO date check YYYY-MM-DD
        return datetime.strptime(date_str.strip(), "%Y-%m-%d")
    except ValueError:
        return None

def compute_duration(start_date_str: Optional[str], end_date_str: Optional[str]) -> Optional[int]:
    """
    Computes duration in days from start_date to end_date.
    Returns None if dates are invalid or start_date > end_date.
    """
    if not start_date_str or not end_date_str:
        return None
        
    start_dt = parse_iso_date(start_date_str)
    end_dt = parse_iso_date(end_date_str)
    
    if not start_dt or not end_dt:
        return None
        
    if start_dt > end_dt:
        return None
        
    return (end_dt - start_dt).days

def derive_budget_tier(budget: int) -> BudgetTier:
    """
    Derives budget tier using thresholds in INR:
    - < 50,000 INR (50k) -> Budget
    - 50,000 to 1,50,000 INR (50k - 1.5L) -> Standard
    - 1,50,000 to 3,50,000 INR (1.5L - 3.5L) -> Premium
    - > 3,50,000 INR (3.5L) -> Luxury
    """
    if budget < BUDGET_BUDGET_LIMIT:
        return BudgetTier.BUDGET
    elif budget <= BUDGET_STANDARD_LIMIT:
        return BudgetTier.STANDARD
    elif budget <= BUDGET_PREMIUM_LIMIT:
        return BudgetTier.PREMIUM
    else:
        return BudgetTier.LUXURY
