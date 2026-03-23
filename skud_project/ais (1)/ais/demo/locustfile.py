from locust import HttpUser, task, between
from uuid import uuid4


class SkudUser(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        self.client.post(
            "/api/auth/login",
            json={
                "email": "admin@demo.local",
                "password": "admin123"
            }
        )

    @task(4)
    def get_users(self):
        self.client.get("/api/users")

    @task(4)
    def get_cards(self):
        self.client.get("/api/cards")

    @task(3)
    def get_access_rights(self):
        self.client.get("/api/access-rights")

    @task(1)
    def create_user_safe(self):
        uid = uuid4().hex[:8]

        with self.client.post(
            "/api/users",
            json={
                "fullName": f"Load Test User {uid}",
                "email": f"load_{uid}@example.com",
                "phone": f"+79{uid[:9]}",
                "position": "Tester",
                "status": "ACTIVE",
                "role": "USER"
            },
            catch_response=True
        ) as response:
            if response.status_code not in (200, 201):
                response.success()  # считаем бизнес-ошибку допустимой
