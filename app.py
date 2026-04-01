import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

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
    return "Smart Recipe App Running"


@app.route('/generate', methods=['POST'])
def generate_recipe():
    data = request.get_json() or {}
    ingredients = data.get('ingredients')

    if not ingredients:
        return jsonify({"message": "Ingredients are required"}), 400

    # AI INTEGRATION GOES HERE
    # Later, the AI teammate can replace this placeholder recipe
    # with a real AI-generated response based on the ingredients.

    recipe = {
        "title": "Sample Recipe",
        "ingredients": ingredients,
        "instructions": [
            "Prepare the ingredients.",
            "Mix everything together.",
            "Cook and serve."
        ],
        "calories": "Will be added later",
        "substitutions": ["Alternative ingredients will be added later"],
        "notes": "This is a placeholder response until AI integration is added."
    }

    return jsonify(recipe), 200


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
    app.run(host='0.0.0.0', port=5000, debug=True)