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
        print("ДОСТУПНЫЕ КАРТЫ В БАЗЕ ДАННЫХ")
        print("="*80)
        cards = self.get_all_cards()
        for card in cards:
            user = card.get('user', {})
            user_name = user.get('fullName', 'Неизвестно') if user else 'Неизвестно'
            print(f"ID: {card['id']:3} | Карта: {card['cardNumber']:25} | Тип: {card['type']:10} | Владелец: {user_name}")
        print("="*80)
    
    def show_all_controllers(self):
        print("\n" + "="*80)
        print("ДОСТУПНЫЕ КОНТРОЛЛЕРЫ В БАЗЕ ДАННЫХ")
        print("="*80)
        controllers = self.get_all_controllers()
        for ctrl in controllers:
            room = ctrl.get('room', {})
            room_name = room.get('name', 'Неизвестно') if room else 'Неизвестно'
            print(f"ID: {ctrl['id']:3} | Название: {ctrl['name']:40} | IP: {ctrl['ipAddress']:15} | Комната: {room_name}")
        print("="*80)
    
    def emulate_card_swipe(self, card_id, controller_id):
        print("\n" + "~"*80)
        print("ЭМУЛЯЦИЯ ПРИКЛАДЫВАНИЯ КАРТЫ")
        print("~"*80)
        
        try:
            # Читаем карту из БД
            print(f"\n Чтение карты из БД (card_id={card_id})")
            card = self.get_card(card_id)
            print(f"Карта найдена: {card['cardNumber']}")
            
            user = card.get('user')
            if not user:
                print("ОШИБКА: У карты нет владельца")
                return
            
            user_id = user['id']
            user_name = user.get('fullName', 'Неизвестно')
            print(f"Владелец карты: {user_name} (user_id={user_id})")
            
            # Читаем контроллер из БД
            print(f"\nЧтение контроллера из БД (controller_id={controller_id})")
            controller = self.get_controller(controller_id)
            print(f"Контроллер найден: {controller['name']}")
            
            room = controller.get('room')
            if not room:
                print("ОШИБКА: У контроллера нет привязанной комнаты")
                return
            
            room_id = room['id']
            room_name = room.get('name', 'Неизвестно')
            print(f"Целевая комната: {room_name} (room_id={room_id})")
            
            # Проверяем права доступа в БД
            print(f"\nШаг 3: Проверка прав доступа в БД")
            print(f"Запрос: user_id={user_id} AND room_id={room_id}")
            has_access, access_right = self.check_access_rights(user_id, room_id)
            
            if has_access:
                print("ПРАВА ДОСТУПА НАЙДЕНЫ В БД")
                result = "GRANTED"
                reason = "Действительные права доступа"
                decision = "ДОСТУП РАЗРЕШЕН"
            else:
                print("ПРАВА ДОСТУПА НЕ НАЙДЕНЫ В БД")
                result = "DENIED"
                reason = "Нет прав доступа к данной комнате"
                decision = "ДОСТУП ЗАПРЕЩЕН"
            
            # Сохраняем событие в БД (без вывода в консоль)
            self.create_access_event(user_id, room_id, card_id, controller_id, result, reason)
            
            # Финальный результат
            print("\n" + "="*80)
            print(f">>> {decision} <<<")
            print("="*80)
            
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                print(f"\nОШИБКА: Ресурс не найден - {e}")
            else:
                print(f"\nОШИБКА API: {e}")
                print(f"Ответ: {e.response.text}")
        except Exception as e:
            print(f"\nОШИБКА: {e}")
    
    def run_interactive(self):
        
        while True:
            print("\n" + "-"*80)
            print("МЕНЮ:")
            print("1. Показать все карты")
            print("2. Показать все контроллеры")
            print("3. Прикладывание карты")
            print("4. Выход")
            print("-"*80)
            
            choice = input("Выберите опцию (1-4): ").strip()
            
            if choice == "1":
                self.show_all_cards()
            
            elif choice == "2":
                self.show_all_controllers()
            
            elif choice == "3":
                print("\n--- Эмуляция прикладывания карты ---")
                try:
                    card_id = int(input("Введите ID карты: ").strip())
                    controller_id = int(input("Введите ID контроллера: ").strip())
                    self.emulate_card_swipe(card_id, controller_id)
                except ValueError:
                    print("ОШИБКА: Неверный формат ID. Введите только числа.")
            
            elif choice == "4":
                print("\nВыход...")
                break
            
            else:
                print("\nОШИБКА: Неверная опция. Выберите 1-4.")


if __name__ == "__main__":
    emulator = AccessControlEmulator(base_url="http://localhost:8081")
    try:
        emulator.run_interactive()
    except KeyboardInterrupt:
        print("\n\nПрервано пользователем. Выход...")
    except Exception as e:
        print(f"\nКРИТИЧЕСКАЯ ОШИБКА: {e}")