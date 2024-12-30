import { api } from './api';

export const adminApi = {
  patients: {
    create: async (patientData: any) => {
      const patients = JSON.parse(localStorage.getItem('patients') || '[]');
      const newPatient = { 
        ...patientData, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      patients.push(newPatient);
      localStorage.setItem('patients', JSON.stringify(patients));
      return newPatient;
    },
    list: async () => {
      return JSON.parse(localStorage.getItem('patients') || '[]');
    },
    update: async (id: string, data: any) => {
      const patients = JSON.parse(localStorage.getItem('patients') || '[]');
      const index = patients.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        patients[index] = { ...patients[index], ...data };
        localStorage.setItem('patients', JSON.stringify(patients));
        return patients[index];
      }
      throw new Error('Patient not found');
    }
  },
  exams: {
    create: async (examData: any) => {
      const exams = JSON.parse(localStorage.getItem('exams') || '[]');
      const newExam = {
        ...examData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      exams.push(newExam);
      localStorage.setItem('exams', JSON.stringify(exams));
      return newExam;
    },
    list: async () => {
      return JSON.parse(localStorage.getItem('exams') || '[]');
    }
  }
};