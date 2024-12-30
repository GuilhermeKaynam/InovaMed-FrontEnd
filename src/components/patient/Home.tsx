
import {Clock, Shield, Calendar, FileText } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bem-vindo à InovaMed
        </h1>
        <p className="text-xl text-gray-600">
          Cuidando da sua saúde com excelência e dedicação
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Calendar className="w-8 h-8 text-teal-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Próxima Consulta
          </h3>
          <p className="text-gray-600">Agende sua consulta online</p>
          <button 
            onClick={() => onNavigate('appointments')}
            className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            Agendar Consulta
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Clock className="w-8 h-8 text-teal-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Histórico
          </h3>
          <p className="text-gray-600">Visualize suas consultas anteriores</p>
          <button 
            onClick={() => onNavigate('history')}
            className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            Ver Histórico
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <FileText className="w-8 h-8 text-teal-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Exames
          </h3>
          <p className="text-gray-600">Acesse seus resultados</p>
          <button 
            onClick={() => onNavigate('exams')}
            className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            Ver Exames
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Shield className="w-8 h-8 text-teal-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Meu Perfil
          </h3>
          <p className="text-gray-600">Gerencie suas informações</p>
          <button 
            onClick={() => onNavigate('profile')}
            className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}