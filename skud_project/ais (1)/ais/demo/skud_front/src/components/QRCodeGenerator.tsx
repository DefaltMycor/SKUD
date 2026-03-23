import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QrCode, RefreshCw, Clock, Shield } from 'lucide-react';

interface QRCodeGeneratorProps {
  userId: string;
  userName: string;
}

export function QRCodeGenerator({ userId, userName }: QRCodeGeneratorProps) {
  const [qrCode, setQrCode] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  const generateQRCode = () => {
    // Генерируем уникальный QR код с временной меткой
    const timestamp = Date.now();
    const accessToken = `${userId}-${timestamp}`;
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 минут
    
    setExpiresAt(expires);
    
    // В реальном приложении здесь был бы настоящий QR код
    // Используем простую SVG заглушку для демонстрации
    const qrSvg = generateQRCodeSVG(accessToken);
    setQrCode(qrSvg);
  };

  const generateQRCodeSVG = (data: string) => {
    // Создаем простую сетку для имитации QR кода
    const size = 200;
    const modules = 25;
    const moduleSize = size / modules;
    
    let squares = '';
    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        // Простая псевдослучайная генерация на основе данных
        const hash = data.charCodeAt((i * modules + j) % data.length);
        if (hash % 2 === 0) {
          squares += `<rect x="${j * moduleSize}" y="${i * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`;
        }
      }
    }

    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="white"/>
        ${squares}
      </svg>
    `)}`;
  };

  useEffect(() => {
    generateQRCode();
  }, [userId]);

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('Истек');
        clearInterval(interval);
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const isExpired = timeLeft === 'Истек';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          QR-код для прохода
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center">
          <div className={`p-4 bg-white rounded-lg border-2 ${isExpired ? 'border-red-300 opacity-50' : 'border-gray-300'}`}>
            {qrCode && (
              <img 
                src={qrCode} 
                alt="QR Code" 
                className="w-48 h-48"
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm">Пользователь: {userName}</span>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              Действителен еще: 
              <Badge variant={isExpired ? 'destructive' : 'secondary'} className="ml-2">
                {timeLeft}
              </Badge>
            </span>
          </div>
        </div>

        <Button 
          onClick={generateQRCode} 
          variant="outline" 
          className="w-full"
          disabled={!isExpired && timeLeft !== ''}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {isExpired ? 'Создать новый QR-код' : 'Обновить QR-код'}
        </Button>

        <div className="text-xs text-gray-500 mt-4">
          <p>Поднесите QR-код к сканеру для прохода</p>
          <p>QR-код действителен в течение 5 минут</p>
        </div>
      </CardContent>
    </Card>
  );
}