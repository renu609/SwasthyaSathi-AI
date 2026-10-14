import os
import re
import logging
from typing import List, Dict, Any, Optional

logger = logging.getLogger("swasthya_sathi.gemini")

# Language code to display name mapping (English and Telugu only)
LANGUAGE_NAMES = {
    "en": "English",
    "te": "Telugu (తెలుగు)"
}

# Red flag emergency keywords for safety tagging
EMERGENCY_KEYWORDS = [
    r"\b(chest pain|heart attack|cardiac arrest)\b",
    r"\b(cannot breathe|can't breathe|severe shortness of breath|gasping|choking)\b",
    r"\b(unconscious|unresponsive|collapsed|passed out|fainted)\b",
    r"\b(heavy bleeding|hemorrhage|postpartum hemorrhage|bleeding profusely)\b",
    r"\b(seizure|convulsion|eclampsia|fits)\b",
    r"\b(stroke|paralysis|facial drooping|slurred speech)\b",
    r"\b(severe dehydration|sunken eyes.*unable to drink|lethargic infant)\b",
    r"\b(bp\s*(1[6-9]\d|2\d\d)\/([1-9]\d\d))\b",  # Severe hypertension
    # Telugu emergency keywords
    r"(ఛాతీ నొప్పి|గుండెపోటు|శ్వాస ఆడకపోవడం|రక్తస్రావం|మూర్ఛ|ఫిట్స్|స్పృహ తప్పడం|తీవ్ర రక్తపోటు|తీవ్ర నిర్జలీకరణం|కళ్లు తిరగడం)"
]

def check_emergency_indicators(text: str) -> bool:
    """Check if the text contains potential acute emergency red flags."""
    text_lower = text.lower()
    for pattern in EMERGENCY_KEYWORDS:
        if re.search(pattern, text_lower, re.IGNORECASE):
            return True
    return False

def sanitize_user_input(text: str) -> str:
    """
    Remove obvious personal identifiable information (PII) like full phone numbers
    or Aadhaar numbers before sending to AI provider.
    """
    if not text:
        return ""
    # Mask 12-digit Aadhaar-like numbers: 1234 5678 9012 or 1234-5678-9012
    text = re.sub(r"\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b", "[REDACTED_ID]", text)
    # Mask 10-digit Indian phone numbers
    text = re.sub(r"\b(\+91[\-\s]?)?[6-9]\d{9}\b", "[REDACTED_PHONE]", text)
    return text.strip()

def build_system_instruction(language_code: str) -> str:
    """Construct a rigorous healthcare safety prompt tailored to the selected language."""
    target_lang = LANGUAGE_NAMES.get(language_code, "English")

    return f"""You are SwasthyaSathi AI (స్వాస్థ్యసాథి), an intelligent clinical triage and health education companion designed for frontline health workers (ASHAs, ANMs, Anganwadi workers) and rural community members in India.

LANGUAGE REQUIREMENT:
- You MUST respond strictly in {target_lang}.
- For Telugu ('te'): You MUST respond in clean, natural, grammatically correct Telugu script (తెలుగు). Use clear words suitable for rural families and frontline workers. Keep standard medical abbreviations recognizable (e.g., BP, ORS, IFA, PHC, 108).
- For English ('en'): Respond in plain, clear, accessible English.

CRITICAL HEALTHCARE SAFETY RULES:
1. Triage & Educational Guidance Only: Provide clear health education, danger signs, preventive guidance, and home-based supportive care. NEVER state a definitive medical diagnosis. NEVER prescribe prescription-only antibiotics, steroids, or controlled medications.
2. Emergency Red Flags: If symptoms describe an acute emergency (such as severe chest pain, breathing difficulty, heavy postpartum bleeding, eclampsia / high BP > 160/110 with headache and visual disturbances, infant lethargy with sunken eyes, or seizures), PROMINENTLY warn the user first and advise immediate transport via 108 Ambulance or emergency PHC/CHC medical officer care.
3. Frontline Health Context: Format advice in simple, actionable bullet points suitable for a frontline worker doorstep visit. Mention standard public health resources when relevant (e.g., ORS + Zinc for diarrhea, Iron Folic Acid for anemia, Mother and Child Protection Card).
4. Truthfulness & Accuracy: Do NOT invent fake medical citations or study numbers.
5. Medical Demarcation: Remind the user that this guidance is an advisory educational tool and cannot replace an in-person examination by a certified doctor.
"""

