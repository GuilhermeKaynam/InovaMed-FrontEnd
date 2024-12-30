import { useState } from 'react';
import { PatientRegistrationData } from '../types/auth';
import { api } from '../services/api';

export function usePatientAuth() {
  const [error, setError] = useState<string | null>(null);

  const register = async (data: PatientRegistrationData) => {
    try {
      setError(null);
      await api.auth.registerPatient(data);
      // Redirect to login or dashboard
      return true;
    } catch (err) {
      setError('Erro ao criar conta. Por favor, tente novamente.');
      return false;
    }
  };

  return {
    error,
    register
  };
}