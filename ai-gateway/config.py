from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """
    AI Gateway configuration.
    All values can be overridden via environment variables or a .env file.
    """

    # -- Sarvam AI --
    sarvam_api_key: str = Field(
        default="",
        description="Sarvam AI subscription key for authentication",
    )
    sarvam_api_url: str = Field(
        default="https://api.sarvam.ai/chat/completions",
        description="Sarvam 105B chat completions endpoint",
    )

    # -- Downstream Services --
    booking_service_url: str = Field(
        default="http://localhost:8001",
        description="Base URL of the Booking Service",
    )
    privacy_service_url: str = Field(
        default="http://localhost:8002",
        description="Base URL of the Privacy Service",
    )

    # -- Feature Flags --
    use_mocks: bool = Field(
        default=True,
        description="Fall back to mock responses when downstream services are unavailable",
    )

    # -- Server --
    gateway_port: int = Field(
        default=8000,
        description="Port on which the AI Gateway listens",
    )

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
    }


# Singleton instance — import this wherever you need settings.
settings = Settings()
