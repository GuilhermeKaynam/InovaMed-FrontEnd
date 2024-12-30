import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { useExams } from '../../../hooks/useExams';
import { formatDate } from '../../../utils/date';

export default function ExamResults() {
  const { exams, loading, error, downloadExam, viewExam } = useExams();

  if (loading) {
    return <div className="text-center p-4">Carregando exames...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">Resultados de Exames</h2>
      </div>

      <div className="space-y-4">
        {exams.length === 0 ? (
          <p className="text-gray-600">Nenhum exame disponível.</p>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-gray-800">{exam.type}</span>
                  <p className="text-sm text-gray-600 mt-1">Dr(a). {exam.doctor}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  exam.status === 'Disponível' ? 'bg-green-100 text-green-800' :
                  exam.status === 'Em Análise' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {exam.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {formatDate(exam.date)}
              </div>
              {exam.result && (
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-2">
                  {exam.result}
                </p>
              )}
              <div className="flex gap-2">
                <button 
                  onClick={() => viewExam(exam.id)}
                  className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
                >
                  <Eye className="w-4 h-4" />
                  Visualizar
                </button>
                <button 
                  onClick={() => downloadExam(exam.id)}
                  className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}