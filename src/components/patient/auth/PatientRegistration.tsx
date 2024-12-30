import React from 'react';
import { usePatientAuth } from '../../../hooks/usePatientAuth';
import RegistrationForm from './RegistrationForm';
import { PatientRegistrationData } from '../../../types/auth';

export default function PatientRegistration() {
  const { register, error } = usePatientAuth();

  const handleRegister = async (data: PatientRegistrationData) => {
    await register(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Criar Conta de Paciente
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tenha acesso aos seus exames e consultas
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <RegistrationForm onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  );
}