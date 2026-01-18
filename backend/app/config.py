import json
from pathlib import Path
from functools import lru_cache


class Settings:
    def __init__(self):
        self.config_file = Path("/app/config/email_config.json")

    def get_email_config(self):
        if self.config_file.exists():
            with open(self.config_file) as f:
                return json.load(f)
        return {
            "host": "smtp.gmail.com",
            "port": 587,
            "user": "",
            "password": "",
            "from_email": "noreply@ayoya.bj"
        }


@lru_cache()
def get_settings():
    return Settings()
