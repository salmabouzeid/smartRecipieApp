Smart Recipe App
Group 5 Project Proposal

The Smart Recipe App is a web tool that helps you cook with what you already have. By entering your available ingredients, the app uses AI to suggest recipes, instructions, and substitutions. This helps make cooking easier and reduces food waste at home.

Live URL: https://smart-recipe-app-ns8u.onrender.com

Team Roles
Salma Abouzeid: Backend Development (Python/Flask), MongoDB Database, and Testing.

Hanadi Al-Ashjab: Frontend Development (HTML, CSS, JavaScript) and User Interface.

Rawana Poovathingal: AI Integration (Google Gemini API) and DevOps (CI/CD, Docker).

Architecture Overview
The application follows a client-server model:

Client: A responsive web interface built with HTML, CSS, and JavaScript.

Server: A Python Flask API that handles business logic and routes.

AI Layer: Integration with Google Gemini API for dynamic recipe generation and ingredient substitutions.

Database: MongoDB Atlas for persistent storage of recipe history and user data.

CI/CD: Automated pipeline using GitHub Actions to run tests and Docker for containerized deployment on Render.

Project Features
Persistent Storage: Database is used for persistent reads and writes, allowing recipe history to be saved and viewed.

AI-Powered Intelligence: Real-time recipe generation and smart substitution recommendations via Google Gemini.

Secure Design: All credentials and API keys are managed through environment variables to ensure no sensitive data is exposed in the source code.

Fully Functional: All features, from ingredient input to history retrieval, are live and operational on the Render platform.

Setup and Installation
Clone the repository:
git clone [repository-url]

Install dependencies:
pip install -r requirements.txt

Configuration:
This app requires a MongoDB URI and Gemini API Key. For local development, these must be set as environment variables. In production, these are securely managed via the Render dashboard.

Run locally:
python app.py

Testing and CI/CD
Unit Tests: 12+ unit tests are included to validate backend logic, API responses, and database connectivity.

Continuous Integration: GitHub Actions automatically runs the full test suite on every push or merge to the main branch.

Continuous Deployment: Once tests pass, the CI/CD pipeline triggers a build using Docker, and Render redeploys the live site automatically. Changes are visible within minutes.
