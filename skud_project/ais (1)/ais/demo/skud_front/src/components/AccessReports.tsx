import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { 
  FileText, 
  Download, 
  TrendingUp,
  Users,
  MapPin,
  Clock,
  Loader2
} from 'lucide-react';
import { api } from '@/api/client';
import { useApi } from '@/hooks/useApi';

const formatDate = (date: Date | string, formatStr: string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (formatStr === 'dd.MM.yyyy') {
    return d.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }
  if (formatStr === 'HH:mm:ss') {
    return d.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  }
  return d.toLocaleString('ru-RU');
};

export function AccessReports() {
  const { data: accessEvents, loading, error } = useApi(() => api.getAccessEvents());
  
  const [filters, setFilters] = useState({
    status: 'all',
    location: 'all',
    searchTerm: ''
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Ошибка загрузки данных: {error}
      </div>
    );
  }

  const events = accessEvents || [];
  
  // Статистика
  const totalAccess = events.length;
  const successfulAccess = events.filter(e => e.result === 'GRANTED').length;
  const deniedAccess = events.filter(e => e.result === 'DENIED').length;
  const uniqueUsers = new Set(events.map(e => e.user?.id).filter(Boolean)).size;

  // Фильтрация
  const filteredEvents = events.filter(event => {
    const matchesStatus = filters.status === 'all' || event.result === filters.status;
    const matchesLocation = filters.location === 'all' || event.room?.name === filters.location;
    const matchesSearch = !filters.searchTerm || 
      event.user?.fullName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      event.room?.name?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return matchesStatus && matchesLocation && matchesSearch;
  });

  const locations = Array.from(new Set(events.map(e => e.room?.name).filter(Boolean))) as string[];

  const exportReport = () => {
    const csv = [
      ['Дата', 'Время', 'Пользователь', 'Комната', 'Карта', 'Результат', 'Причина'].join(','),
      ...filteredEvents.map(event => [
        formatDate(event.eventTime, 'dd.MM.yyyy'),
        formatDate(event.eventTime, 'HH:mm:ss'),
        event.user?.fullName || 'N/A',
        event.room?.name || 'N/A',
        event.card?.cardNumber || 'N/A',
        event.result === 'GRANTED' ? 'Разрешено' : 'Отказано',
        event.reason || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
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
                <p className="text-2xl font-bold">{totalAccess}</p>
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
                <p className="text-2xl font-bold text-green-600">{successfulAccess}</p>
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
                <p className="text-2xl font-bold text-red-600">{deniedAccess}</p>
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
                <p className="text-2xl font-bold">{uniqueUsers}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Поиск</label>
                <Input
                  placeholder="Пользователь или комната"
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
                    <SelectItem value="GRANTED">Разрешено</SelectItem>
                    <SelectItem value="DENIED">Отказано</SelectItem>
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
            </div>

            {/* Таблица логов */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата и время</TableHead>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Карта</TableHead>
                    <TableHead>Комната</TableHead>
                    <TableHead>Контроллер</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Причина</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="text-sm">
                          <div>{formatDate(event.eventTime, 'dd.MM.yyyy')}</div>
                          <div className="text-gray-500">{formatDate(event.eventTime, 'HH:mm:ss')}</div>
                        </div>
                      </TableCell>
                      <TableCell>{event.user?.fullName || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {event.card?.cardNumber || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.room?.name || 'N/A'}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {event.controller?.name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={event.result === 'GRANTED' ? 'default' : 'destructive'}
                          className={event.result === 'GRANTED' ? 'bg-green-600' : ''}
                        >
                          {event.result === 'GRANTED' ? 'Разрешено' : 'Отказано'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {event.reason}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                События не найдены
              </div>
            )}

            <div className="text-sm text-gray-500 text-center">
              Показано {filteredEvents.length} из {totalAccess} записей
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
