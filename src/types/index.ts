
export type InsuranceType = 'Unimed' | 'Bradesco Saúde' | 'SulAmérica' | 'Amil' | 'Particular';

export type PaymentMethod = 'Cartão de Crédito' | 'Cartão de Débito' | 'PIX' | 'Boleto';

export type AppointmentStatus = 'Agendada' | 'Em Andamento' | 'Finalizada' | 'Cancelada';

export type AppointmentType = 'Consulta Regular' | 'Retorno' | 'Exame' | 'Emergência';

export type Gender = 'Masculino' | 'Feminino' | 'Outro';

export interface Appointment {
  id: string; // ID da consulta
  patientId: string; // ID do paciente
  patientName: string; // Nome do paciente
  patientPhone: string; // Telefone do paciente
  patientEmail: string; // Email do paciente
  type: string; // Tipo da consulta
  reason: string; // Motivo da consulta
  status: AppointmentStatus; // Status da consulta
  date: string; // Data da consulta
  notes?: string; // Observações opcionais
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  doctor: string;
  appointmentDate: string;
  insurance: InsuranceType;
  paymentMethod?: PaymentMethod;
  paymentStatus?: 'Pendente' | 'Pago';
  value?: number;
  appointments?: Appointment[];
}