import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Heart, Phone, UserPlus, LogOut } from 'lucide-react';
import Home from './Home';
import Benefits from './Benefits';
import Contact from './Contact';
import Register from './Register';
import PatientDashboard from './dashboard/PatientDashboard';
import LandingPage from './LandingPage';

export default function PatientWebsite() {
  const [currentPage, setCurrentPage] = useState('landing');
  const { logout, user } = useAuth();

  const navigateToDashboard = (view: string) => {
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'home':
        return <Home onNavigate={navigateToDashboard} />;
      case 'benefits':
        return <Benefits />;
      case 'contact':
        return <Contact />;
      case 'register':
        return <Register />;
      case 'dashboard':
        return <PatientDashboard />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8" />
              <span className="text-xl font-bold">InovaMed</span>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('landing')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'landing' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                Início
              </button>
              <button
                onClick={() => setCurrentPage('benefits')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'benefits' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                Benefícios
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'contact' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                Contato
              </button>
              {user ? (
                <>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === 'dashboard' ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    Minha Área
                  </button>
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentPage('register')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'register' ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  Cadastro/Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{renderPage()}</main>
    </div>
  );
}