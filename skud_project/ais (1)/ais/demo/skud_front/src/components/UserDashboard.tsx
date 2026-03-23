import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { QRCodeGenerator } from './QRCodeGenerator';
import { User, MapPin, Clock, Shield, Calendar, Loader2 } from 'lucide-react';
import { api } from '@/api/client';
import { useApi } from '@/hooks/useApi';

interface UserDashboardProps {
  user: {
    email: string;
    name: string;
    id: string;
  };
}

export function UserDashboard({ user }: UserDashboardProps) {
  // Загружаем данные пользователя из БД
  const { data: userData, loading: userLoading } = useApi(() => api.getUser(Number(user.id)));
  const { data: accessRights, loading: rightsLoading } = useApi(() => api.getAccessRights());
  const { data: accessEvents, loading: eventsLoading } = useApi(() => api.getAccessEvents());
  const { data: rooms } = useApi(() => api.getRooms());

  if (userLoading || rightsLoading || eventsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Права доступа пользователя
  const userRights = accessRights?.filter(right => right.user?.id === Number(user.id)) || [];
  const allowedRoomIds = new Set(userRights.map(r => r.room?.id));

  // Последние события пользователя (5 последних)
  const userEvents = accessEvents
    ?.filter(event => event.user?.id === Number(user.id))
    .sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime())
    .slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Информация о пользователе */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Профиль пользователя
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Имя:</span>
                <span className="font-medium">{userData?.fullName || user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{userData?.email || user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Телефон:</span>
                <span className="font-medium">{userData?.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Должность:</span>
                <span className="font-medium">{userData?.position || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Роль:</span>
                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  {userData?.role || 'USER'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Статус:</span>
                <Badge 
                  variant={userData?.status === 'ACTIVE' ? 'default' : 'secondary'}
                  className={userData?.status === 'ACTIVE' ? 'bg-green-600' : ''}
                >
                  {userData?.status || 'ACTIVE'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Доступные зоны
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {rooms && rooms.length > 0 ? (
                rooms.map((room) => {
                  const hasAccess = allowedRoomIds.has(room.id);
                  return (
                    <div 
                      key={room.id}
                      className={`flex items-center justify-between p-2 rounded ${
                        hasAccess ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <span className="font-medium">{room.name}</span>
                      <Badge 
                        variant="outline" 
                        className={hasAccess 
                          ? 'text-green-600 border-green-600' 
                          : 'text-red-600 border-red-600'
                        }
                      >
                        {hasAccess ? 'Доступно' : 'Ограничено'}
                      </Badge>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 py-4">
                  Нет доступных зон
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR код */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QRCodeGenerator userId={user.id} userName={user.name} />

        {/* История доступа */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Последние проходы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userEvents.length > 0 ? (
                userEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{event.room?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(event.eventTime).toLocaleDateString('ru-RU')} в{' '}
                          {new Date(event.eventTime).toLocaleTimeString('ru-RU')}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={event.result === 'GRANTED' ? 'default' : 'destructive'}
                      className={event.result === 'GRANTED' ? 'bg-green-600' : ''}
                    >
                      {event.result === 'GRANTED' ? 'Успешно' : 'Отказано'}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Нет записей о проходах
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Уведомления */}
      <Card>
        <CardHeader>
          <CardTitle>Уведомления и напоминания</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userRights.length > 0 && (
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <div className="flex">
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong>Активные права доступа</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      У вас есть доступ к {userRights.length} зон(ам). 
                      Используйте QR-код для входа.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {userEvents.some(e => e.result === 'DENIED') && (
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div className="flex">
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong>Обнаружены отклонённые попытки доступа</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      Если это были не вы, обратитесь к администратору безопасности.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {userRights.length === 0 && (
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <div className="flex">
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong>Права доступа не настроены</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      Обратитесь к администратору для получения доступа к зонам.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
