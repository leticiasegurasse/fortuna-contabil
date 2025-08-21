import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  FileText, 
  Users, 
  Calculator,
  MessageCircle,
  BarChart3,
  Lightbulb,
  Target
} from 'lucide-react';
import { ROUTES } from '../../config/routes';

const ServiceConsulting = () => {
  const services = [
    {
      title: 'Análise Fiscal',
      description: 'Análise completa da situação fiscal da empresa',
      icon: Calculator
    },
    {
      title: 'Planejamento Tributário',
      description: 'Estratégias para redução de carga tributária',
      icon: TrendingUp
    },
    {
      title: 'Otimização de Custos',
      description: 'Identificação de oportunidades de economia',
      icon: Target
    },
    {
      title: 'Reestruturação',
      description: 'Reorganização da estrutura empresarial',
      icon: BarChart3
    },
    {
      title: 'Due Diligence',
      description: 'Análise detalhada para aquisições',
      icon: FileText
    },
    {
      title: 'Gestão de Riscos',
      description: 'Identificação e mitigação de riscos fiscais',
      icon: Shield
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Economia Real',
      description: 'Redução efetiva de custos e impostos'
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Todas as estratégias dentro da lei'
    },
    {
      icon: Users,
      title: 'Suporte Especializado',
      description: 'Consultores experientes e dedicados'
    },
    {
      icon: Lightbulb,
      title: 'Inovação',
      description: 'Soluções criativas e personalizadas'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Diagnóstico',
      description: 'Análise completa da situação atual',
      icon: FileText
    },
    {
      step: '02',
      title: 'Planejamento',
      description: 'Desenvolvimento de estratégias personalizadas',
      icon: Target
    },
    {
      step: '03',
      title: 'Implementação',
      description: 'Execução das ações planejadas',
      icon: TrendingUp
    },
    {
      step: '04',
      title: 'Acompanhamento',
      description: 'Monitoramento dos resultados',
      icon: BarChart3
    }
  ];

  const plans = [
    {
      title: 'Consultoria Básica',
      price: 'Sob consulta',
      features: [
        'Análise fiscal inicial',
        'Relatório de oportunidades',
        'Orientação básica',
        'Suporte por 30 dias'
      ],
      popular: false
    },
    {
      title: 'Consultoria Completa',
      price: 'Sob consulta',
      features: [
        'Análise completa',
        'Planejamento tributário',
        'Acompanhamento mensal',
        'Suporte prioritário',
        'Relatórios detalhados',
        'Implementação das ações'
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
                <span>Consultoria Contábil</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Consultoria{' '}
                <span className="text-yellow-400">Contábil</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Análise personalizada do seu negócio para identificar oportunidades 
                de economia e melhor organização fiscal. Transforme sua contabilidade 
                em uma ferramenta de crescimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={ROUTES.CONTACT}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                >
                  Solicitar Consulta
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
                    <span>Consultores experientes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Análise personalizada</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Resultados comprovados</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Acompanhamento contínuo</span>
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
              Vantagens da Consultoria
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme sua contabilidade em vantagem competitiva
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
              Nossos Serviços de Consultoria
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções especializadas para diferentes necessidades
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

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Processo estruturado para resultados efetivos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
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

      {/* Plans Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Planos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o nível de consultoria ideal para seu negócio
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
              Tire suas dúvidas sobre consultoria contábil
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Qual empresa precisa de consultoria contábil?
              </h3>
              <p className="text-gray-600">
                Empresas de todos os portes podem se beneficiar da consultoria. 
                Desde pequenas empresas que querem otimizar custos até grandes 
                corporações que precisam de estratégias complexas.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quanto tempo demora para ver resultados?
              </h3>
              <p className="text-gray-600">
                Os resultados podem ser vistos em diferentes prazos. Algumas 
                otimizações são imediatas, outras levam alguns meses para 
                implementação completa.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                A consultoria é legal?
              </h3>
              <p className="text-gray-600">
                Sim! Nossa consultoria trabalha sempre dentro da legislação. 
                Identificamos oportunidades legais de economia sem comprometer 
                a segurança da empresa.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Como é feito o diagnóstico inicial?
              </h3>
              <p className="text-gray-600">
                Analisamos toda a documentação fiscal, estrutura empresarial, 
                fluxo de caixa e processos internos para identificar 
                oportunidades de melhoria.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Vocês acompanham a implementação?
              </h3>
              <p className="text-gray-600">
                Sim! Não apenas recomendamos as ações, mas acompanhamos toda 
                a implementação e monitoramos os resultados para garantir 
                o sucesso das estratégias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para otimizar sua empresa?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Entre em contato conosco e descubra como podemos ajudar sua empresa 
            a crescer de forma mais eficiente e organizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
            >
              Solicitar Consulta
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

export default ServiceConsulting;
