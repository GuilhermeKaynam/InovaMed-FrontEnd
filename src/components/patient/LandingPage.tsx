import React from 'react';
import { Heart, Shield, Award, Activity, Clock } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Sua Saúde é Nossa Prioridade
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Na InovaMed, acreditamos que cuidar da saúde é mais do que tratar doenças - 
              é sobre prevenção, bem-estar e qualidade de vida.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              A Importância do Cuidado com a Saúde
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Manter uma boa saúde é fundamental para uma vida plena e feliz. 
              Através de check-ups regulares e acompanhamento médico, podemos 
              prevenir doenças e garantir seu bem-estar.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Heart className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prevenção é o Melhor Remédio</h3>
              <p className="text-gray-600">
                Consultas regulares e exames preventivos são essenciais para 
                identificar e tratar problemas de saúde precocemente.
              </p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cuidado Integral</h3>
              <p className="text-gray-600">
                Nossa abordagem considera todos os aspectos da sua saúde: 
                física, mental e emocional.
              </p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Acompanhamento Contínuo</h3>
              <p className="text-gray-600">
                Monitoramento constante da sua saúde para garantir os 
                melhores resultados a longo prazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-teal-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfação dos pacientes</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-teal-600 mb-2">15+</div>
              <p className="text-gray-600">Anos de experiência</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <p className="text-gray-600">Suporte médico</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Invista na Sua Saúde
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            A saúde é o nosso bem mais precioso. Não deixe para cuidar dela apenas 
            quando surgir um problema. Faça parte da nossa família e garanta uma 
            vida mais saudável e feliz.
          </p>
        </div>
      </section>
    </div>
  );
}