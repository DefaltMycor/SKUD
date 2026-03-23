import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Shield, 
  User, 
  Settings, 
  FileText, 
  LogOut,
  Bell
} from 'lucide-react';

interface HeaderProps {
  currentUser: {
    email: string;
    name: string;
    role: 'user' | 'admin';
  };
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function Header({ currentUser, currentPage, onPageChange, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Логотип и название */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">СКУД Система</h1>
              <p className="text-sm text-gray-600">Контроль и управление доступом</p>
            </div>
          </div>

          {/* Навигация */}
          <nav className="flex items-center gap-2">
            {currentUser.role === 'user' && (
              <Button
                variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => onPageChange('dashboard')}
              >
                <User className="h-4 w-4 mr-2" />
                Личный кабинет
              </Button>
            )}

            {currentUser.role === 'admin' && (
              <>
                <Button
                  variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => onPageChange('dashboard')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Профиль
                </Button>
                <Button
                  variant={currentPage === 'admin' ? 'default' : 'ghost'}
                  onClick={() => onPageChange('admin')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Управление
                </Button>
                <Button
                  variant={currentPage === 'reports' ? 'default' : 'ghost'}
                  onClick={() => onPageChange('reports')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Отчеты
                </Button>
              </>
            )}
          </nav>

          {/* Пользователь и выход */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm">{currentUser.name}</p>
                <div className="flex items-center gap-1">
                  <Badge variant={currentUser.role === 'admin' ? 'default' : 'secondary'}>
                    {currentUser.role === 'admin' ? 'Администратор' : 'Пользователь'}
                  </Badge>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}