import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from backend/.env if present
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("swasthya_sathi.app")

from gemini_service import gemini_service

# Initialize Gemini Service
gemini_service.initialize()

app = Flask(__name__)

# Ensure Telugu and Hindi Unicode characters are not escaped to \uXXXX in JSON output
app.json.ensure_ascii = False

# Restrict CORS to development frontend origins
allowed_origins = [
    os.environ.get("CORS_ORIGIN", "http://localhost:3000"),
    "http://127.0.0.1:3000",
    "http://localhost:3000"
]
# Remove duplicates
allowed_origins = list(set(allowed_origins))

CORS(app, resources={r"/api/*": {"origins": allowed_origins}}, supports_credentials=True)

@app.route("/api/health", methods=["GET"])
def health_check():
    """
    Public health check endpoint.
    Exposes service availability without leaking secrets or API keys.
    """
    return jsonify({
        "status": "ok",
        "service": "SwasthyaSathi AI Backend",
        "api_key_configured": gemini_service.is_configured(),
        "model": gemini_service.get_model_name()
    }), 200

@app.route("/api/assistant/chat", methods=["POST"])
def assistant_chat():
    """
    Conversational AI triage endpoint for frontline health workers.
    Accepts:
      {
        "message": "Patient has BP 150/98...",
        "history": [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}],
        "language": "en" | "te"
      }
    """
    if not request.is_json:
        return jsonify({
            "success": False,
            "error": "Request body must be valid JSON.",
            "error_type": "INVALID_JSON"
        }), 400

    data = request.get_json()
    message = data.get("message", "").strip()
    history = data.get("history", [])
    language = data.get("language", "en").strip().lower()

    if not message:
        return jsonify({
            "success": False,
            "error": "The 'message' field is required and cannot be empty.",
            "error_type": "VALIDATION_ERROR"
        }), 400

    if not isinstance(history, list):
        return jsonify({
            "success": False,
            "error": "The 'history' field must be an array of past message objects.",
            "error_type": "VALIDATION_ERROR"
        }), 400

    # Validate language code (English and Telugu only)
    if language not in ("en", "te"):
        language = "en"

    # Call Gemini service
    result = gemini_service.generate_chat_response(
        message=message,
        history=history,
        language=language
    )

    status_code = result.get("status_code", 200 if result.get("success") else 500)
    # Remove internal status_code from JSON payload
    result_payload = {k: v for k, v in result.items() if k != "status_code"}

    return jsonify(result_payload), status_code

@app.errorhandler(404)
def handle_404(e):
    return jsonify({
        "success": False,
        "error": "Endpoint not found.",
        "error_type": "NOT_FOUND"
    }), 404

@app.errorhandler(500)
def handle_500(e):
    logger.error("Internal Server Error: %s", str(e))
    return jsonify({
        "success": False,
        "error": "Internal server error occurred.",
        "error_type": "INTERNAL_SERVER_ERROR"
    }), 500

if __name__ == "__main__":
    host = os.environ.get("FLASK_HOST", "127.0.0.1")
    port = int(os.environ.get("FLASK_PORT", 5000))
    logger.info("Starting SwasthyaSathi AI Backend on http://%s:%d", host, port)
    app.run(host=host, port=port, debug=False)
