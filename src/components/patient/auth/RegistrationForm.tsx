import React from 'react';
import { useForm } from '../../../hooks/useForm';
import { PatientRegistrationData } from '../../../types/auth';
import { INSURANCE_OPTIONS } from '../../../constants/insurance';

interface RegistrationFormProps {
  onSubmit: (data: PatientRegistrationData) => void;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const { values, errors, handleChange, handleSubmit } = useForm<PatientRegistrationData>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      phone: '',
      hasInsurance: false,
      insuranceProvider: ''
    },
    validate: (values) => {
      const errors: Partial<Record<keyof PatientRegistrationData, string>> = {};
      
      if (!values.name) errors.name = 'Nome é obrigatório';
      if (!values.email) errors.email = 'Email é obrigatório';
      if (!values.password) errors.password = 'Senha é obrigatória';
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'As senhas não coincidem';
      }
      if (!values.age) errors.age = 'Idade é obrigatória';
      if (!values.phone) errors.phone = 'Telefone é obrigatório';
      if (values.hasInsurance && !values.insuranceProvider) {
        errors.insuranceProvider = 'Selecione um convênio';
      }

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirmar Senha
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Idade
        </label>
        <input
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Telefone para Contato
        </label>
        <input
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="hasInsurance"
            checked={values.hasInsurance}
            onChange={handleChange}
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Possui convênio?
          </label>
        </div>
      </div>

      {values.hasInsurance && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Convênio
          </label>
          <select
            name="insuranceProvider"
            value={values.insuranceProvider}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="">Selecione o convênio</option>
            {INSURANCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.insuranceProvider && (
            <p className="mt-1 text-sm text-red-600">{errors.insuranceProvider}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        Criar Conta
      </button>
    </form>
  );
}