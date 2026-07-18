"""
Privacy Service client.
Calls the external Privacy Service to convert raw customer data
into a privacy-preserving TravelerPersona (no PII).
Falls back to mock responses when the service is unavailable and USE_MOCKS is enabled.
"""

import logging

import httpx

from config import settings
from models import TravelerPersona, TripRequest
from mock_responses import mock_traveler_persona

logger = logging.getLogger("ai-gateway.privacy")


async def get_traveler_persona(request: TripRequest) -> TravelerPersona:
    """
    Call the Privacy Service to generate a PII-free traveler persona.

    Falls back to a locally-computed mock if the service is unreachable
    and USE_MOCKS is enabled.
    """
    url = f"{settings.privacy_service_url}/generate-persona"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=request.model_dump())
            response.raise_for_status()
            data = response.json()
            logger.info("Privacy Service responded successfully.")
            return TravelerPersona(**data)

    except (httpx.HTTPError, httpx.ConnectError, Exception) as exc:
        if settings.use_mocks:
            logger.warning(
                "Privacy Service unavailable (%s). Using mock response.", exc
            )
            return mock_traveler_persona(request)
        raise RuntimeError(
            f"Privacy Service at {url} is unreachable and mocks are disabled."
        ) from exc
