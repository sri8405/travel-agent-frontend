"""
Sarvam 105B client.
Sends constructed prompts to the Sarvam AI chat completions API
and parses the structured JSON recommendation.
Falls back to mock responses when the API key is missing or the call fails.
"""

import json
import logging

import httpx

from config import settings
from mock_responses import mock_ai_recommendation

logger = logging.getLogger("ai-gateway.sarvam")


async def get_ai_recommendation(
    system_prompt: str,
    user_prompt: str,
) -> dict:
    """
    Call Sarvam 105B to generate a travel recommendation.

    Returns a dict with keys: recommendation, confidence, reason.
    Falls back to mock data if the API key is missing or the call fails.
    """

    # Guard: no API key → use mock
    if not settings.sarvam_api_key:
        logger.warning("SARVAM_API_KEY not set. Using mock AI response.")
        return mock_ai_recommendation()

    headers = {
        "Content-Type": "application/json",
        "api-subscription-key": settings.sarvam_api_key,
    }

    payload = {
        "model": "sarvam-m4",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    }

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                settings.sarvam_api_url,
                headers=headers,
                json=payload,
            )
            response.raise_for_status()

            data = response.json()
            content = data["choices"][0]["message"]["content"]

            # The model is instructed to return JSON.
            # Strip markdown code fences if present.
            content = content.strip()
            if content.startswith("```"):
                # Remove ```json ... ``` wrapper
                lines = content.split("\n")
                lines = [
                    line
                    for line in lines
                    if not line.strip().startswith("```")
                ]
                content = "\n".join(lines)

            recommendation = json.loads(content)
            logger.info("Sarvam 105B responded successfully.")
            return recommendation

    except (httpx.HTTPError, json.JSONDecodeError, KeyError, Exception) as exc:
        if settings.use_mocks:
            logger.warning(
                "Sarvam API call failed (%s). Using mock AI response.", exc
            )
            return mock_ai_recommendation()
        raise RuntimeError(
            f"Sarvam API call failed and mocks are disabled: {exc}"
        ) from exc
