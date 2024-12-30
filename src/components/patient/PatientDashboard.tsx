import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock, FileText, Settings } from 'lucide-react';

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Minha Área</h1>
        <p className="text-gray-600">Bem-vindo(a) de volta, {user?.name}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Calendar className="w-8 h-8 text-teal-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Próxima Consulta
          </h3>
          <p className="text-gray-600">Nenhuma consulta agendada</p>
          <button className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium">
            Agendar Consulta
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Clock className="w-8 h-8 text-teal-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Histórico
          </h3>
          <p className="text-gray-600">Visualize suas consultas anteriores</p>
          <button className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium">
            Ver Histórico
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <FileText className="w-8 h-8 text-teal-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Exames
          </h3>
          <p className="text-gray-600">Acesse seus resultados</p>
          <button className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium">
            Ver Exames
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Settings className="w-8 h-8 text-teal-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Configurações
          </h3>
          <p className="text-gray-600">Gerencie sua conta</p>
          <button className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium">
            Editar Perfil
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Minhas Consultas
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600">Nenhuma consulta agendada</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Meus Exames
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600">Nenhum exame disponível</p>
          </div>
        </div>
      </div>
    </div>
  );
}