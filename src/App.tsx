import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientWebsite from './components/patient/PatientWebsite';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    return user?.role === 'admin' ? <Dashboard /> : <PatientWebsite />;
  }
  
  return <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;