class GeminiService:
    def __init__(self):
        self._client = None
        self._model_name = None
        self._api_key = None
        self._base_url = None

    def initialize(self) -> bool:
        """Initialize the Google Gen AI client from environment variables."""
        api_key = os.environ.get("GEMINI_API_KEY", "").strip()
        model_name = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash").strip()
        base_url = os.environ.get("GEMINI_API_BASE_URL", "").strip()

        self._api_key = api_key
        self._model_name = model_name
        self._base_url = base_url if base_url else None

        if not api_key:
            logger.warning("GEMINI_API_KEY is not set. Gemini API calls will be disabled until configured.")
            self._client = None
            return False

        try:
            from google import genai
            http_options = {"base_url": self._base_url} if self._base_url else None
            self._client = genai.Client(api_key=self._api_key, http_options=http_options)
            logger.info("Google Gen AI client successfully initialized with model: %s", self._model_name)
            return True
        except Exception as e:
            logger.error("Failed to initialize Google Gen AI Client: %s", str(e))
            self._client = None
            return False

    def is_configured(self) -> bool:
        """Check if client is configured with an API key."""
        if self._client is None:
            # Try re-initializing in case .env was updated
            return self.initialize()
        return bool(self._api_key)

    def get_model_name(self) -> str:
        return self._model_name or os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")

    def generate_chat_response(
        self,
        message: str,
        history: Optional[List[Dict[str, str]]] = None,
        language: str = "en"
    ) -> Dict[str, Any]:
        """
        Generate a multi-turn conversational response using Gemini.
        Returns a dict with success status, text, emergency flag, or structured error.
        """
        if not self.is_configured():
            return {
                "success": False,
                "error": "Gemini API key is not configured in backend/.env. Please set GEMINI_API_KEY to enable live AI responses.",
                "error_type": "MISSING_API_KEY",
                "status_code": 503
            }

        sanitized_message = sanitize_user_input(message)
        if not sanitized_message:
            return {
                "success": False,
                "error": "Message content cannot be empty.",
                "error_type": "VALIDATION_ERROR",
                "status_code": 400
            }

        is_emergency = check_emergency_indicators(sanitized_message)

        # Build contents list for multi-turn history
        # google-genai supports list of contents or dicts: {'role': 'user'|'model', 'parts': [{'text': ...}]}
        contents = []

        if history:
            # Take up to the last 10 turns to avoid exceeding context or token limits
            recent_history = history[-10:]
            for turn in recent_history:
                role = turn.get("role", "user")
                # Normalize role
                api_role = "model" if role in ("assistant", "model") else "user"
                content_text = sanitize_user_input(turn.get("content", ""))
                if content_text:
                    contents.append({
                        "role": api_role,
                        "parts": [{"text": content_text}]
                    })

        # Append current user prompt
        contents.append({
            "role": "user",
            "parts": [{"text": sanitized_message}]
        })

        system_instruction = build_system_instruction(language)

        try:
            from google.genai import types, errors

            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.3,  # Low temperature for clinical safety and consistency
                max_output_tokens=1024,
            )

            response = self._client.models.generate_content(
                model=self._model_name,
                contents=contents,
                config=config,
            )

            response_text = response.text or ""
            if not response_text:
                response_text = "I received your message, but no response text was generated. Please verify your query or consult your nearest healthcare supervisor."

            # Check if response also indicates emergency
            if check_emergency_indicators(response_text):
                is_emergency = True

            return {
                "success": True,
                "text": response_text,
                "model": self._model_name,
                "language": language,
                "is_emergency": is_emergency
            }

        except Exception as e:
            # Check for APIError from google.genai
            error_str = str(e)
            logger.error("Gemini API error during chat generation: %s", error_str)

            error_type = "API_ERROR"
            status_code = 500
            user_friendly_msg = "An unexpected error occurred while communicating with the AI service."

            # Determine specific error category
            if "401" in error_str or "403" in error_str or "API_KEY_INVALID" in error_str or "PERMISSION_DENIED" in error_str:
                error_type = "INVALID_API_KEY"
                status_code = 401
                user_friendly_msg = "The configured Gemini API key is invalid or unauthorized. Please verify the key in backend/.env."
            elif "404" in error_str or "NOT_FOUND" in error_str or "model" in error_str.lower():
                error_type = "MODEL_NOT_FOUND"
                status_code = 404
                user_friendly_msg = f"The requested model '{self._model_name}' was not found or is unavailable to your API key. Try setting GEMINI_MODEL=gemini-2.5-flash or gemini-1.5-flash in backend/.env."
            elif "429" in error_str or "RESOURCE_EXHAUSTED" in error_str or "quota" in error_str.lower():
                error_type = "RATE_LIMIT_EXCEEDED"
                status_code = 429
                user_friendly_msg = "The Gemini API rate limit or quota has been reached. Please wait a moment before trying again."
            elif "500" in error_str or "503" in error_str or "UNAVAILABLE" in error_str:
                error_type = "PROVIDER_OUTAGE"
                status_code = 503
                user_friendly_msg = "The Gemini AI service is temporarily unavailable. Please retry in a few moments."
            elif "timeout" in error_str.lower() or "connection" in error_str.lower():
                error_type = "NETWORK_ERROR"
                status_code = 504
                user_friendly_msg = "Network connection timeout reaching Gemini API. Check your internet connection."

            return {
                "success": False,
                "error": user_friendly_msg,
                "error_type": error_type,
                "status_code": status_code,
                "model": self._model_name
            }

# Singleton instance
gemini_service = GeminiService()
