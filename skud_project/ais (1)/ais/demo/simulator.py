import requests
import json
from datetime import datetime


class AccessControlEmulator:
    
    def __init__(self, base_url: str = "http://localhost:8081"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def _get(self, endpoint):
        url = f"{self.base_url}{endpoint}"
        response = self.session.get(url)
        response.raise_for_status()
        return response.json()
    
    def _post(self, endpoint, data):
        url = f"{self.base_url}{endpoint}"
        response = self.session.post(url, json=data)
        response.raise_for_status()
        return response.json()
    
    def get_all_cards(self):
        return self._get("/api/cards")
    
    def get_card(self, card_id):
        return self._get(f"/api/cards/{card_id}")
    
    def get_all_controllers(self):
        return self._get("/api/controllers")
    
    def get_controller(self, controller_id):
        return self._get(f"/api/controllers/{controller_id}")
    
    def get_all_access_rights(self):
        return self._get("/api/access-rights")
    
    def check_access_rights(self, user_id, room_id):
        all_rights = self.get_all_access_rights()
        for right in all_rights:
            if right['user']['id'] == user_id and right['room']['id'] == room_id:
                return True, right
        return False, None
    
    def create_access_event(self, user_id, room_id, card_id, controller_id, result, reason):
        event_data = {
            "user": {"id": user_id},
            "room": {"id": room_id},
            "card": {"id": card_id},
            "controller": {"id": controller_id},
            "eventTime": datetime.now().isoformat(),
            "result": result,
            "reason": reason
        }
        return self._post("/api/access-events", event_data)
    
    def show_all_cards(self):
        print("\n" + "="*80)
        print("AVAILABLE CARDS IN DATABASE")
        print("="*80)
        cards = self.get_all_cards()
        for card in cards:
            user = card.get('user', {})
            user_name = user.get('fullName', 'Unknown') if user else 'Unknown'
            print(f"ID: {card['id']:3} | Card: {card['cardNumber']:25} | Type: {card['type']:5} | User: {user_name}")
        print("="*80)
    
    def show_all_controllers(self):
        print("\n" + "="*80)
        print("AVAILABLE CONTROLLERS IN DATABASE")
        print("="*80)
        controllers = self.get_all_controllers()
        for ctrl in controllers:
            room = ctrl.get('room', {})
            room_name = room.get('name', 'Unknown') if room else 'Unknown'
            print(f"ID: {ctrl['id']:3} | Name: {ctrl['name']:30} | IP: {ctrl['ipAddress']:15} | Room: {room_name}")
        print("="*80)
    
    def emulate_card_swipe(self, card_id, controller_id):
        print("\n" + "~"*80)
        print("EMULATING CARD SWIPE")
        print("~"*80)
        
        try:
            # Get card from DB
            print(f"\nStep 1: Reading card from DB (card_id={card_id})")
            card = self.get_card(card_id)
            print(f"Card found: {card['cardNumber']}")
            print(f"Card details: {json.dumps(card, indent=2, ensure_ascii=False)}")
            
            user = card.get('user')
            if not user:
                print("ERROR: Card has no assigned user")
                return
            
            user_id = user['id']
            user_name = user.get('fullName', 'Unknown')
            print(f"Card owner: {user_name} (user_id={user_id})")
            
            # Get controller from DB
            print(f"\nStep 2: Reading controller from DB (controller_id={controller_id})")
            controller = self.get_controller(controller_id)
            print(f"Controller found: {controller['name']}")
            print(f"Controller details: {json.dumps(controller, indent=2, ensure_ascii=False)}")
            
            room = controller.get('room')
            if not room:
                print("ERROR: Controller has no assigned room")
                return
            
            room_id = room['id']
            room_name = room.get('name', 'Unknown')
            print(f"Target room: {room_name} (room_id={room_id})")
            
            # Check access rights in DB
            print(f"\nStep 3: Checking access rights in DB")
            print(f"Query: user_id={user_id} AND room_id={room_id}")
            has_access, access_right = self.check_access_rights(user_id, room_id)
            
            if has_access:
                print("ACCESS RIGHTS FOUND IN DB:")
                print(json.dumps(access_right, indent=2, ensure_ascii=False))
                result = "GRANTED"
                reason = "Valid access rights"
                decision = "ACCESS GRANTED"
            else:
                print("NO ACCESS RIGHTS FOUND IN DB")
                result = "DENIED"
                reason = "No access rights for this room"
                decision = "ACCESS DENIED"
            
            # Save event to DB
            print(f"\nStep 4: Saving access event to DB")
            event = self.create_access_event(user_id, room_id, card_id, controller_id, result, reason)
            print(f"Event saved: id={event['id']}, result={event['result']}")
            
            # Final result
            print("\n" + "="*80)
            if result == "GRANTED":
                print(f">>> {decision} <<<")
                print(f"User '{user_name}' can enter room '{room_name}'")
            else:
                print(f">>> {decision} <<<")
                print(f"User '{user_name}' CANNOT enter room '{room_name}'")
            print("="*80)
            print(f"\nEvent logged in database: access_events table, id={event['id']}")
            
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                print(f"\nERROR: Resource not found - {e}")
            else:
                print(f"\nAPI ERROR: {e}")
                print(f"Response: {e.response.text}")
        except Exception as e:
            print(f"\nERROR: {e}")
    
    def run_interactive(self):
        print("\n" + "#"*80)
        print("#" + " "*78 + "#")
        print("#" + " "*20 + "ACCESS CONTROL SYSTEM EMULATOR" + " "*28 + "#")
        print("#" + " "*78 + "#")
        print("#"*80)
        
        while True:
            print("\n" + "-"*80)
            print("MENU:")
            print("1. Show all cards")
            print("2. Show all controllers")
            print("3. Emulate card swipe")
            print("4. Exit")
            print("-"*80)
            
            choice = input("Select option (1-4): ").strip()
            
            if choice == "1":
                self.show_all_cards()
            
            elif choice == "2":
                self.show_all_controllers()
            
            elif choice == "3":
                print("\n--- Card Swipe Emulation ---")
                try:
                    card_id = int(input("Enter card ID: ").strip())
                    controller_id = int(input("Enter controller ID: ").strip())
                    self.emulate_card_swipe(card_id, controller_id)
                except ValueError:
                    print("ERROR: Invalid ID format. Please enter numbers only.")
            
            elif choice == "4":
                print("\nExiting...")
                break
            
            else:
                print("\nERROR: Invalid option. Please select 1-4.")


if __name__ == "__main__":
    emulator = AccessControlEmulator(base_url="http://localhost:8081")
    try:
        emulator.run_interactive()
    except KeyboardInterrupt:
        print("\n\nInterrupted by user. Exiting...")
    except Exception as e:
        print(f"\nFATAL ERROR: {e}")