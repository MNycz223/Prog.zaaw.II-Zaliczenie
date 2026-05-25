from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_get_currencies():
    response = client.get("/currencies")

    assert response.status_code == 200


def test_invalid_date():
    response = client.get("/currencies/invalid-date")

    assert response.status_code == 400


def test_fetch_currencies():
    response = client.post("/currencies/fetch")

    assert response.status_code == 200

    data = response.json()

    assert "message" in data
