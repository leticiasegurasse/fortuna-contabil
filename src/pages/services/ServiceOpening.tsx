import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Building, 
  Clock, 
  Shield, 
  FileText, 
  Users, 
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { ROUTES } from '../../config/routes';

const ServiceOpening = () => {
  const steps = [
    {
      step: '01',
      title: 'Análise Inicial',
      description: 'Avaliamos sua necessidade e indicamos o melhor tipo de empresa para seu negócio',
      icon: FileText
    },
    {
      step: '02',
      title: 'Documentação',
      description: 'Coletamos e organizamos toda a documentação necessária',
      icon: Building
    },
    {
      step: '03',
      title: 'Protocolo',
      description: 'Protocolamos o pedido junto aos órgãos competentes',
      icon: Shield
    },
    {
      step: '04',
      title: 'Acompanhamento',
      description: 'Acompanhamos todo o processo até a emissão do CNPJ',
      icon: Clock
    },
    {
      step: '05',
      title: 'Finalização',
      description: 'CNPJ emitido e orientações pós-abertura',
      icon: Shield
    }
  ];

  const types = [
    {
      title: 'MEI - Microempreendedor Individual',
      description: 'Ideal para faturamento até R$ 81.000/ano',
      features: ['Tributação simplificada', 'Poucas obrigações', 'Ideal para iniciantes'],
      price: 'R$ 150'
    },
    {
      title: 'ME - Microempresa',
      description: 'Para faturamento até R$ 360.000/ano',
      features: ['Simples Nacional', 'Mais benefícios', 'Crescimento organizado'],
      price: 'R$ 250'
    },
    {
      title: 'EPP - Empresa de Pequeno Porte',
      description: 'Para faturamento até R$ 4.800.000/ano',
      features: ['Simples Nacional', 'Estrutura completa', 'Escalabilidade'],
      price: 'R$ 350'
    },
    {
      title: 'LTDA',
      description: 'Sociedade limitada tradicional',
      features: ['Estrutura societária', 'Flexibilidade', 'Profissionalização'],
      price: 'R$ 450'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Processo Rápido',
      description: 'Abertura em até 7 dias úteis'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Processo totalmente legal e transparente'
    },
    {
      icon: Users,
      title: 'Suporte Completo',
      description: 'Acompanhamento durante todo o processo'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Garantido',
      description: 'Base sólida para seu negócio crescer'
    }
  ];

  const documents = [
    'RG e CPF do responsável',
    'Comprovante de residência',
    'Foto 3x4 (recente)',
    'Nome da empresa (3 opções)',
    'Atividade principal',
    'Endereço comercial'
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-2 text-blue-200">
                <Link to={ROUTES.SERVICES} className="hover:text-white transition-colors">
                  Serviços
                </Link>
                <span>/</span>
                <span>Abertura de Empresas</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Abertura de{' '}
                <span className="text-yellow-400">Empresas</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Processo completo de abertura de empresas com agilidade e segurança. 
                Atendemos todos os tipos de CNPJ, desde MEI até EPP, com suporte 
                especializado durante todo o processo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={ROUTES.CONTACT}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                >
                  Solicitar Orçamento
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <a
                  href="https://wa.me/5531999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                >
                  <MessageCircle size={20} className="mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Por que escolher a Fortuna?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Processo 100% online</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Suporte especializado</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Documentação completa</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Acompanhamento total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vantagens do Nosso Serviço
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos um processo completo e transparente para abertura de empresas
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <benefit.icon size={48} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona o Processo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Processo simples e transparente em 5 etapas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <div className="flex justify-center mb-4">
                  <step.icon size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Companies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tipos de Empresa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o tipo ideal para seu negócio
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {types.map((type, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {type.description}
                  </p>
                  <div className="text-3xl font-bold text-gray-900 mb-4">
                    {type.price}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={ROUTES.CONTACT}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  Escolher Este Tipo
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Documentos Necessários
            </h2>
            <p className="text-xl text-gray-600">
              Documentação simples e rápida
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((document, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{document}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Importante:</strong> Todos os documentos podem ser enviados digitalmente. 
                Não é necessário se deslocar até nosso escritório.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre abertura de empresas
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quanto tempo demora para abrir uma empresa?
              </h3>
              <p className="text-gray-600">
                O processo completo leva em média 7 dias úteis, desde a coleta da documentação 
                até a emissão do CNPJ. Para MEI, pode ser ainda mais rápido.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Qual a diferença entre MEI e ME?
              </h3>
              <p className="text-gray-600">
                MEI é para faturamento até R$ 81.000/ano, com tributação simplificada e poucas obrigações. 
                ME é para faturamento até R$ 360.000/ano, com mais benefícios mas também mais obrigações.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso abrir empresa sendo menor de idade?
              </h3>
              <p className="text-gray-600">
                Não, é necessário ter 18 anos ou mais para abrir uma empresa. 
                Menores emancipados também podem abrir empresa.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                O que acontece se eu não tiver endereço comercial?
              </h3>
              <p className="text-gray-600">
                Você pode usar seu endereço residencial como endereço comercial, 
                desde que seja permitido pela atividade escolhida.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso mudar o tipo de empresa depois?
              </h3>
              <p className="text-gray-600">
                Sim, é possível fazer alterações no contrato social e tipo de empresa. 
                Nós também oferecemos esse serviço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para abrir sua empresa?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Entre em contato conosco e descubra qual tipo de empresa é ideal para seu negócio. 
            Oferecemos consulta gratuita para analisar sua necessidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
            >
              Solicitar Orçamento
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              <MessageCircle size={20} className="mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceOpening;
