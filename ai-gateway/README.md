# AI Gateway — IntentOS Central Orchestrator

The AI Gateway is the **central orchestration service** for IntentOS. It is the only backend the frontend communicates with.

## Architecture

```
Frontend  →  AI Gateway  →  Booking Service
                         →  Privacy Service
                         →  Sarvam 105B
```

## Quick Start

```bash
# 1. Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
copy .env.example .env
# Edit .env with your Sarvam API key and service URLs

# 4. Run the server
uvicorn main:app --reload --port 8000
```

## API Endpoints

### `GET /health`
Health check endpoint.

### `POST /plan-trip`
Main orchestration endpoint. Receives a trip planning request, coordinates with downstream services, and returns AI-powered recommendations.

**Request Body:**
```json
{
    "customer_name": "Rahul Sharma",
    "source": "Bengaluru",
    "destination": "Tokyo",
    "travel_dates": { "start": "2026-08-01", "end": "2026-08-10" },
    "budget": 300000,
    "currency": "INR",
    "num_travelers": 2,
    "meal_preference": "Vegetarian",
    "passport_number": "A1234567",
    "phone": "+91-9876543210",
    "email": "rahul@example.com",
    "loyalty_id": "FF-123456"
}
```

**Response:**
```json
{
    "recommendation": {
        "flight": "Air India AI-305 (BLR → NRT, Direct)",
        "hotel": "Hotel Gracery Shinjuku, Tokyo",
        "itinerary": [
            { "day": 1, "title": "Arrival & Shinjuku", "activities": ["..."] }
        ]
    },
    "confidence": 94,
    "reason": "Selected based on premium budget tier and vegetarian preferences...",
    "persona_used": { "traveler_type": "Couple", "budget_tier": "Premium", "..." : "..." },
    "pii_fields_removed": ["customer_name", "passport_number", "phone", "email", "loyalty_id"]
}
```

## Configuration

| Variable | Default | Description |
|---|---|---|
| `SARVAM_API_KEY` | *(required)* | Sarvam AI subscription key |
| `SARVAM_API_URL` | `https://api.sarvam.ai/chat/completions` | Sarvam API endpoint |
| `BOOKING_SERVICE_URL` | `http://localhost:8001` | Booking service base URL |
| `PRIVACY_SERVICE_URL` | `http://localhost:8002` | Privacy service base URL |
| `USE_MOCKS` | `true` | Use mock responses when services are unavailable |
| `GATEWAY_PORT` | `8000` | Port for the gateway |

## Mock Mode

When `USE_MOCKS=true` (default), the gateway returns realistic mock responses for all downstream services. This lets you develop and test the gateway independently before the other services are ready.
