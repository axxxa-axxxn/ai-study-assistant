from openai import OpenAI
from flask import current_app


def get_ai_client():
    """
    Create and return the OpenAI client using
    the API key stored in the application configuration.
    """

    api_key = current_app.config.get("OPENAI_API_KEY")

    if not api_key:
        raise ValueError("OPENAI_API_KEY is not configured.")

    return OpenAI(api_key=api_key)


def generate_ai_response(prompt):
    """
    Send a prompt to the AI model and return its response.
    """

    client = get_ai_client()

    response = client.responses.create(
        model="gpt-5-mini",
        input=prompt
    )

    return response.output_text