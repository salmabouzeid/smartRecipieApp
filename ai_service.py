import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

def generate_recipe_ai(ingredients):
    prompt = f"""
    You are a cooking assistant.

    Based on these ingredients: {ingredients}

    Generate a recipe with:
    - Title
    - Ingredients list
    - Step-by-step instructions
    - Estimated calories
    - Ingredient substitutions

    Return the result in JSON format.
    """

    response = model.generate_content(prompt)
    return response.text