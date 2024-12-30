export const messageApi = {
  list: async () => {
    return JSON.parse(localStorage.getItem('contact_messages') || '[]');
  },
  
  create: async (messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    const newMessage = {
      ...messageData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    messages.push(newMessage);
    localStorage.setItem('contact_messages', JSON.stringify(messages));
    return newMessage;
  },

  markAsRead: async (id: string) => {
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    const updatedMessages = messages.map((msg: any) => 
      msg.id === id ? { ...msg, read: true } : msg
    );
    localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
  }
};