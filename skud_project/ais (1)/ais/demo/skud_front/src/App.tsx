import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AccessReports } from './components/AccessReports';

interface User {
  email: string;
  name: string;
  id: string;
  role: 'user' | 'admin';
  accessLevel: string;
  department: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (email: string, role: 'user' | 'admin') => {
    // Симуляция данных пользователя
    const userData: User = {
      email,
      id: Math.random().toString(36).substr(2, 9),
      role,
      name: role === 'admin' ? 'Администратор Системы' : 'Иван Петров',
      accessLevel: role === 'admin' ? 'Полный' : 'Стандартный',
      department: role === 'admin' ? 'IT отдел' : 'Разработка'
    };

    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  // Если пользователь не авторизован, показываем страницу входа
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-6">
        {currentPage === 'dashboard' && currentUser.role === 'user' && (
          <UserDashboard user={currentUser} />
        )}
        
        {currentPage === 'dashboard' && currentUser.role === 'admin' && (
          <UserDashboard user={currentUser} />
        )}
        
        {currentPage === 'admin' && currentUser.role === 'admin' && (
          <AdminPanel />
        )}
        
        {currentPage === 'reports' && currentUser.role === 'admin' && (
          <AccessReports />
        )}
      </main>
    </div>
  );
}