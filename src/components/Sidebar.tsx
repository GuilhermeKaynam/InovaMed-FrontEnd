import React from 'react';
import { LayoutDashboard, Users, Calendar, UserPlus, FileText, MessageSquare, Settings } from 'lucide-react';

interface SidebarProps {
  onNavigate: (view: 'patients' | 'calendar' | 'register' | 'exams' | 'messages') => void;
  currentView: string;
}

export default function Sidebar({ onNavigate, currentView }: SidebarProps) {
  return (
    <div className="bg-gradient-to-b from-teal-600 to-blue-600 h-screen w-64 text-white p-6">
      <div className="flex items-center gap-2 mb-8">
        <LayoutDashboard className="w-8 h-8" />
        <h1 className="text-2xl font-bold">InovaMed</h1>
      </div>
      
      <nav className="space-y-4">
        <button
          onClick={() => onNavigate('patients')}
          className={`flex items-center gap-3 p-3 w-full rounded-lg ${
            currentView === 'patients' ? 'bg-white/10' : 'hover:bg-white/10'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Pacientes</span>
        </button>
        <button
          onClick={() => onNavigate('calendar')}
          className={`flex items-center gap-3 p-3 w-full rounded-lg ${
            currentView === 'calendar' ? 'bg-white/10' : 'hover:bg-white/10'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Agenda</span>
        </button>
        <button
          onClick={() => onNavigate('register')}
          className={`flex items-center gap-3 p-3 w-full rounded-lg ${
            currentView === 'register' ? 'bg-white/10' : 'hover:bg-white/10'
          }`}
        >
          <UserPlus className="w-5 h-5" />
          <span>Novo Paciente</span>
        </button>
        <button
          onClick={() => onNavigate('exams')}
          className={`flex items-center gap-3 p-3 w-full rounded-lg ${
            currentView === 'exams' ? 'bg-white/10' : 'hover:bg-white/10'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Exames</span>
        </button>
        <button
          onClick={() => onNavigate('messages')}
          className={`flex items-center gap-3 p-3 w-full rounded-lg ${
            currentView === 'messages' ? 'bg-white/10' : 'hover:bg-white/10'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Mensagens</span>
        </button>
        <button className="flex items-center gap-3 p-3 w-full hover:bg-white/10 rounded-lg">
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </button>
      </nav>
    </div>
  );
}