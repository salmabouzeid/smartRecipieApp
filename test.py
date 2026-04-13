import pytest
import json
from app import app, recipes_collection

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# --- 12 TESTS SUITE ---

def test_home_route(client):
    """1. Verify home page loads."""
    assert client.get('/').status_code == 200

def test_health_smoke_test(client):
    """2. SMOKE TEST: Verify health endpoint."""
    response = client.get('/health')
    assert response.status_code == 200
    assert response.get_json() == {"status": "healthy"}

def test_css_serving(client):
    """3. Verify CSS is served."""
    assert client.get('/style.css').status_code == 200

def test_js_serving(client):
    """4. Verify JS is served."""
    assert client.get('/script.js').status_code == 200

def test_404_handling(client):
    """5. Verify 404 on missing routes."""
    assert client.get('/non-existent').status_code == 404

def test_save_recipe_status(client):
    """6. Verify real DB save returns 201."""
    recipe = {"title": "Test", "ingredients": "a", "instructions": "b"}
    assert client.post('/recipes', json=recipe).status_code == 201

def test_save_recipe_missing_data(client):
    """7. Verify 400 when saving incomplete data."""
    assert client.post('/recipes', json={"title": "hi"}).status_code == 400

def test_get_recipes_format(client):
    """8. Verify GET recipes returns a list."""
    response = client.get('/recipes')
    assert isinstance(response.get_json(), list)

def test_generate_missing_ingredients(client):
    """9. Verify 400 if ingredients are missing (prevents AI call)."""
    assert client.post('/generate', json={}).status_code == 400

def test_generate_empty_string(client):
    """10. Verify 400 for empty string."""
    assert client.post('/generate', json={"ingredients": ""}).status_code == 400

def test_db_insert_logic(client):
    """11. Verify DB insertion adds to collection count."""
    count_before = recipes_collection.count_documents({})
    client.post('/recipes', json={"title": "T", "ingredients": "I", "instructions": "D"})
    assert recipes_collection.count_documents({}) > count_before

def test_db_connection_ping(client):
    """12. Verify active connection to MongoDB Atlas."""
    from app import client as mongo_client
    assert mongo_client.admin.command('ping')['ok'] == 1.0