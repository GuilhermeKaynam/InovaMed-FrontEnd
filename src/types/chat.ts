export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: 'admin' | 'patient';
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  lastMessage?: string;
  lastMessageDate?: string;
  unreadCount: number;
}