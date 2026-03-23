import requests
import json
from datetime import datetime, timedelta


class HarryPotterDataSetup:
    
    def __init__(self, base_url: str = "http://localhost:8081"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def _post(self, endpoint, data):
        url = f"{self.base_url}{endpoint}"
        print(f"POST {url}")
        response = self.session.post(url, json=data)
        response.raise_for_status()
        result = response.json()
        print(f"Created: {json.dumps(result, indent=2, ensure_ascii=False)}\n")
        return result
    
    def create_users(self):
        print("\n" + "="*80)
        print("СОЗДАНИЕ ПОЛЬЗОВАТЕЛЕЙ")
        print("="*80 + "\n")
        
        harry = self._post("/api/users", {
            "fullName": "Гарри Поттер",
            "email": "harry.potter@hogwarts.edu",
            "phone": "+44-20-7946-0958",
            "position": "Студент",
            "status": "ACTIVE",
            "role": "USER",
            "passwordHash": "expecto_patronum"
        })
        
        voldemort = self._post("/api/users", {
            "fullName": "Волан-де-Морт",
            "email": "voldemort@darkside.com",
            "phone": "+44-20-7946-0666",
            "position": "Темный Лорд",
            "status": "BLOCKED",
            "role": "USER",
            "passwordHash": "avada_kedavra"
        })
        
        print(f"Пользователи созданы:")
        print(f"  Гарри Поттер: id={harry['id']}")
        print(f"  Волан-де-Морт: id={voldemort['id']}")
        
        return harry, voldemort
    
    def create_rooms(self):
        print("\n" + "="*80)
        print("СОЗДАНИЕ КОМНАТ")
        print("="*80 + "\n")
        
        chamber = self._post("/api/rooms", {
            "name": "Тайная комната",
            "purpose": "Древняя комната Слизерина",
            "accessLevel": "ULTRA HIGH"
        })
        
        azkaban = self._post("/api/rooms", {
            "name": "Азкабан",
            "purpose": "Тюрьма для волшебников",
            "accessLevel": "MAXIMUM"
        })
        
        print(f"Комнаты созданы:")
        print(f"  Тайная комната: id={chamber['id']}")
        print(f"  Азкабан: id={azkaban['id']}")
        
        return chamber, azkaban
    
    def create_controllers(self, rooms):
        print("\n" + "="*80)
        print("СОЗДАНИЕ КОНТРОЛЛЕРОВ")
        print("="*80 + "\n")
        
        chamber, azkaban = rooms
        
        ctrl_chamber = self._post("/api/controllers", {
            "name": "Контроллер входа в Тайную комнату",
            "deviceType": "Парselтang Reader",
            "ipAddress": "192.168.2.48",
            "status": "ONLINE",
            "room": {"id": chamber['id']}
        })
        
        ctrl_azkaban = self._post("/api/controllers", {
            "name": "Контроллер ворот Азкабана",
            "deviceType": "Dementor Scanner",
            "ipAddress": "192.168.13.13",
            "status": "ONLINE",
            "room": {"id": azkaban['id']}
        })
        
        print(f"Контроллеры созданы:")
        print(f"  Контроллер Тайной комнаты: id={ctrl_chamber['id']}")
        print(f"  Контроллер Азкабана: id={ctrl_azkaban['id']}")
        
        return ctrl_chamber, ctrl_azkaban
    
    def create_cards(self, users):
        print("\n" + "="*80)
        print("СОЗДАНИЕ КАРТ")
        print("="*80 + "\n")
        
        harry, voldemort = users
        
        # Карты Гарри
        harry_parseltongue = self._post("/api/cards", {
            "cardNumber": "ПАРСЕЛТАНГ-ГП-001",
            "type": "Парselтang",
            "status": "ACTIVE",
            "issueDate": datetime.now().strftime("%Y-%m-%d"),
            "user": {"id": harry['id']}
        })
        
        harry_regular = self._post("/api/cards", {
            "cardNumber": "ОБЫЧНАЯ-ГП-002",
            "type": "RFID",
            "status": "ACTIVE",
            "issueDate": datetime.now().strftime("%Y-%m-%d"),
            "user": {"id": harry['id']}
        })
        
        # Карта Волан-де-Морта (заблокирована)
        voldemort_card = self._post("/api/cards", {
            "cardNumber": "ТЕМНАЯ-МАГИЯ-666",
            "type": "Dark Magic",
            "status": "BLOCKED",
            "issueDate": "1942-12-31",
            "user": {"id": voldemort['id']}
        })
        
        print(f"Карты созданы:")
        print(f"  Карта Парselтанга Гарри: id={harry_parseltongue['id']}")
        print(f"  Обычная карта Гарри: id={harry_regular['id']}")
        print(f"  Карта Волан-де-Морта: id={voldemort_card['id']}")
        
        return harry_parseltongue, harry_regular, voldemort_card
    
    def create_access_rights(self, users, rooms):
        print("\n" + "="*80)
        print("СОЗДАНИЕ ПРАВ ДОСТУПА")
        print("="*80 + "\n")
        
        harry, voldemort = users
        chamber, azkaban = rooms
        
        # Гарри может войти в Тайную комнату (умеет говорить на Парселтанге)
        right1 = self._post("/api/access-rights", {
            "user": {"id": harry['id']},
            "room": {"id": chamber['id']},
            "schedule": "24/7",
            "validFrom": datetime.now().strftime("%Y-%m-%d"),
            "validTo": (datetime.now() + timedelta(days=365)).strftime("%Y-%m-%d")
        })
        
        # Волан-де-Морт НЕ имеет доступа никуда (заблокирован)
        # Специально не создаём ему права доступа
        
        print(f"Права доступа созданы:")
        print(f"  Гарри Поттер -> Тайная комната: id={right1['id']}")
        print(f"  Волан-де-Морт -> ВЕЗДЕ ЗАПРЕЩЕНО (заблокирован)")
        
        return right1
    
    def setup_all(self):
        print("\n" + "#"*80)
        print("#" + " "*78 + "#")
        print("#" + " "*15 + "СОЗДАНИЕ ТЕСТОВЫХ ДАННЫХ - ГАРРИ ПОТТЕР" + " "*24 + "#")
        print("#" + " "*78 + "#")
        print("#"*80)
        
        try:
            users = self.create_users()
            rooms = self.create_rooms()
            controllers = self.create_controllers(rooms)
            cards = self.create_cards(users)
            self.create_access_rights(users, rooms)
            
            print("\n" + "="*80)
            print("СОЗДАНИЕ ДАННЫХ ЗАВЕРШЕНО!")
            print("="*80)
            print("\nТестовые сценарии:")
            print("1. Гарри прикладывает карту Парселтанга к Тайной комнате -> ДОСТУП РАЗРЕШЕН")
            print("2. Гарри прикладывает обычную карту к Тайной комнате -> ДОСТУП ЗАПРЕЩЕН")
            print("3. Гарри прикладывает любую карту к Азкабану -> ДОСТУП ЗАПРЕЩЕН")
            print("4. Волан-де-Морт прикладывает карту куда угодно -> ДОСТУП ЗАПРЕЩЕН")
            print("\nЗапустите access_emulator.py для проверки!")
            
        except requests.exceptions.RequestException as e:
            print(f"\nОШИБКА API: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Ответ: {e.response.text}")
        except Exception as e:
            print(f"\nОШИБКА: {e}")


if __name__ == "__main__":
    setup = HarryPotterDataSetup(base_url="http://localhost:8081")
    setup.setup_all()