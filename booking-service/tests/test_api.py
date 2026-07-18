import sys
import os
from fastapi.testclient import TestClient

# Add parent directory to sys.path so we can import main
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_happy_path():
    payload = {
        "source": "Bengaluru",
        "destination": "Tokyo",
        "budget": "₹3,00,000",
        "travellers": 2,
        "dates": {
            "start_date": "2026-09-10",
            "end_date": "2026-09-18"
        }
    }
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "booking_context" in data
    bc = data["booking_context"]
    assert bc["origin"] == "Bengaluru"
    assert bc["destination"] == "Tokyo"
    assert bc["budget"] == 300000
    assert bc["budget_tier"] == "Premium"
    assert bc["trip_type"] == "Vacation"
    assert bc["travellers"] == 2
    assert bc["duration_days"] == 8
    assert bc["dates"]["start_date"] == "2026-09-10"
    assert bc["dates"]["end_date"] == "2026-09-18"

def test_missing_fields():
    # Source missing
    payload = {
        "destination": "Tokyo",
        "budget": 300000,
        "travellers": 2
    }
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 422

def test_identical_source_destination():
    payload = {
        "source": "  Tokyo  ",
        "destination": "tokyo",
        "budget": 300000,
        "travellers": 2
    }
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 422
    assert "identical" in response.text.lower()

def test_invalid_budget():
    # Zero budget
    payload = {
        "source": "Bengaluru",
        "destination": "Tokyo",
        "budget": 0,
        "travellers": 2
    }
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 422

    # Negative budget
    payload["budget"] = -500
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 422

    # Unparseable budget
    payload["budget"] = "abc"
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 422

def test_invalid_travellers():
    payload = {
        "source": "Bengaluru",
        "destination": "Tokyo",
        "budget": 300000,
        "travellers": 0
    }
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 422

    payload["travellers"] = -3
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 422

def test_malformed_dates_should_not_fail():
    # start_date > end_date: Should still return 200 with dates = null
    payload = {
        "source": "Bengaluru",
        "destination": "Tokyo",
        "budget": 300000,
        "travellers": 2,
        "dates": {
            "start_date": "2026-09-18",
            "end_date": "2026-09-10"
        }
    }
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 200
    bc = response.json()["booking_context"]
    assert bc["dates"] is None
    assert bc["duration_days"] is None

    # Invalid ISO format: Should still return 200 with dates = null
    payload["dates"] = {
        "start_date": "10-09-2026",
        "end_date": "18-09-2026"
    }
    response = client.post("/booking-context", json=payload)
    assert response.status_code == 200
    bc = response.json()["booking_context"]
    assert bc["dates"] is None
    assert bc["duration_days"] is None
