# IntentOS Booking Context Service

The **Booking Context Service** is a stateless FastAPI microservice built for **IntentOS**. Its sole responsibility is to receive raw, potentially messy trip requests from the **AI Gateway**, then validate, normalize, and return a clean, structured `booking_context` object. 

Within the IntentOS architecture, this service functions as an internal data-cleansing utility. The frontend never communicates with it directly; instead, the AI Gateway orchestrates calls between this service and a Privacy Service before forwarding the compiled context to a Large Language Model (Sarvam 105B) for travel recommendations.

## Requirements

- Python 3.11+
- Dependencies listed in `requirements.txt`

## Running Locally

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the development server (runs on the committed default port `8002`):
   ```bash
   python main.py
   ```
   Or explicitly via Uvicorn:
   ```bash
   uvicorn main:app --reload --port 8002
   ```

3. The API documentation will be available at:
   - Swagger UI: [http://localhost:8002/docs](http://localhost:8002/docs)
   - ReDoc: [http://localhost:8002/redoc](http://localhost:8002/redoc)

## API Endpoints

### 1. Health Check
- **Method / Path:** `GET /health`
- **Response:**
  ```json
  {
    "status": "ok"
  }
  ```

### 2. Get Booking Context
- **Method / Path:** `POST /booking-context`
- **Request Payload:**
  ```json
  {
    "source": "Bengaluru",
    "destination": "Tokyo",
    "budget": "₹3,00,000",
    "travellers": 2,
    "dates": {
      "start_date": "2026-09-10",
      "end_date": "2026-09-18"
    }
  }
  ```
- **Response Payload:**
  ```json
  {
    "booking_context": {
      "origin": "Bengaluru",
      "destination": "Tokyo",
      "budget": 300000,
      "budget_tier": "Premium",
      "trip_type": "Vacation",
      "travellers": 2,
      "duration_days": 8,
      "dates": {
        "start_date": "2026-09-10",
        "end_date": "2026-09-18"
      }
    }
  }
  ```

## Running Tests

Run the test suite using `pytest`:
```bash
pytest
```

## Budget Tier — Shared Contract

This service is the single source of truth for `budget_tier`. Any other service (e.g. Privacy Service) that needs a budget classification should either consume this service's output directly or mirror this exact 4-value enum (`Budget`, `Standard`, `Premium`, `Luxury`) rather than defining its own scale.

