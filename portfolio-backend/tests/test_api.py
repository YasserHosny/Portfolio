import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.core.rate_limit import limiter

client = TestClient(app)


@pytest.fixture(autouse=True)
def _reset_limiter():
    """Each test starts with a fresh rate-limiter budget."""
    limiter.reset()
    yield


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"


def test_profile():
    response = client.get("/api/profile")
    assert response.status_code == 200
    body = response.json()
    assert body["brand"] == "Yasser Hosny, MBA"
    assert "Founder Engineer" in body["positioning"]
    assert len(body["experience"]) >= 1


def test_product_lab_list():
    response = client.get("/api/product-lab")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] >= 6
    slugs = [item["slug"] for item in body["items"]]
    assert "ai-market-intelligence" in slugs


def test_product_lab_detail():
    response = client.get("/api/product-lab/founder-operating-system")
    assert response.status_code == 200
    assert response.json()["title"] == "Founder Operating System"


def test_product_lab_missing():
    response = client.get("/api/product-lab/does-not-exist")
    assert response.status_code == 404


def test_case_studies_list():
    response = client.get("/api/case-studies")
    assert response.status_code == 200
    assert response.json()["total"] >= 5


def test_case_study_detail():
    response = client.get("/api/case-studies/transim-move-platform")
    assert response.status_code == 200
    assert "MOVE" in response.json()["title"]


def test_updates():
    response = client.get("/api/updates")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] >= 7


def test_capabilities():
    response = client.get("/api/capabilities")
    assert response.status_code == 200
    body = response.json()
    assert len(body["groups"]) == 8
    assert len(body["certifications"]) >= 10


def test_projects():
    response = client.get("/api/projects")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 9
    slugs = [p["slug"] for p in body["items"]]
    assert "paygateway" in slugs
    assert "formcraft" in slugs
    # highlighted items should sort first
    assert body["items"][0]["highlight"] is True


def test_contact_ok():
    response = client.post(
        "/api/contact",
        json={
            "name": "Jane Founder",
            "email": "jane@example.com",
            "company": "Acme",
            "message": "Interested in a cofounder conversation.",
        },
    )
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_contact_validation():
    response = client.post(
        "/api/contact",
        json={"name": "x", "email": "not-an-email", "message": "short"},
    )
    assert response.status_code == 422
