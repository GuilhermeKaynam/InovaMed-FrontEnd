import { Clock, Heart, Shield, Award, Stethoscope, Users } from 'lucide-react';

export default function Benefits() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Benefícios InovaMed
        </h1>
        <p className="text-xl text-gray-600">
          Descubra todas as vantagens de ser nosso paciente
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Clock className="w-12 h-12 text-teal-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Agendamento Online
          </h3>
          <p className="text-gray-600">
            Marque suas consultas de forma rápida e prática através da nossa
            plataforma online
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Heart className="w-12 h-12 text-teal-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Atendimento Humanizado
          </h3>
          <p className="text-gray-600">
            Equipe treinada para oferecer um atendimento acolhedor e personalizado
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Shield className="w-12 h-12 text-teal-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Segurança do Paciente
          </h3>
          <p className="text-gray-600">
            Protocolos rigorosos de segurança e higiene em todas as instalações
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Award className="w-12 h-12 text-teal-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Profissionais Certificados
          </h3>
          <p className="text-gray-600">
            Médicos e especialistas com ampla experiência e formação continuada
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Stethoscope className="w-12 h-12 text-teal-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Múltiplas Especialidades
          </h3>
          <p className="text-gray-600">
            Atendimento em diversas áreas médicas no mesmo local
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Users className="w-12 h-12 text-teal-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Programa de Fidelidade
          </h3>
          <p className="text-gray-600">
            Benefícios exclusivos para pacientes cadastrados
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Convênios Aceitos</h2>
          <p className="text-lg mb-8">
            Trabalhamos com os principais convênios do mercado
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">Unimed</div>
            <div className="bg-white/10 rounded-lg p-4">Bradesco Saúde</div>
            <div className="bg-white/10 rounded-lg p-4">SulAmérica</div>
            <div className="bg-white/10 rounded-lg p-4">Amil</div>
          </div>
        </div>
      </div>
    </div>
  );
}