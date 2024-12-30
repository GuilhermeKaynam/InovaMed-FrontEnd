import React, { useState } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import { formatDateTime } from '../utils/date';
import DeleteAppointmentModal from './admin/DeleteAppointmentModal';
import { Trash2, AlertCircle } from 'lucide-react';
import { Patient } from '../types';

interface CalendarProps {
  patients?: Patient[]; // Propriedade opcional
}

export default function Calendar({ patients }: CalendarProps) {
  const { appointments, loading, error, deleteAppointment } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (loading) {
    return <div className="text-center p-4">Carregando agenda...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Agenda de Consultas</h2>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-600">Nenhuma consulta agendada.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <p className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  {appointment.patientName}
                </p>
                <p className="text-sm text-gray-600">{appointment.type}</p>
                <p className="text-sm text-gray-600">{appointment.reason}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Email: {appointment.patientEmail}
                </p>
                <p className="text-sm text-gray-500">
                  Telefone: {appointment.patientPhone}
                </p>
              </div>
              <div className="text-right flex items-center gap-4">
                <p className="text-sm font-medium text-gray-800">
                  {formatDateTime(appointment.date)}
                </p>
                <button
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showDeleteModal && (
        <DeleteAppointmentModal
          onConfirm={(reason) => {
            if (selectedAppointment && reason) {
              deleteAppointment(selectedAppointment.id, reason);
              setShowDeleteModal(false);
              setSelectedAppointment(null);
            }
          }}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
}
