export type InsuranceType = 'Unimed' | 'Bradesco Saúde' | 'SulAmérica' | 'Amil' | 'Particular';

export type PaymentMethod = 'Cartão de Crédito' | 'Cartão de Débito' | 'PIX' | 'Boleto';

export type AppointmentStatus = 'Agendada' | 'Em Andamento' | 'Finalizada' | 'Cancelada';

export type AppointmentType = 'Consulta Regular' | 'Retorno' | 'Exame' | 'Emergência';

export type Gender = 'Masculino' | 'Feminino' | 'Outro';

export interface Appointment {
  id: string;
  patientId: string;
  type: AppointmentType;
  reason: string;
  status: AppointmentStatus;
  notes?: string;
  date: string;
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