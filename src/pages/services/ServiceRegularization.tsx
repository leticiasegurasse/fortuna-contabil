import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp,
  MessageCircle,
  AlertCircle,
  Target
} from 'lucide-react';
import { ROUTES } from '../../config/routes';

const ServiceRegularization = () => {
  const services = [
    {
      title: 'Análise da Situação',
      description: 'Diagnóstico completo da situação atual',
      icon: FileText
    },
    {
      title: 'Plano de Regularização',
      description: 'Estratégia personalizada para regularização',
      icon: Target
    },
    {
      title: 'Negociação',
      description: 'Negociação com órgãos públicos',
      icon: Users
    },
    {
      title: 'Acompanhamento',
      description: 'Monitoramento de todo o processo',
      icon: Clock
    },
    {
      title: 'Prevenção',
      description: 'Orientações para evitar problemas futuros',
      icon: Shield
    },
    {
      title: 'Suporte Contínuo',
      description: 'Acompanhamento pós-regularização',
      icon: TrendingUp
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Processo seguro e transparente'
    },
    {
      icon: Clock,
      title: 'Agilidade',
      description: 'Regularização rápida e eficiente'
    },
    {
      icon: Users,
      title: 'Experiência',
      description: 'Especialistas em regularização'
    },
    {
      icon: TrendingUp,
      title: 'Resultados',
      description: 'Empresa 100% regularizada'
    }
  ];

  const problems = [
    'Empresa em situação irregular',
    'Débitos fiscais pendentes',
    'Obrigações não cumpridas',
    'Documentação desatualizada',
    'Problemas com órgãos públicos',
    'Multas e juros acumulados'
  ];

  const solutions = [
    'Análise completa da situação',
    'Plano de pagamento negociado',
    'Regularização de documentação',
    'Cumprimento de obrigações',
    'Negociação de multas',
    'Prevenção de problemas futuros'
  ];

  const plans = [
    {
      title: 'Análise Básica',
      price: 'Sob consulta',
      features: [
        'Diagnóstico da situação',
        'Relatório de problemas',
        'Orientações básicas',
        'Suporte por 30 dias'
      ],
      popular: false
    },
    {
      title: 'Regularização Completa',
      price: 'Sob consulta',
      features: [
        'Análise completa',
        'Plano de regularização',
        'Negociação com órgãos',
        'Acompanhamento total',
        'Suporte prioritário',
        'Prevenção futura'
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
                <span>Regularização de Empresas</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Regularização de{' '}
                <span className="text-yellow-400">Empresas</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Solução completa para empresas em situação irregular. 
                Ajudamos a regularizar sua situação cadastral e fiscal, 
                negociando com órgãos públicos e garantindo a conformidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={ROUTES.CONTACT}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                >
                  Solicitar Análise
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
                    <span>Especialistas em regularização</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Negociação direta</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Acompanhamento total</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Prevenção futura</span>
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
              Regularização segura e eficiente para sua empresa
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

      {/* Problems and Solutions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Problems */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Problemas Comuns
              </h2>
              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertCircle size={24} className="text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{problem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Nossas Soluções
              </h2>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Processo completo de regularização
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Planos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o nível de serviço ideal para sua situação
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
                  Solicitar Orçamento
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            ))}
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
              Tire suas dúvidas sobre regularização
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Como sei se minha empresa está irregular?
              </h3>
              <p className="text-gray-600">
                Empresas com débitos fiscais, obrigações não cumpridas, 
                documentação desatualizada ou problemas com órgãos públicos 
                estão em situação irregular. Nós fazemos uma análise completa.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quanto tempo demora para regularizar?
              </h3>
              <p className="text-gray-600">
                O tempo varia conforme a complexidade da situação. 
                Algumas regularizações são rápidas, outras levam alguns meses. 
                Nós acompanhamos todo o processo.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso negociar multas e juros?
              </h3>
              <p className="text-gray-600">
                Sim! Muitos órgãos permitem a negociação de multas e juros. 
                Nós temos experiência em negociar as melhores condições 
                para sua empresa.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                A regularização é definitiva?
              </h3>
              <p className="text-gray-600">
                Sim, mas é importante manter a empresa em conformidade. 
                Nós orientamos sobre como evitar problemas futuros e 
                oferecemos acompanhamento contínuo.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Vocês atendem empresas de qualquer porte?
              </h3>
              <p className="text-gray-600">
                Sim! Atendemos empresas de todos os portes, desde MEI até 
                grandes corporações. Cada caso é analisado individualmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para regularizar sua empresa?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Entre em contato conosco e descubra como podemos ajudar sua empresa 
            a voltar à conformidade. Não deixe os problemas se acumularem!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
            >
              Solicitar Análise
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

export default ServiceRegularization;
