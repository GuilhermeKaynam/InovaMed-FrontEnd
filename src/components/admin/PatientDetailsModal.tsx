import React from 'react';
import { X, Phone, Mail, Calendar } from 'lucide-react';
import { Patient } from '../../types';
import { formatDateTime } from '../../utils/date';

interface PatientDetailsModalProps {
  patient: Patient;
  onClose: () => void;
}

export default function PatientDetailsModal({ patient, onClose }: PatientDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Detalhes do Paciente</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{patient.name}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {patient.phone}
                </div>
                {patient.insurance === 'Particular' && (
                  <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-md text-sm">
                    Paciente Particular
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Próxima consulta: {formatDateTime(patient.appointmentDate)}
              </div>
              <div>Médico: {patient.doctor}</div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Histórico de Consultas</h4>
            <div className="space-y-4">
              {patient.appointments?.map((appointment) => (
                <div key={appointment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium text-gray-800">{appointment.type}</span>
                      <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Finalizada' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'Em Andamento' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDateTime(appointment.date)}
                  </div>
                  {appointment.notes && (
                    <p className="mt-2 text-sm text-gray-600 bg-white p-2 rounded">
                      {appointment.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}