import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Activity } from 'lucide-react';
import RegistrationForm from './patient/auth/RegistrationForm';
import { PatientRegistrationData } from '../types/auth';
import { api } from '../services/api';

export default function Login() {
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(credentials);
    if (!success) {
      setError('Credenciais inválidas');
    }
  };

  const handleRegister = async (data: PatientRegistrationData) => {
    try {
      await api.auth.registerPatient(data);
      setIsRegistering(false);
      setCredentials({ email: data.email, password: data.password });
    } catch (err) {
      setError('Erro ao criar conta');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Activity className="w-12 h-12 text-teal-600" />
          <h1 className="text-3xl font-bold text-gray-800 ml-2">InovaMed</h1>
        </div>

        {/* Toggle Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setIsRegistering(false)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
              !isRegistering
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegistering(true)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
              isRegistering
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Criar Conta
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-6">
            {error}
          </div>
        )}
        
        {isRegistering ? (
          <RegistrationForm onSubmit={handleRegister} />
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}