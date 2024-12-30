import React from 'react';
import { Clock, FileText } from 'lucide-react';
import { useAppointments } from '../../../hooks/useAppointments';
import { formatDateTime } from '../../../utils/date';

export default function AppointmentHistory() {
  const { appointments, loading, error } = useAppointments();

  if (loading) {
    return <div className="text-center p-4">Carregando histórico...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">Histórico de Consultas</h2>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-600">Nenhuma consulta registrada.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-gray-800">{appointment.type}</span>
                  <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  appointment.status === 'Agendada' ? 'bg-blue-100 text-blue-800' :
                  appointment.status === 'Finalizada' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {formatDateTime(appointment.date)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}