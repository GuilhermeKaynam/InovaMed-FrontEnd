import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Patient, InsuranceType, PaymentMethod, Gender, AppointmentType } from '../types';
import { generateId } from '../utils/helpers';

interface PatientFormProps {
  onSubmit: (patient: Patient) => void;
}

const doctors = [
  'Dr. Carlos Santos',
  'Dra. Ana Beatriz',
  'Dr. Ricardo Lima',
  'Dra. Maria Oliveira'
];

export default function PatientForm({ onSubmit }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '' as Gender,
    phone: '',
    doctor: '',
    appointmentDate: '',
    insurance: '' as InsuranceType,
    paymentMethod: '' as PaymentMethod,
    appointmentType: '' as AppointmentType,
    appointmentNotes: '',
    value: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPatient: Patient = {
      id: generateId(),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      doctor: formData.doctor,
      appointmentDate: formData.appointmentDate,
      insurance: formData.insurance,
      appointments: [{
        id: generateId(),
        patientId: generateId(),
        type: formData.appointmentType,
        reason: formData.appointmentNotes,
        status: 'Agendada',
        date: formData.appointmentDate
      }]
    };

    if (formData.insurance === 'Particular') {
      newPatient.paymentMethod = formData.paymentMethod;
      newPatient.paymentStatus = 'Pendente';
      newPatient.value = parseFloat(formData.value);
    }

    // Salvar no localStorage
    const savedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    savedPatients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(savedPatients));

    onSubmit(newPatient);
    
    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: '' as Gender,
      phone: '',
      doctor: '',
      appointmentDate: '',
      insurance: '' as InsuranceType,
      paymentMethod: '' as PaymentMethod,
      appointmentType: '' as AppointmentType,
      appointmentNotes: '',
      value: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">Novo Paciente</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idade
          </label>
          <input
            type="number"
            required
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gênero
          </label>
          <select
            required
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Médico
          </label>
          <select
            required
            value={formData.doctor}
            onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="">Selecione</option>
            {doctors.map((doctor) => (
              <option key={doctor} value={doctor}>{doctor}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data e Hora da Consulta
          </label>
          <input
            type="datetime-local"
            required
            value={formData.appointmentDate}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Convênio
          </label>
          <select
            required
            value={formData.insurance}
            onChange={(e) => setFormData({ ...formData, insurance: e.target.value as InsuranceType })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="">Selecione</option>
            <option value="Unimed">Unimed</option>
            <option value="Bradesco Saúde">Bradesco Saúde</option>
            <option value="SulAmérica">SulAmérica</option>
            <option value="Amil">Amil</option>
            <option value="Particular">Particular</option>
          </select>
        </div>

        {formData.insurance === 'Particular' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Forma de Pagamento
              </label>
              <select
                required
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              >
                <option value="">Selecione</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="PIX">PIX</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor da Consulta
              </label>
              <input
                type="number"
                required
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Consulta
          </label>
          <select
            required
            value={formData.appointmentType}
            onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value as AppointmentType })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="">Selecione</option>
            <option value="Consulta Regular">Consulta Regular</option>
            <option value="Retorno">Retorno</option>
            <option value="Exame">Exame</option>
            <option value="Emergência">Emergência</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detalhes da Consulta
          </label>
          <textarea
            required
            value={formData.appointmentNotes}
            onChange={(e) => setFormData({ ...formData, appointmentNotes: e.target.value })}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Cadastrar Paciente
        </button>
      </div>
    </form>
  );
}