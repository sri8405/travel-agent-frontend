import pytest
from normalizer import (
    clean_budget,
    normalize_place_name,
    compute_duration,
    derive_budget_tier
)

def test_clean_budget():
    # Int and float inputs
    assert clean_budget(300000) == 300000
    assert clean_budget(300000.0) == 300000
    
    # String inputs with symbols/commas
    assert clean_budget("₹3,00,000") == 300000
    assert clean_budget("300000") == 300000
    assert clean_budget(" $ 1,500.50 ") == 1500
    
    # Invalid budgets
    with pytest.raises(ValueError):
        clean_budget(0)
    with pytest.raises(ValueError):
        clean_budget(-100)
    with pytest.raises(ValueError):
        clean_budget("not-a-number")
    with pytest.raises(ValueError):
        clean_budget("")

def test_normalize_place_name():
    assert normalize_place_name(" bengaluru ") == "Bengaluru"
    assert normalize_place_name("TOKYO") == "Tokyo"
    assert normalize_place_name("new york") == "New York"
    
    with pytest.raises(ValueError):
        normalize_place_name("")
    with pytest.raises(ValueError):
        normalize_place_name("   ")

def test_compute_duration():
    # Valid range
    assert compute_duration("2026-09-10", "2026-09-18") == 8
    assert compute_duration("2026-09-10", "2026-09-10") == 0
    
    # Invalid date order
    assert compute_duration("2026-09-18", "2026-09-10") is None
    
    # Malformed inputs
    assert compute_duration("invalid-date", "2026-09-10") is None
    assert compute_duration("2026-09-10", None) is None

def test_derive_budget_tier():
    # < 50,000 -> Budget
    assert derive_budget_tier(49999) == "Budget"
    
    # 50,000 – 1,50,000 -> Standard
    assert derive_budget_tier(50000) == "Standard"
    assert derive_budget_tier(150000) == "Standard"
    
    # 1,50,000 – 3,50,000 -> Premium
    assert derive_budget_tier(150001) == "Premium"
    assert derive_budget_tier(300000) == "Premium"
    assert derive_budget_tier(350000) == "Premium"
    
    # > 3,50,000 -> Luxury
    assert derive_budget_tier(350001) == "Luxury"
    assert derive_budget_tier(500000) == "Luxury"
