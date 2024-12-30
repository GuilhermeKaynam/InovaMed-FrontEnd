import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Appointment } from '../types';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await api.appointments.list();
      setAppointments(data);
    } catch (err) {
      setError('Erro ao carregar consultas');
    } finally {
      setLoading(false);
    }
  };

  const scheduleAppointment = async (appointmentData: Omit<Appointment, 'id'>) => {
    try {
      const newAppointment = await api.appointments.create(appointmentData);
      setAppointments([...appointments, newAppointment]);
      return true;
    } catch (err) {
      setError('Erro ao agendar consulta');
      return false;
    }
  };

  const deleteAppointment = async (id: string, reason: string) => {
    try {
      await api.appointments.delete(id, reason);
      setAppointments(appointments.filter(app => app.id !== id));
      return true;
    } catch (err) {
      setError('Erro ao cancelar consulta');
      return false;
    }
  };

  return {
    appointments,
    loading,
    error,
    scheduleAppointment,
    deleteAppointment,
    refreshAppointments: loadAppointments
  };
}