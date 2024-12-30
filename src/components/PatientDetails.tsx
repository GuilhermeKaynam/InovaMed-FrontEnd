import React from 'react';
import { X } from 'lucide-react';
import { Patient, Appointment } from '../types';

interface PatientDetailsProps {
  patient: Patient;
  onClose: () => void;
}

const getStatusColor = (status: Appointment['status']) => {
  const colors = {
    'Agendada': 'bg-blue-100 text-blue-800',
    'Em Andamento': 'bg-yellow-100 text-yellow-800',
    'Finalizada': 'bg-green-100 text-green-800',
    'Cancelada': 'bg-red-100 text-red-800'
  };
  return colors[status] || colors['Agendada'];
};

export default function PatientDetails({ patient, onClose }: PatientDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Histórico de Consultas</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">{patient.name}</h3>
            <p className="text-gray-600">{patient.phone}</p>
          </div>

          <div className="space-y-4">
            {patient.appointments?.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium text-gray-800">{appointment.type}</span>
                    <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(appointment.date).toLocaleString('pt-BR')}
                </div>
                {appointment.notes && (
                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {appointment.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}