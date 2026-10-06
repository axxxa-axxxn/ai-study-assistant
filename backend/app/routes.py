from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from app import db
from app.models import User
from rag.rag_service import ask_rag


main_bp = Blueprint("main", __name__)


@main_bp.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "AI Study Assistant API is running!"
    })


@main_bp.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "success": True,
        "status": "healthy",
        "service": "AI Study Assistant Backend"
    })


@main_bp.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request body is required"
        }), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Name, email, and password are required"
        }), 400

    email = email.strip().lower()

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already registered"
        }), 409

    user = User(
        name=name.strip(),
        email=email
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "User registered successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 201


@main_bp.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request body is required"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400

    email = email.strip().lower()

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "success": True,
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200


@main_bp.route("/api/auth/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()

    user = User.query.get(int(user_id))

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200


@main_bp.route("/api/ai/chat", methods=["POST"])
@jwt_required()
def ai_chat():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request body is required"
        }), 400

    message = data.get("message")

    if not message or not message.strip():
        return jsonify({
            "success": False,
            "message": "Message is required"
        }), 400

    try:
        from app.ai_service import generate_ai_response

        answer = generate_ai_response(message.strip())

        return jsonify({
            "success": True,
            "message": message,
            "response": answer
        }), 200

    except Exception as e:
        print("AI API Error:", str(e))

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# ============================================================
# RAG CHAT ENDPOINT - PHASE 3 AI ANSWER GENERATION
# ============================================================

@main_bp.route("/api/rag/chat", methods=["POST"])
@jwt_required()
def rag_chat():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Request body is required"
        }), 400

    question = data.get("message")

    if not question or not question.strip():
        return jsonify({
            "success": False,
            "message": "Message is required"
        }), 400

    try:
        result = ask_rag(
            question=question.strip(),
            use_ai=True
        )

        return jsonify({
            "success": True,
            "question": result["question"],
            "response": result["answer"],
            "sources": result["sources"]
        }), 200

    except Exception as e:
        print("RAG API Error:", str(e))

        return jsonify({
            "success": False,
            "message": "RAG service failed",
            "error": str(e)
        }), 500