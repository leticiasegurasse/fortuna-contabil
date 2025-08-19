import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Clock, 
  Shield, 
  FileText, 
  Calculator, 
  TrendingUp,
  MessageCircle,
  Calendar,
  BarChart3
} from 'lucide-react';
import { ROUTES } from '../../config/routes';

const ServiceSmallBusiness = () => {
  const services = [
    {
      title: 'Escrituração Contábil',
      description: 'Escrituração completa e organizada',
      icon: FileText
    },
    {
      title: 'Apuração de Impostos',
      description: 'Cálculo e apuração de todos os impostos',
      icon: Calculator
    },
    {
      title: 'Relatórios Gerenciais',
      description: 'Relatórios para tomada de decisão',
      icon: BarChart3
    },
    {
      title: 'Suporte Fiscal',
      description: 'Orientação fiscal personalizada',
      icon: Shield
    },
    {
      title: 'Declarações Obrigatórias',
      description: 'Todas as declarações no prazo',
      icon: Calendar
    },
    {
      title: 'Orientação Empresarial',
      description: 'Consultoria para crescimento',
      icon: TrendingUp
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Tudo dentro da legislação'
    },
    {
      icon: Clock,
      title: 'Agilidade',
      description: 'Processos otimizados'
    },
    {
      icon: Users,
      title: 'Suporte',
      description: 'Atendimento personalizado'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento',
      description: 'Foco no seu negócio'
    }
  ];

  const obligations = [
    'Escrituração contábil mensal',
    'Apuração de impostos',
    'Declarações obrigatórias',
    'Relatórios gerenciais',
    'Suporte fiscal',
    'Orientação empresarial'
  ];

  const plans = [
    {
      title: 'Plano Básico',
      price: 'R$ 199/mês',
      features: [
        'Escrituração contábil',
        'Apuração de impostos',
        'Declarações obrigatórias',
        'Suporte básico'
      ],
      popular: false
    },
    {
      title: 'Plano Completo',
      price: 'R$ 299/mês',
      features: [
        'Tudo do plano básico',
        'Relatórios gerenciais',
        'Suporte prioritário',
        'Orientação empresarial',
        'Consultoria fiscal',
        'Acompanhamento mensal'
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
                <span>Contabilidade para Pequenas Empresas</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Contabilidade para{' '}
                <span className="text-yellow-400">Pequenas Empresas</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Serviços contábeis completos para Microempresas e Empresas de Pequeno Porte. 
                Escrituração, relatórios gerenciais e suporte fiscal para seu negócio crescer 
                de forma organizada e segura.
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
                    <span>Especialistas em ME e EPP</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Relatórios gerenciais</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Suporte personalizado</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Preços justos</span>
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
              Contabilidade completa para seu negócio crescer
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
              Soluções completas para pequenas empresas
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
              Escolha o plano ideal para sua empresa
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

      {/* Obligations Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Obrigações das Pequenas Empresas
            </h2>
            <p className="text-xl text-gray-600">
              Nós cuidamos de tudo isso para você
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {obligations.map((obligation, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{obligation}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Importante:</strong> ME e EPP têm obrigações mensais e anuais. 
                Nós garantimos que tudo seja feito no prazo e corretamente.
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
              Tire suas dúvidas sobre contabilidade para pequenas empresas
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Qual a diferença entre ME e EPP?
              </h3>
              <p className="text-gray-600">
                ME é para faturamento até R$ 360.000/ano, EPP é para faturamento 
                até R$ 4.800.000/ano. Ambos podem optar pelo Simples Nacional 
                e têm obrigações similares.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quais são as obrigações mensais?
              </h3>
              <p className="text-gray-600">
                Escrituração contábil, apuração de impostos, emissão de guias, 
                declarações obrigatórias e relatórios gerenciais. 
                Nós cuidamos de tudo isso.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso migrar de MEI para ME?
              </h3>
              <p className="text-gray-600">
                Sim! Se você ultrapassar o limite do MEI (R$ 81.000/ano), 
                pode migrar para ME. Nós ajudamos nesse processo.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                O que são relatórios gerenciais?
              </h3>
              <p className="text-gray-600">
                Relatórios que mostram a saúde financeira da empresa, 
                fluxo de caixa, lucratividade e outros indicadores 
                importantes para tomada de decisão.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Como funciona o suporte?
              </h3>
              <p className="text-gray-600">
                Oferecemos suporte via WhatsApp, telefone e e-mail. 
                Para clientes do plano completo, o suporte é prioritário 
                e inclui orientação empresarial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para ter uma contabilidade completa?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Entre em contato conosco e descubra como podemos ajudar sua pequena empresa 
            a crescer de forma organizada e segura.
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

export default ServiceSmallBusiness;
