import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

def generate_recipe_ai(ingredients):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in .env")

    client = genai.Client(api_key=api_key)

    prompt = f"""
    You are a cooking assistant.

    Based on these ingredients: {ingredients}

    Generate a recipe in pure JSON only.
    Use this exact structure:
    {{
    "title": "string",
    "ingredients": ["string", "string"],
    "instructions": ["string", "string"],
    "calories": "string",
    "substitutions": ["string", "string"],
    "notes": "string"
    }}

    Do not add markdown fences.
    Do not add extra text outside the JSON.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text