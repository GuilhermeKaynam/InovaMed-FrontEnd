import React, { useState } from 'react';
import { formatCurrency } from '../utils/format';
import PatientDetails from './PatientDetails';
import { Patient } from '../types';

interface PatientListProps {
  patients: Patient[];
}

export default function PatientList({ patients }: PatientListProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Consultas do Dia</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médico</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Convênio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagamento</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedPatient(patient)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600 hover:text-blue-800">{patient.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.doctor}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(patient.appointmentDate).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.insurance === 'Particular' 
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {patient.insurance}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.insurance === 'Particular' && (
                    <div className="text-sm">
                      <div className="text-gray-900">{patient.paymentMethod}</div>
                      <div className={`text-sm ${
                        patient.paymentStatus === 'Pago' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {patient.paymentStatus} - {patient.value && formatCurrency(patient.value)}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedPatient && (
        <PatientDetails 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      )}
    </>
  );
}