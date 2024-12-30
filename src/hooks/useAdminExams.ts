import { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';

export interface ExamRecord {
  id: string;
  patientId: string;
  type: string;
  date: string;
  doctor: string;
  status: 'Disponível' | 'Em Análise' | 'Pendente';
  result?: string;
  fileUrl?: string;
  createdAt: string;
}

export function useAdminExams() {
  const [exams, setExams] = useState<ExamRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      setLoading(true);
      const data = await adminApi.exams.list();
      setExams(data);
    } catch (err) {
      setError('Erro ao carregar exames');
    } finally {
      setLoading(false);
    }
  };

  const createExam = async (examData: Omit<ExamRecord, 'id' | 'createdAt'>) => {
    try {
      const newExam = await adminApi.exams.create(examData);
      setExams([...exams, newExam]);
      return true;
    } catch (err) {
      setError('Erro ao criar exame');
      return false;
    }
  };

  return {
    exams,
    loading,
    error,
    createExam,
    refreshExams: loadExams
  };
}