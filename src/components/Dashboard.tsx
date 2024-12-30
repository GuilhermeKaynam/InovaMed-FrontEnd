import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PatientList from './PatientList';
import Calendar from './Calendar';
import PatientForm from './PatientForm';
import ExamManagement from './admin/ExamManagement';
import MessageInbox from './admin/MessageInbox';
import { Patient } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState<'patients' | 'calendar' | 'register' | 'exams' | 'messages'>('patients');
  const [patients, setPatients] = useState<Patient[]>([]);

  const handleNewPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
    setCurrentView('patients');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {currentView === 'patients' ? 'Dashboard' : 
               currentView === 'calendar' ? 'Agenda' : 
               currentView === 'exams' ? 'Gerenciar Exames' :
               currentView === 'messages' ? 'Mensagens' :
               'Novo Paciente'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </header>
        
        <main className="p-8">
          {currentView === 'patients' && <PatientList patients={patients} />}
          {currentView === 'calendar' && <Calendar patients={patients} />}
          {currentView === 'register' && <PatientForm onSubmit={handleNewPatient} />}
          {currentView === 'exams' && <ExamManagement />}
          {currentView === 'messages' && <MessageInbox />}
        </main>
      </div>
    </div>
  );
}