import { ChatMessage, Conversation } from '../types/chat';

export const chatApi = {
  getConversations: async (userId: string, role: string) => {
    let conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    
    if (role === 'admin') {
      return conversations;
    }
    return conversations.filter((conv: Conversation) => conv.patientId === userId);
  },

  getMessages: async (conversationId: string) => {
    const messages = JSON.parse(localStorage.getItem('chat_messages') || '[]');
    return messages
      .filter((msg: ChatMessage) => msg.conversationId === conversationId)
      .sort((a: ChatMessage, b: ChatMessage) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  },

  sendMessage: async (message: Omit<ChatMessage, 'id' | 'createdAt' | 'read'>) => {
    const messages = JSON.parse(localStorage.getItem('chat_messages') || '[]');
    const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };

    messages.push(newMessage);
    localStorage.setItem('chat_messages', JSON.stringify(messages));

    // Atualiza a última mensagem da conversa sem incrementar contador
    const convIndex = conversations.findIndex((c: Conversation) => c.id === message.conversationId);
    if (convIndex !== -1) {
      conversations[convIndex] = {
        ...conversations[convIndex],
        lastMessage: message.content,
        lastMessageDate: newMessage.createdAt
      };
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }

    return newMessage;
  },

  startConversation: async (patientData: Omit<Conversation, 'id' | 'lastMessage' | 'lastMessageDate' | 'unreadCount'>) => {
    const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    
    // Procura uma conversa existente para o paciente
    const existingConv = conversations.find((c: Conversation) => c.patientId === patientData.patientId);
    if (existingConv) {
      return existingConv;
    }

    // Cria uma nova conversa
    const newConversation = {
      ...patientData,
      id: Date.now().toString(),
      lastMessage: '',
      lastMessageDate: new Date().toISOString()
    };

    conversations.push(newConversation);
    localStorage.setItem('conversations', JSON.stringify(conversations));

    // Cria a primeira mensagem do sistema
    const welcomeMessage = {
      id: Date.now().toString(),
      conversationId: newConversation.id,
      senderId: 'system',
      senderRole: 'admin',
      content: 'Bem-vindo ao chat da clínica! Como podemos ajudar?',
      createdAt: new Date().toISOString(),
      read: false
    };

    const messages = JSON.parse(localStorage.getItem('chat_messages') || '[]');
    messages.push(welcomeMessage);
    localStorage.setItem('chat_messages', JSON.stringify(messages));

    return newConversation;
  }
};