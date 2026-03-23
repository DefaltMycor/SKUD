import requests
import json
from datetime import datetime, timedelta
import random


class DataSetup:
    
    def __init__(self, base_url: str = "http://localhost:8081"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def _request(self, method: str, endpoint: str, data=None):
        url = f"{self.base_url}{endpoint}"
        print(f"{method} {url}")
        
        if method == "POST":
            response = self.session.post(url, json=data)
        elif method == "GET":
            response = self.session.get(url)
        
        print(f"Status: {response.status_code}")
        response.raise_for_status()
        result = response.json()
        print(f"Result: {json.dumps(result, indent=2, ensure_ascii=False)}\n")
        return result
    
    def setup(self):
        print("=== Setting up test data ===\n")
        
        # Create user - Harry Potter
        user = self._request("POST", "/api/users", {
            "fullName": "Harry Potter",
            "email": "harry.potter@hogwarts.edu",
            "phone": "+44-7700-900000",
            "position": "Student",
            "status": "ACTIVE",
            "role": "USER",
            "passwordHash": "expecto_patronum"
        })
        user_id = user['id']
        print(f"Created user: Harry Potter (id={user_id})\n")
        
        # Create room - Gryffindor Common Room
        room = self._request("POST", "/api/rooms", {
            "name": "Gryffindor Common Room",
            "purpose": "Student dormitory",
            "accessLevel": "HIGH"
        })
        room_id = room['id']
        print(f"Created room: Gryffindor Common Room (id={room_id})\n")
        
        # Create controller
        unique_ip = f"192.168.{random.randint(1,254)}.{random.randint(1,254)}"
        controller = self._request("POST", "/api/controllers", {
            "name": "Gryffindor Entrance Controller",
            "deviceType": "Magic Card Reader",
            "ipAddress": unique_ip,
            "status": "ONLINE",
            "room": {"id": room_id}
        })
        controller_id = controller['id']
        print(f"Created controller: id={controller_id}\n")
        
        # Create first card - NO ACCESS
        card1 = self._request("POST", "/api/cards", {
            "cardNumber": "CARD-SLYTHERIN-001",
            "type": "RFID",
            "status": "ACTIVE",
            "issueDate": datetime.now().strftime("%Y-%m-%d"),
            "user": {"id": user_id}
        })
        card1_id = card1['id']
        print(f"Created card WITHOUT access: CARD-SLYTHERIN-001 (id={card1_id})\n")
        
        # Create second card - WITH ACCESS
        card2 = self._request("POST", "/api/cards", {
            "cardNumber": "CARD-GRYFFINDOR-002",
            "type": "RFID",
            "status": "ACTIVE",
            "issueDate": datetime.now().strftime("%Y-%m-%d"),
            "user": {"id": user_id}
        })
        card2_id = card2['id']
        print(f"Created card WITH access: CARD-GRYFFINDOR-002 (id={card2_id})\n")
        
        # Grant access rights ONLY for second card (via user)
        access_rights = self._request("POST", "/api/access-rights", {
            "user": {"id": user_id},
            "room": {"id": room_id},
            "schedule": "24/7",
            "validFrom": datetime.now().strftime("%Y-%m-%d"),
            "validTo": (datetime.now() + timedelta(days=365)).strftime("%Y-%m-%d")
        })
        rights_id = access_rights['id']
        print(f"Granted access rights: id={rights_id}\n")
        
        # Save IDs to file for simulation script
        config = {
            "user_id": user_id,
            "room_id": room_id,
            "controller_id": controller_id,
            "card1_id": card1_id,
            "card2_id": card2_id,
            "access_rights_id": rights_id
        }
        
        with open("test_config.json", "w") as f:
            json.dump(config, f, indent=2)
        
        print("=== Setup completed ===")
        print(f"User: Harry Potter (id={user_id})")
        print(f"Room: Gryffindor Common Room (id={room_id})")
        print(f"Controller: id={controller_id}")
        print(f"Card 1 (NO access): CARD-SLYTHERIN-001 (id={card1_id})")
        print(f"Card 2 (WITH access): CARD-GRYFFINDOR-002 (id={card2_id})")
        print(f"Access rights granted for User#{user_id} -> Room#{room_id}")
        print(f"\nConfig saved to test_config.json")
        print("Run simulate_access.py to test access")


if __name__ == "__main__":
    setup = DataSetup()
    try:
        setup.setup()
    except requests.exceptions.RequestException as e:
        print(f"\nAPI Error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response: {e.response.text}")