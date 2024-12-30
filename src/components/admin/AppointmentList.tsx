import React, { useState } from 'react';
import { Calendar, Trash2, AlertCircle, Mail, Phone } from 'lucide-react';
import { useAppointments } from '../../hooks/useAppointments';
import { formatDateTime } from '../../utils/date';
import DeleteAppointmentModal from './DeleteAppointmentModal';

interface PatientDetailsModalProps {
  name: string;
  email: string;
  phone: string;
  onClose: () => void;
}

function PatientDetailsModal({ name, email, phone, onClose }: PatientDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Paciente</h3>
          
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-700">Nome</p>
              <p className="text-gray-600">{name}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <p className="text-gray-600">{email}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <p className="text-gray-600">{phone}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentList() {
  const { appointments, loading, error, deleteAppointment } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

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

  const handleDelete = async (reason: string) => {
    if (selectedAppointment && reason) {
      await deleteAppointment(selectedAppointment.id, reason);
      setShowDeleteModal(false);
      setSelectedAppointment(null);
    }
  };

  const handlePatientClick = (appointment: any) => {
    setSelectedPatient({
      name: appointment.patientName,
      email: appointment.patientEmail,
      phone: appointment.patientPhone
    });
    setShowPatientDetails(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">Agenda de Consultas</h2>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-600">Nenhuma consulta agendada.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <button
                    onClick={() => handlePatientClick(appointment)}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {appointment.patientName}
                  </button>
                  <p className="text-sm text-gray-600 mt-1">{appointment.type}</p>
                  <p className="text-sm text-gray-600">{appointment.reason}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {formatDateTime(appointment.date)}
                  </p>
                </div>
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
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedAppointment(null);
          }}
        />
      )}

      {showPatientDetails && selectedPatient && (
        <PatientDetailsModal
          {...selectedPatient}
          onClose={() => {
            setShowPatientDetails(false);
            setSelectedPatient(null);
          }}
        />
      )}
    </div>
  );
}