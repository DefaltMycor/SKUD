import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { QRCodeGenerator } from './QRCodeGenerator';
import { User, MapPin, Clock, Shield, Calendar } from 'lucide-react';

interface UserDashboardProps {
  user: {
    email: string;
    name: string;
    id: string;
    accessLevel: string;
    department: string;
  };
}

export function UserDashboard({ user }: UserDashboardProps) {
  const recentAccess = [
    { time: '09:15', date: '2025-10-01', location: 'Главный вход', status: 'success' },
    { time: '18:30', date: '2025-09-30', location: 'Главный вход', status: 'success' },
    { time: '09:10', date: '2025-09-30', location: 'Главный вход', status: 'success' },
    { time: '12:45', date: '2025-09-29', location: 'Серверная', status: 'denied' },
    { time: '09:20', date: '2025-09-29', location: 'Главный вход', status: 'success' },
  ];

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
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Отдел:</span>
                <span>{user.department}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Уровень доступа:</span>
                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  {user.accessLevel}
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
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span>Главный вход</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Доступно
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span>Офисные помещения</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Доступно
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span>Серверная</span>
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Ограничено
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span>Административная зона</span>
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Ограничено
                </Badge>
              </div>
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
              {recentAccess.map((access, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{access.location}</div>
                      <div className="text-sm text-gray-500">
                        {access.date} в {access.time}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={access.status === 'success' ? 'default' : 'destructive'}
                  >
                    {access.status === 'success' ? 'Успешно' : 'Отказано'}
                  </Badge>
                </div>
              ))}
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
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex">
                <div className="flex-1">
                  <p className="text-sm">
                    <strong>Обновление системы безопасности</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Запланировано техническое обслуживание 5 октября с 02:00 до 04:00. 
                    Доступ к зданию может быть ограничен.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <div className="flex-1">
                  <p className="text-sm">
                    <strong>Обновите мобильное приложение</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Доступна новая версия приложения с улучшенной функциональностью QR-кодов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}