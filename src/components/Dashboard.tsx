import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PatientList from './PatientList';
import Calendar from './Calendar';
import PatientForm from './PatientForm';
import ExamManagement from './admin/ExamManagement';
import MessageInbox from './admin/MessageInbox';
import { Patient } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState<'patients' | 'calendar' | 'register' | 'exams' | 'messages'>('patients');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNewPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
    setCurrentView('patients');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Overlay para mobile quando sidebar está aberta */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 z-30 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <Sidebar 
          onNavigate={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
          }}
          currentView={currentView}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center px-4 md:px-8 py-4">
            {/* Botão do menu mobile */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <h1 className="text-xl font-semibold text-gray-800">
              {currentView === 'patients' ? 'Pacientes' : 
               currentView === 'calendar' ? 'Agenda' : 
               currentView === 'register' ? 'Novo Paciente' :
               currentView === 'exams' ? 'Exames' : 'Mensagens'}
            </h1>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden md:inline">
                {user?.email}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Sair</span>
              </button>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {currentView === 'patients' && <PatientList patients={patients} />}
            {currentView === 'calendar' && <Calendar />}
            {currentView === 'register' && <PatientForm onSubmit={handleNewPatient} />}
            {currentView === 'exams' && <ExamManagement />}
            {currentView === 'messages' && <MessageInbox />}
          </div>
        </main>
      </div>
    </div>
  );
}