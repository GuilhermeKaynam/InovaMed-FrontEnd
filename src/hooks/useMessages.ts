import { useState, useEffect } from 'react';
import { ContactMessage } from '../types/messages';
import { messageApi } from '../services/messageApi';

export function useMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messageApi.list();
      setMessages(data);
    } catch (err) {
      setError('Erro ao carregar mensagens');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await messageApi.markAsRead(id);
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
    } catch (err) {
      setError('Erro ao marcar mensagem como lida');
    }
  };

  return {
    messages,
    loading,
    error,
    markAsRead,
    refreshMessages: loadMessages
  };
}