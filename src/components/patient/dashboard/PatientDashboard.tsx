import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Calendar, Clock, FileText, User, MessageSquare, Menu, X } from 'lucide-react';
import AppointmentScheduling from './AppointmentScheduling';
import AppointmentHistory from './AppointmentHistory';
import ExamResults from './ExamResults';
import ProfileSettings from './ProfileSettings';
import Chat from './Chat';

type DashboardView = 'appointments' | 'history' | 'exams' | 'profile' | 'chat';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<DashboardView>('appointments');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'appointments', icon: Calendar, label: 'Agendar Consulta' },
    { id: 'history', icon: Clock, label: 'Histórico' },
    { id: 'exams', icon: FileText, label: 'Exames' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ];

  const renderView = () => {
    switch (currentView) {
      case 'appointments': return <AppointmentScheduling />;
      case 'history': return <AppointmentHistory />;
      case 'exams': return <ExamResults />;
      case 'profile': return <ProfileSettings />;
      case 'chat': return <Chat />;
      default: return <AppointmentScheduling />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Minha Área</h1>
            <p className="text-gray-600">Bem-vindo(a) de volta, {user?.name || user?.email}</p>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden mb-6 bg-white rounded-lg shadow-lg">
          <div className="p-2 space-y-1">
            {menuItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  setCurrentView(id as DashboardView);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-50"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu desktop */}
      <div className="hidden md:flex gap-4 mb-8">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id as DashboardView)}
            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg transition-colors ${
              currentView === id
                ? 'bg-teal-600 text-white'
                : 'bg-white hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {renderView()}
    </div>
  );
}