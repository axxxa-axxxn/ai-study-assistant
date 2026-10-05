from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

from app.config import Config


db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    """
    Application factory.
    """

    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize database
    db.init_app(app)

    # Initialize JWT
    jwt.init_app(app)

    # Enable CORS
    CORS(app)

    # Register routes
    from app.routes import main_bp
    app.register_blueprint(main_bp)

    return app