import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, Building2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, role: 'user' | 'admin') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Симуляция авторизации
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password) {
      // Определяем роль по email для демонстрации
      const role = email.includes('admin') ? 'admin' : 'user';
      onLogin(email, role);
    } else {
      setError('Пожалуйста, заполните все поля');
    }
    
    setLoading(false);
  };

  const demoLogin = (role: 'user' | 'admin') => {
    const demoEmail = role === 'admin' ? 'admin@company.com' : 'user@company.com';
    onLogin(demoEmail, role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl mb-2">СКУД Система</h1>
          <p className="text-gray-600">Система контроля и управления доступом</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Авторизация
            </CardTitle>
            <CardDescription>
              Введите ваши учетные данные для входа в систему
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Введите ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-sm text-gray-600 mb-4">Демо аккаунты:</p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => demoLogin('user')}
                >
                  Войти как пользователь
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => demoLogin('admin')}
                >
                  Войти как администратор
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}