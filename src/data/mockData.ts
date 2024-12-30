import { Patient,} from '../types';

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    age: 30,
    gender: 'Feminino',
    phone: '(11) 98765-4321',
    doctor: 'Dr. Carlos Santos',
    appointmentDate: '2024-03-20 14:30',
    insurance: 'Unimed',
    appointments: [
      {
        id: 'a1',
        patientId: '1',
        patientName: 'Maria Silva', // Adicionando o nome do paciente
        patientPhone: '(11) 98765-4321', // Adicionando o telefone do paciente
        patientEmail: 'maria.silva@email.com', // Adicionando o e-mail do paciente
        type: 'Consulta Regular',
        reason: 'Checkup anual',
        status: 'Agendada',
        date: '2024-03-20 14:30',
      },
      {
        id: 'a2',
        patientId: '1',
        patientName: 'Maria Silva', // Adicionando o nome do paciente
        patientPhone: '(11) 98765-4321', // Adicionando o telefone do paciente
        patientEmail: 'maria.silva@email.com', // Adicionando o e-mail do paciente
        type: 'Retorno',
        reason: 'Avaliação de exames',
        status: 'Finalizada',
        date: '2024-02-15 10:00',
        notes: 'Paciente apresentou melhora significativa',
      },
    ],
  },
  {
    id: '2',
    name: 'João Oliveira',
    age: 40,
    gender: 'Masculino',
    phone: '(11) 97654-3210',
    doctor: 'Dra. Ana Beatriz',
    appointmentDate: '2024-03-20 15:00',
    insurance: 'Particular',
    paymentMethod: 'Cartão de Crédito',
    paymentStatus: 'Pago',
    value: 250,
    appointments: [
      {
        id: 'a3',
        patientId: '2',
        patientName: 'João Oliveira', // Adicionando o nome do paciente
        patientPhone: '(11) 97654-3210', // Adicionando o telefone do paciente
        patientEmail: 'joao.oliveira@email.com', // Adicionando o e-mail do paciente
        type: 'Exame',
        reason: 'Exames laboratoriais',
        status: 'Em Andamento',
        date: '2024-03-20 15:00',
      },
    ],
  },
  {
    id: '3',
    name: 'Pedro Souza',
    age: 28,
    gender: 'Masculino',
    phone: '(11) 96543-2109',
    doctor: 'Dr. Ricardo Lima',
    appointmentDate: '2024-03-20 16:30',
    insurance: 'Bradesco Saúde',
    appointments: [
      {
        id: 'a4',
        patientId: '3',
        patientName: 'Pedro Souza', // Adicionando o nome do paciente
        patientPhone: '(11) 96543-2109', // Adicionando o telefone do paciente
        patientEmail: 'pedro.souza@email.com', // Adicionando o e-mail do paciente
        type: 'Consulta Regular',
        reason: 'Dores nas costas',
        status: 'Agendada',
        date: '2024-03-20 16:30',
      },
    ],
  },
];