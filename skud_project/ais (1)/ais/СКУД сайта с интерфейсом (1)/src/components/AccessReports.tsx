import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar as CalendarIcon,
  TrendingUp,
  Users,
  MapPin,
  Clock
} from 'lucide-react';
// import { format } from 'date-fns';
// import { ru } from 'date-fns/locale';

const formatDate = (date: Date, formatStr: string) => {
  if (formatStr === 'dd.MM.yyyy') {
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }
  if (formatStr === 'HH:mm:ss') {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  }
  return date.toLocaleString('ru-RU');
};

interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  location: string;
  timestamp: string;
  status: 'success' | 'denied' | 'error';
  method: 'qr' | 'card' | 'biometric';
  department: string;
}

export function AccessReports() {
  const [accessLogs] = useState<AccessLog[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Иван Петров',
      location: 'Главный вход',
      timestamp: '2025-10-01T09:15:00',
      status: 'success',
      method: 'qr',
      department: 'IT отдел'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Мария Сидорова',
      location: 'Административная зона',
      timestamp: '2025-10-01T09:20:00',
      status: 'success',
      method: 'card',
      department: 'HR'
    },
    {
      id: '3',
      userId: '1',
      userName: 'Иван Петров',
      location: 'Серверная',
      timestamp: '2025-10-01T10:30:00',
      status: 'denied',
      method: 'qr',
      department: 'IT отдел'
    },
    {
      id: '4',
      userId: '3',
      userName: 'Алексей Козлов',
      location: 'Серверная',
      timestamp: '2025-10-01T10:35:00',
      status: 'success',
      method: 'biometric',
      department: 'Безопасность'
    },
    {
      id: '5',
      userId: '2',
      userName: 'Мария Сидорова',
      location: 'Главный вход',
      timestamp: '2025-10-01T18:30:00',
      status: 'success',
      method: 'qr',
      department: 'HR'
    }
  ]);

  const [filters, setFilters] = useState({
    status: 'all',
    location: 'all',
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
    searchTerm: ''
  });

  // Статистика
  const totalAccess = accessLogs.length;
  const successfulAccess = accessLogs.filter(log => log.status === 'success').length;
  const deniedAccess = accessLogs.filter(log => log.status === 'denied').length;
  const uniqueUsers = new Set(accessLogs.map(log => log.userId)).size;

  // Фильтрация логов
  const filteredLogs = accessLogs.filter(log => {
    const matchesStatus = filters.status === 'all' || log.status === filters.status;
    const matchesLocation = filters.location === 'all' || log.location === filters.location;
    const matchesSearch = !filters.searchTerm || 
      log.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      log.department.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const logDate = new Date(log.timestamp);
    const matchesDateFrom = !filters.dateFrom || logDate >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || logDate <= filters.dateTo;

    return matchesStatus && matchesLocation && matchesSearch && matchesDateFrom && matchesDateTo;
  });

  const locations = Array.from(new Set(accessLogs.map(log => log.location)));

  const exportReport = () => {
    // В реальном приложении здесь была бы генерация CSV или PDF
    const csv = [
      ['Дата', 'Время', 'Пользователь', 'Отдел', 'Локация', 'Статус', 'Метод'].join(','),
      ...filteredLogs.map(log => [
        formatDate(new Date(log.timestamp), 'dd.MM.yyyy'),
        formatDate(new Date(log.timestamp), 'HH:mm:ss'),
        log.userName,
        log.department,
        log.location,
        log.status === 'success' ? 'Успешно' : log.status === 'denied' ? 'Отказано' : 'Ошибка',
        log.method === 'qr' ? 'QR-код' : log.method === 'card' ? 'Карта' : 'Биометрия'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `access_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего проходов</p>
                <p className="text-2xl">{totalAccess}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Успешных</p>
                <p className="text-2xl text-green-600">{successfulAccess}</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Отказов</p>
                <p className="text-2xl text-red-600">{deniedAccess}</p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Уникальных пользователей</p>
                <p className="text-2xl">{uniqueUsers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Отчеты */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Журнал доступа
            </CardTitle>
            <Button onClick={exportReport}>
              <Download className="h-4 w-4 mr-2" />
              Экспорт отчета
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Фильтры */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Поиск</label>
                <Input
                  placeholder="Пользователь или отдел"
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Статус</label>
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => setFilters({...filters, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="success">Успешно</SelectItem>
                    <SelectItem value="denied">Отказано</SelectItem>
                    <SelectItem value="error">Ошибка</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Локация</label>
                <Select 
                  value={filters.location} 
                  onValueChange={(value) => setFilters({...filters, location: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все локации</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">С даты</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {filters.dateFrom ? formatDate(filters.dateFrom, 'dd.MM.yyyy') : 'Выберите дату'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateFrom || undefined}
                      onSelect={(date) => setFilters({...filters, dateFrom: date || null})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">По дату</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {filters.dateTo ? formatDate(filters.dateTo, 'dd.MM.yyyy') : 'Выберите дату'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateTo || undefined}
                      onSelect={(date) => setFilters({...filters, dateTo: date || null})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Таблица логов */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата и время</TableHead>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Отдел</TableHead>
                    <TableHead>Локация</TableHead>
                    <TableHead>Метод</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="text-sm">
                          <div>{formatDate(new Date(log.timestamp), 'dd.MM.yyyy')}</div>
                          <div className="text-gray-500">{formatDate(new Date(log.timestamp), 'HH:mm:ss')}</div>
                        </div>
                      </TableCell>
                      <TableCell>{log.userName}</TableCell>
                      <TableCell>{log.department}</TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {log.method === 'qr' ? 'QR-код' : 
                           log.method === 'card' ? 'Карта' : 'Биометрия'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            log.status === 'success' ? 'default' : 
                            log.status === 'denied' ? 'destructive' : 'secondary'
                          }
                        >
                          {log.status === 'success' ? 'Успешно' : 
                           log.status === 'denied' ? 'Отказано' : 'Ошибка'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-gray-500 text-center">
              Показано {filteredLogs.length} из {totalAccess} записей
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}