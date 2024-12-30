import { useState, useEffect } from 'react';
import { api } from '../services/api';

export interface PatientAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  insurance: string;
  insuranceNumber: string;
  createdAt: string;
}

export function useAdminPatients() {
  const [patients, setPatients] = useState<PatientAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      // Busca os usuários registrados (role: 'patient')
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const registeredPatients = users.filter((user: any) => user.role === 'patient');
      setPatients(registeredPatients);
    } catch (err) {
      setError('Erro ao carregar pacientes');
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (patientData: Omit<PatientAccount, 'id' | 'createdAt'>) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newPatient = {
        ...patientData,
        id: Date.now().toString(),
        role: 'patient',
        createdAt: new Date().toISOString()
      };
      users.push(newPatient);
      localStorage.setItem('users', JSON.stringify(users));
      setPatients(prev => [...prev, newPatient]);
      return true;
    } catch (err) {
      setError('Erro ao criar paciente');
      return false;
    }
  };

  const updatePatient = async (id: string, data: Partial<PatientAccount>) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...data };
        localStorage.setItem('users', JSON.stringify(users));
        setPatients(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
        return true;
      }
      throw new Error('Paciente não encontrado');
    } catch (err) {
      setError('Erro ao atualizar paciente');
      return false;
    }
  };

  return {
    patients,
    loading,
    error,
    createPatient,
    updatePatient,
    refreshPatients: loadPatients
  };
}