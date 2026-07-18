"""
Booking Service client.
Calls the external Booking Service to normalize raw trip request data.
Falls back to mock responses when the service is unavailable and USE_MOCKS is enabled.
"""

import logging

import httpx

from config import settings
from models import BookingContext, TripRequest
from mock_responses import mock_booking_context

logger = logging.getLogger("ai-gateway.booking")


async def get_booking_context(request: TripRequest) -> BookingContext:
    """
    Call the Booking Service to normalize the trip request into a BookingContext.

    Falls back to a locally-computed mock if the service is unreachable
    and USE_MOCKS is enabled.
    """
    url = f"{settings.booking_service_url}/booking-context"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=request.model_dump())
            response.raise_for_status()
            data = response.json()
            logger.info("Booking Service responded successfully.")
            return BookingContext(**data)

    except (httpx.HTTPError, httpx.ConnectError, Exception) as exc:
        if settings.use_mocks:
            logger.warning(
                "Booking Service unavailable (%s). Using mock response.", exc
            )
            return mock_booking_context(request)
        raise RuntimeError(
            f"Booking Service at {url} is unreachable and mocks are disabled."
        ) from exc
