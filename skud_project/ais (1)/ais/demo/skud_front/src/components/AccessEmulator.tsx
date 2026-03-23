// src/components/AccessEmulator.tsx
import { useState } from 'react';
import { api, Card, Controller } from '@/api/client';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card as UICard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export function AccessEmulator() {
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [selectedController, setSelectedController] = useState<string>('');
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    user: string;
    room: string;
  } | null>(null);
  const [processing, setProcessing] = useState(false);

  const { data: cards, loading: cardsLoading } = useApi(() => api.getCards());
  const { data: controllers, loading: controllersLoading } = useApi(() =>
    api.getControllers()
  );

  const handleSwipe = async () => {
    if (!selectedCard || !selectedController) {
      alert('Выберите карту и контроллер');
      return;
    }

    setProcessing(true);
    setResult(null);

    try {
      const card = await api.getCard(Number(selectedCard));
      const controller = await api.getController(Number(selectedController));

      const userId = card.user.id;
      const roomId = controller.room.id;

      // Проверка прав доступа
      const hasAccess = await api.checkAccessRights(userId, roomId);

      // Создание события
      const eventData = {
        user: { id: userId } as any,
        room: { id: roomId } as any,
        card: { id: card.id } as any,
        controller: { id: controller.id } as any,
        eventTime: new Date().toISOString(),
        result: hasAccess ? 'GRANTED' : 'DENIED',
        reason: hasAccess
          ? 'Действительные права доступа'
          : 'Нет прав доступа к данной комнате',
      };

      await api.createAccessEvent(eventData);

      setResult({
        success: hasAccess,
        message: hasAccess ? 'ДОСТУП РАЗРЕШЕН' : 'ДОСТУП ЗАПРЕЩЕН',
        user: card.user.fullName,
        room: controller.room.name,
      });
    } catch (err) {
      alert('Ошибка: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
    } finally {
      setProcessing(false);
    }
  };

  if (cardsLoading || controllersLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <UICard className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Эмулятор прикладывания карты</CardTitle>
        <CardDescription>
          Выберите карту и контроллер для проверки доступа
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Выбор карты */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Карта</label>
          <Select value={selectedCard} onValueChange={setSelectedCard}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите карту" />
            </SelectTrigger>
            <SelectContent>
              {cards?.map((card) => (
                <SelectItem key={card.id} value={card.id.toString()}>
                  {card.cardNumber} - {card.user?.fullName || 'Без владельца'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Выбор контроллера */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Контроллер</label>
          <Select
            value={selectedController}
            onValueChange={setSelectedController}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите контроллер" />
            </SelectTrigger>
            <SelectContent>
              {controllers?.map((ctrl) => (
                <SelectItem key={ctrl.id} value={ctrl.id.toString()}>
                  {ctrl.name} - {ctrl.room?.name || 'Без комнаты'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Кнопка */}
        <Button
          onClick={handleSwipe}
          disabled={!selectedCard || !selectedController || processing}
          className="w-full"
        >
          {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Приложить карту
        </Button>

        {/* Результат */}
        {result && (
          <Alert
            variant={result.success ? 'default' : 'destructive'}
            className="mt-4"
          >
            <div className="flex items-start gap-2">
              {result.success ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <div className="flex-1">
                <AlertTitle className="text-lg font-bold">
                  {result.message}
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <div className="space-y-1">
                    <p>Пользователь: {result.user}</p>
                    <p>Комната: {result.room}</p>
                  </div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}
      </CardContent>
    </UICard>
  );
}
