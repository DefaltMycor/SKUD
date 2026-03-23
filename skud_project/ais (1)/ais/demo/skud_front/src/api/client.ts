// src/api/client.ts
const API_BASE_URL = 'http://localhost:8081/api';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  role: string;
  passwordHash?: string;
  createdAt?: string;
}

export interface Room {
  id: number;
  name: string;
  purpose: string;
  accessLevel: string;
}

export interface Controller {
  id: number;
  name: string;
  deviceType: string;
  ipAddress: string;
  status: string;
  room: Room;
}

export interface Card {
  id: number;
  cardNumber: string;
  type: string;
  status: string;
  issueDate: string;
  user: User;
}

export interface AccessRight {
  id: number;
  user: User;
  room: Room;
  schedule: string;
  validFrom: string;
  validTo: string;
}

export interface AccessEvent {
  id: number;
  user: User;
  room: Room;
  card: Card;
  controller: Controller;
  eventTime: string;
  result: string;
  reason: string;
}

export interface AdminLog {
  id: number;
  admin: User;
  action: string;
  timestamp: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // ==================== USERS ====================
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number): Promise<void> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== ROOMS ====================
  async getRooms(): Promise<Room[]> {
    return this.request<Room[]>('/rooms');
  }

  async getRoom(id: number): Promise<Room> {
    return this.request<Room>(`/rooms/${id}`);
  }

  async createRoom(roomData: Omit<Room, 'id'>): Promise<Room> {
    return this.request<Room>('/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    });
  }

  async updateRoom(id: number, roomData: Partial<Room>): Promise<Room> {
    return this.request<Room>(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(roomData),
    });
  }

  async deleteRoom(id: number): Promise<void> {
    return this.request<void>(`/rooms/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== CONTROLLERS ====================
  async getControllers(): Promise<Controller[]> {
    return this.request<Controller[]>('/controllers');
  }

  async getController(id: number): Promise<Controller> {
    return this.request<Controller>(`/controllers/${id}`);
  }

  async getControllersByRoom(roomId: number): Promise<Controller[]> {
    return this.request<Controller[]>(`/controllers/room/${roomId}`);
  }

  async createController(
    controllerData: Omit<Controller, 'id'>
  ): Promise<Controller> {
    return this.request<Controller>('/controllers', {
      method: 'POST',
      body: JSON.stringify(controllerData),
    });
  }

  async updateController(
    id: number,
    controllerData: Partial<Controller>
  ): Promise<Controller> {
    return this.request<Controller>(`/controllers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(controllerData),
    });
  }

  async deleteController(id: number): Promise<void> {
    return this.request<void>(`/controllers/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== CARDS ====================
  async getCards(): Promise<Card[]> {
    return this.request<Card[]>('/cards');
  }

  async getCard(id: number): Promise<Card> {
    return this.request<Card>(`/cards/${id}`);
  }

  async createCard(cardData: Omit<Card, 'id'>): Promise<Card> {
    return this.request<Card>('/cards', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  async updateCard(id: number, cardData: Partial<Card>): Promise<Card> {
    return this.request<Card>(`/cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cardData),
    });
  }

  async deleteCard(id: number): Promise<void> {
    return this.request<void>(`/cards/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== ACCESS RIGHTS ====================
  async getAccessRights(): Promise<AccessRight[]> {
    return this.request<AccessRight[]>('/access-rights');
  }

  async getAccessRight(id: number): Promise<AccessRight> {
    return this.request<AccessRight>(`/access-rights/${id}`);
  }

  async createAccessRight(
    rightsData: Omit<AccessRight, 'id'>
  ): Promise<AccessRight> {
    return this.request<AccessRight>('/access-rights', {
      method: 'POST',
      body: JSON.stringify(rightsData),
    });
  }

  async updateAccessRight(
    id: number,
    rightsData: Partial<AccessRight>
  ): Promise<AccessRight> {
    return this.request<AccessRight>(`/access-rights/${id}`, {
      method: 'PUT',
      body: JSON.stringify(rightsData),
    });
  }

  async deleteAccessRight(id: number): Promise<void> {
    return this.request<void>(`/access-rights/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== ACCESS EVENTS ====================
  async getAccessEvents(): Promise<AccessEvent[]> {
    return this.request<AccessEvent[]>('/access-events');
  }

  async getAccessEvent(id: number): Promise<AccessEvent> {
    return this.request<AccessEvent>(`/access-events/${id}`);
  }

  async createAccessEvent(
    eventData: Omit<AccessEvent, 'id'>
  ): Promise<AccessEvent> {
    return this.request<AccessEvent>('/access-events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateAccessEvent(
    id: number,
    eventData: Partial<AccessEvent>
  ): Promise<AccessEvent> {
    return this.request<AccessEvent>(`/access-events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteAccessEvent(id: number): Promise<void> {
    return this.request<void>(`/access-events/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== ADMIN LOGS ====================
  async getAdminLogs(): Promise<AdminLog[]> {
    return this.request<AdminLog[]>('/admin-logs');
  }

  async getAdminLog(id: number): Promise<AdminLog> {
    return this.request<AdminLog>(`/admin-logs/${id}`);
  }

  async createAdminLog(logData: Omit<AdminLog, 'id'>): Promise<AdminLog> {
    return this.request<AdminLog>('/admin-logs', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  }

  async updateAdminLog(
    id: number,
    logData: Partial<AdminLog>
  ): Promise<AdminLog> {
    return this.request<AdminLog>(`/admin-logs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(logData),
    });
  }

  async deleteAdminLog(id: number): Promise<void> {
    return this.request<void>(`/admin-logs/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== HELPERS ====================
  async checkAccessRights(userId: number, roomId: number): Promise<boolean> {
    const rights = await this.getAccessRights();
    return rights.some(
      (right) => right.user.id === userId && right.room.id === roomId
    );
  }
}

export const api = new ApiClient();
