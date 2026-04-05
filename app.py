import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()
from ai_service import generate_recipe_ai
import json


app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))
client.admin.command("ping")
print("Database connected")
db = client[os.getenv("DB_NAME")]
recipes_collection = db["recipies"]

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)


@app.route('/generate', methods=['POST'])
def generate_recipe():
    data = request.get_json() or {}
    ingredients = data.get('ingredients')

    if not ingredients:
        return jsonify({"message": "Ingredients are required"}), 400

    try:
        ai_response = generate_recipe_ai(ingredients)
        ai_response = ai_response.strip()

        if ai_response.startswith("```json"):
            ai_response = ai_response.replace("```json", "", 1).strip()
        if ai_response.startswith("```"):
            ai_response = ai_response.replace("```", "", 1).strip()
        if ai_response.endswith("```"):
            ai_response = ai_response[:-3].strip()

        recipe = json.loads(ai_response)
        return jsonify(recipe), 200

    except Exception as e:
        print("Generate error:", e)
        return jsonify({
            "message": "Recipe generation failed",
            "error": str(e)
        }), 500


@app.route('/recipes', methods=['POST'])
def save_recipe():
    data = request.get_json() or {}

    title = data.get('title')
    ingredients = data.get('ingredients')
    instructions = data.get('instructions')

    if not title or not ingredients or not instructions:
        return jsonify({"message": "Title, ingredients, and instructions are required"}), 400

    recipe = {
        "title": title,
        "ingredients": ingredients,
        "instructions": instructions,
        "calories": data.get('calories', 'Not provided'),
        "substitutions": data.get('substitutions', []),
        "notes": data.get('notes', '')
    }

    result = recipes_collection.insert_one(recipe)

    return jsonify({
        "message": "Recipe saved successfully",
        "recipe_id": str(result.inserted_id)
    }), 201


@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = []
    for recipe in recipes_collection.find():
        recipe['_id'] = str(recipe['_id'])
        recipes.append(recipe)

    return jsonify(recipes), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)))