import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { DOCTORS } from '../../../constants/doctors';
import { AppointmentType } from '../../../types';
import { useAppointments } from '../../../hooks/useAppointments';
import { useAuth } from '../../../contexts/AuthContext';

export default function AppointmentScheduling() {
  const { user } = useAuth();
  const { scheduleAppointment, error } = useAppointments();
  const [appointment, setAppointment] = useState<{
    date: string;
    time: string;
    doctor: string;
    type: AppointmentType | '';
    reason: string;
  }>({
    date: '',
    time: '',
    doctor: '',
    type: '',
    reason: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const appointmentPayload: any = {
    date: `${appointment.date}T${appointment.time}`,
    type: appointment.type,
    reason: appointment.reason,
    status: 'Agendada',
  };

  if (user?.email) {
    appointmentPayload.patientEmail = user.email;
  }

  const result = await scheduleAppointment(appointmentPayload);

  if (result) {
    setSuccess(true);
    setAppointment({
      date: '',
      time: '',
      doctor: '',
      type: '',
      reason: ''
    });
    setTimeout(() => setSuccess(false), 3000);
  }
};

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">Agendar Consulta</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          Consulta agendada com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              type="date"
              required
              value={appointment.date}
              onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horário
            </label>
            <input
              type="time"
              required
              value={appointment.time}
              onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Médico
            </label>
            <select
              required
              value={appointment.doctor}
              onChange={(e) => setAppointment({ ...appointment, doctor: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            >
              <option value="">Selecione o médico</option>
              {DOCTORS.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Consulta
            </label>
            <select
              required
              value={appointment.type}
              onChange={(e) => setAppointment({ ...appointment, type: e.target.value as AppointmentType })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            >
              <option value="">Selecione o tipo</option>
              <option value="Consulta Regular">Consulta Regular</option>
              <option value="Retorno">Retorno</option>
              <option value="Exame">Exame</option>
              <option value="Emergência">Emergência</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo da Consulta
            </label>
            <textarea
              required
              value={appointment.reason}
              onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Descreva o motivo da sua consulta..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Agendar Consulta
          </button>
        </div>
      </form>
    </div>
  );
}
