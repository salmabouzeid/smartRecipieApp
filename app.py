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
db = client[os.getenv("DB_NAME")]
recipes_collection = db["recipes"]

@app.route('/')
def home():
    return "Smart Recipe App Running"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)