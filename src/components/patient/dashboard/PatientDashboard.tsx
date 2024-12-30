import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Calendar, Clock, FileText, User, MessageSquare } from 'lucide-react';
import AppointmentScheduling from './AppointmentScheduling';
import AppointmentHistory from './AppointmentHistory';
import ExamResults from './ExamResults';
import ProfileSettings from './ProfileSettings';
import Chat from './Chat';

type DashboardView = 'appointments' | 'history' | 'exams' | 'profile' | 'chat';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<DashboardView>('appointments');

  const renderView = () => {
    switch (currentView) {
      case 'appointments':
        return <AppointmentScheduling />;
      case 'history':
        return <AppointmentHistory />;
      case 'exams':
        return <ExamResults />;
      case 'profile':
        return <ProfileSettings />;
      case 'chat':
        return <Chat />;
      default:
        return <AppointmentScheduling />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Minha Área</h1>
        <p className="text-gray-600">Bem-vindo(a) de volta, {user?.name}</p>
      </div>

      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <button
          onClick={() => setCurrentView('appointments')}
          className={`flex items-center gap-3 p-4 rounded-lg ${
            currentView === 'appointments'
              ? 'bg-teal-600 text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Agendar</span>
        </button>

        <button
          onClick={() => setCurrentView('history')}
          className={`flex items-center gap-3 p-4 rounded-lg ${
            currentView === 'history'
              ? 'bg-teal-600 text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Histórico</span>
        </button>

        <button
          onClick={() => setCurrentView('exams')}
          className={`flex items-center gap-3 p-4 rounded-lg ${
            currentView === 'exams'
              ? 'bg-teal-600 text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Exames</span>
        </button>

        <button
          onClick={() => setCurrentView('chat')}
          className={`flex items-center gap-3 p-4 rounded-lg ${
            currentView === 'chat'
              ? 'bg-teal-600 text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setCurrentView('profile')}
          className={`flex items-center gap-3 p-4 rounded-lg ${
            currentView === 'profile'
              ? 'bg-teal-600 text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Perfil</span>
        </button>
      </div>

      {renderView()}
    </div>
  );
}