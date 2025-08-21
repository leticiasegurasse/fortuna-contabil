import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Clock, 
  Shield, 
  Calculator, 
  Users, 
  TrendingUp,
  MessageCircle,
  Calendar,
  BarChart3
} from 'lucide-react';
import { ROUTES } from '../../config/routes';

const ServiceIR = () => {
  const services = [
    {
      title: 'Declaração PF',
      description: 'Imposto de Renda Pessoa Física completa',
      icon: FileText
    },
    {
      title: 'Declaração PJ',
      description: 'Imposto de Renda Pessoa Jurídica',
      icon: Calculator
    },
    {
      title: 'Otimização Fiscal',
      description: 'Maximização de deduções e abatimentos',
      icon: TrendingUp
    },
    {
      title: 'Análise de Documentos',
      description: 'Verificação completa da documentação',
      icon: BarChart3
    },
    {
      title: 'Entrega Garantida',
      description: 'Entrega dentro do prazo legal',
      icon: Calendar
    },
    {
      title: 'Suporte Pós-Entrega',
      description: 'Acompanhamento após a entrega',
      icon: Users
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Declaração 100% segura e correta'
    },
    {
      icon: Clock,
      title: 'Agilidade',
      description: 'Processo rápido e eficiente'
    },
    {
      icon: Users,
      title: 'Suporte',
      description: 'Atendimento especializado'
    },
    {
      icon: TrendingUp,
      title: 'Otimização',
      description: 'Máximo aproveitamento de deduções'
    }
  ];

  const documents = [
    'Comprovantes de rendimentos',
    'Informes de rendimentos',
    'Comprovantes de despesas médicas',
    'Comprovantes de educação',
    'Comprovantes de previdência',
    'Documentos de imóveis',
    'Extratos bancários',
    'Comprovantes de doações'
  ];

  const plans = [
    {
      title: 'Declaração Básica',
      price: 'R$ 80',
      features: [
        'Declaração completa',
        'Análise básica de documentos',
        'Entrega no prazo',
        'Suporte básico'
      ],
      popular: false
    },
    {
      title: 'Declaração Completa',
      price: 'R$ 120',
      features: [
        'Declaração completa',
        'Otimização fiscal',
        'Análise detalhada',
        'Suporte prioritário',
        'Acompanhamento pós-entrega',
        'Orientações para o próximo ano'
      ],
      popular: true
    }
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
                <span>Declaração de IR</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Declaração de{' '}
                <span className="text-yellow-400">IR</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Imposto de Renda Pessoa Física e Jurídica com tranquilidade. 
                Declaração completa, otimização fiscal e suporte especializado 
                para garantir o máximo aproveitamento de deduções.
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
                  href="https://wa.me/5531990726579"
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
                    <span>Declaração segura</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Otimização fiscal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Entrega garantida</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Suporte completo</span>
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
              Declaração segura e otimizada para seu benefício
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

      {/* Services Included */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções completas para declaração de IR
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <service.icon size={32} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Planos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para sua declaração
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow ${
                  plan.popular ? 'ring-2 ring-blue-500 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Mais Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">
                    {plan.price}
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={ROUTES.CONTACT}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors inline-flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Escolher Plano
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
              Documentação necessária para sua declaração
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
              Tire suas dúvidas sobre declaração de IR
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quem precisa declarar IR?
              </h3>
              <p className="text-gray-600">
                Pessoas que receberam rendimentos tributáveis acima de R$ 28.559,70, 
                tiveram ganho de capital, possuem bens acima de R$ 300.000,00, 
                entre outros critérios. Nós analisamos seu caso.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Qual o prazo para declarar?
              </h3>
              <p className="text-gray-600">
                O prazo geralmente vai de março a abril de cada ano. 
                É importante declarar no prazo para evitar multas e juros.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso deduzir despesas médicas?
              </h3>
              <p className="text-gray-600">
                Sim! Despesas médicas, odontológicas e psicológicas são dedutíveis. 
                Nós ajudamos a identificar todas as deduções possíveis.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                O que acontece se eu não declarar?
              </h3>
              <p className="text-gray-600">
                Multa de 20% sobre o imposto devido, mais juros de 1% ao mês. 
                É importante declarar corretamente e no prazo.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Vocês fazem declaração retificadora?
              </h3>
              <p className="text-gray-600">
                Sim! Se você já declarou mas precisa corrigir algo, 
                fazemos a declaração retificadora para você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para declarar seu IR?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Entre em contato conosco e garanta uma declaração segura e otimizada. 
            Não deixe para a última hora!
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
              href="https://wa.me/5531990726579"
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

export default ServiceIR;
