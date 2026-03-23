import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Edit, 
  Trash2, 
  Search,
  Settings
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  accessLevel: string;
  status: 'active' | 'inactive';
  zones: string[];
}

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan.petrov@company.com',
      department: 'IT отдел',
      accessLevel: 'Стандартный',
      status: 'active',
      zones: ['Главный вход', 'Офисные помещения']
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      email: 'maria.sidorova@company.com',
      department: 'HR',
      accessLevel: 'Расширенный',
      status: 'active',
      zones: ['Главный вход', 'Офисные помещения', 'Административная зона']
    },
    {
      id: '3',
      name: 'Алексей Козлов',
      email: 'alexey.kozlov@company.com',
      department: 'Безопасность',
      accessLevel: 'Полный',
      status: 'active',
      zones: ['Главный вход', 'Офисные помещения', 'Серверная', 'Административная зона']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const accessZones = [
    'Главный вход',
    'Офисные помещения',
    'Серверная',
    'Административная зона',
    'Парковка',
    'Склад'
  ];

  const accessLevels = [
    'Гость',
    'Стандартный',
    'Расширенный',
    'Полный'
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: '',
      email: '',
      department: '',
      accessLevel: 'Стандартный',
      status: 'active',
      zones: ['Главный вход']
    };
    setSelectedUser(newUser);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего пользователей</p>
                <p className="text-2xl">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Активных</p>
                <p className="text-2xl">{users.filter(u => u.status === 'active').length}</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Зон доступа</p>
                <p className="text-2xl">{accessZones.length}</p>
              </div>
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Отделов</p>
                <p className="text-2xl">{new Set(users.map(u => u.department)).size}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Управление пользователями */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Управление пользователями</CardTitle>
            <Button onClick={handleAddUser}>
              <UserPlus className="h-4 w-4 mr-2" />
              Добавить пользователя
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Поиск */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск по имени, email или отделу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Таблица пользователей */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Отдел</TableHead>
                  <TableHead>Уровень доступа</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.accessLevel}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                      >
                        {user.status === 'active' ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog для добавления/редактирования пользователя */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.id && users.find(u => u.id === selectedUser.id) 
                ? 'Редактировать пользователя' 
                : 'Добавить пользователя'
              }
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <UserForm 
              user={selectedUser}
              accessLevels={accessLevels}
              accessZones={accessZones}
              onSave={handleSaveUser}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface UserFormProps {
  user: User;
  accessLevels: string[];
  accessZones: string[];
  onSave: (user: User) => void;
  onCancel: () => void;
}

function UserForm({ user, accessLevels, accessZones, onSave, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<User>(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleZoneChange = (zone: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        zones: [...formData.zones, zone]
      });
    } else {
      setFormData({
        ...formData,
        zones: formData.zones.filter(z => z !== zone)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Отдел</Label>
        <Input
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Уровень доступа</Label>
        <Select 
          value={formData.accessLevel} 
          onValueChange={(value) => setFormData({...formData, accessLevel: value})}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {accessLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Доступ к зонам</Label>
        <div className="space-y-2">
          {accessZones.map((zone) => (
            <div key={zone} className="flex items-center space-x-2">
              <Checkbox
                id={zone}
                checked={formData.zones.includes(zone)}
                onCheckedChange={(checked) => handleZoneChange(zone, checked as boolean)}
              />
              <Label htmlFor={zone} className="text-sm">{zone}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Сохранить
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Отмена
        </Button>
      </div>
    </form>
  );
}