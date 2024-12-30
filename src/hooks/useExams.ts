import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Exam {
  id: string;
  type: string;
  date: string;
  doctor: string;
  status: 'Disponível' | 'Em Análise' | 'Pendente';
  result?: string;
  fileUrl?: string;
}

export function useExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      setLoading(true);
      const data = await api.exams.list();
      setExams(data);
    } catch (err) {
      setError('Erro ao carregar exames');
    } finally {
      setLoading(false);
    }
  };

  const downloadExam = async (examId: string) => {
    try {
      const exam = exams.find(e => e.id === examId);
      if (exam?.fileUrl) {
        // Abre o link em uma nova aba
        window.open(exam.fileUrl, '_blank');
      } else {
        throw new Error('URL do arquivo não disponível');
      }
    } catch (err) {
      setError('Erro ao baixar o arquivo do exame');
    }
  };

  const viewExam = async (examId: string) => {
    try {
      const exam = exams.find(e => e.id === examId);
      if (exam?.fileUrl) {
        // Abre o visualizador de PDF na mesma aba
        window.location.href = exam.fileUrl;
      } else {
        throw new Error('URL do arquivo não disponível');
      }
    } catch (err) {
      setError('Erro ao visualizar o exame');
    }
  };

  return {
    exams,
    loading,
    error,
    downloadExam,
    viewExam,
    refreshExams: loadExams
  };
}