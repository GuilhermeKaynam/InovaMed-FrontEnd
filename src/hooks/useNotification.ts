import { useCallback } from 'react';

export function useNotification() {
  const showNotification = useCallback((title: string, body: string) => {
    // Verifica se o navegador suporta notificações
    if (!("Notification" in window)) {
      console.log("Este navegador não suporta notificações");
      return;
    }

    // Verifica se já temos permissão
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
    // Se não foi negada, solicita permissão
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  }, []);

  return { showNotification };
}