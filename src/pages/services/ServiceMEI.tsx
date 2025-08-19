import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Calculator, 
  Clock, 
  Shield, 
  FileText, 
  Users, 
  TrendingUp,
  MessageCircle,
  Calendar,
  BarChart3
} from 'lucide-react';
import { ROUTES } from '../../config/routes';

const ServiceMEI = () => {
  const services = [
    {
      title: 'Declaração Anual',
      description: 'Declaração anual do MEI (DASN-SIMEI)',
      icon: FileText
    },
    {
      title: 'Orientação Fiscal',
      description: 'Suporte completo para questões fiscais',
      icon: Calculator
    },
    {
      title: 'Controle Financeiro',
      description: 'Acompanhamento de receitas e despesas',
      icon: BarChart3
    },
    {
      title: 'Avisos de Vencimentos',
      description: 'Lembretes de obrigações mensais',
      icon: Calendar
    },
    {
      title: 'Suporte WhatsApp',
      description: 'Atendimento rápido e personalizado',
      icon: MessageCircle
    },
    {
      title: 'Relatórios Mensais',
      description: 'Relatórios detalhados do seu negócio',
      icon: TrendingUp
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Tranquilidade',
      description: 'Não se preocupe com obrigações fiscais'
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Tudo feito dentro da legislação'
    },
    {
      icon: Users,
      title: 'Suporte',
      description: 'Atendimento humanizado e personalizado'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento',
      description: 'Foque no seu negócio, deixe a burocracia conosco'
    }
  ];

  const obligations = [
    'Declaração anual (DASN-SIMEI)',
    'Controle de receitas',
    'Emissão de notas fiscais',
    'Manutenção de documentação',
    'Acompanhamento de mudanças na legislação',
    'Orientação sobre enquadramentos'
  ];

  const plans = [
    {
      title: 'Plano Básico',
      price: 'R$ 49/mês',
      features: [
        'Declaração anual',
        'Orientação básica',
        'Suporte por WhatsApp',
        'Avisos de vencimentos'
      ],
      popular: false
    },
    {
      title: 'Plano Completo',
      price: 'R$ 79/mês',
      features: [
        'Tudo do plano básico',
        'Controle financeiro',
        'Relatórios mensais',
        'Suporte prioritário',
        'Orientação avançada'
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
                <span>Contabilidade MEI</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Contabilidade{' '}
                <span className="text-yellow-400">MEI</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Gestão completa para Microempreendedores Individuais. 
                Deixe sua contabilidade conosco e foque no que realmente importa: 
                fazer seu negócio crescer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={ROUTES.CONTACT}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                >
                  Começar Agora
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
                    <span>Especialistas em MEI</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Suporte contínuo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>Preço justo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-yellow-400" />
                    <span>100% online</span>
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
              Oferecemos uma solução completa para MEI
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
              O que está Incluso
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Serviços completos para sua tranquilidade
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
              Escolha o plano ideal para seu negócio
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
              Obrigações do MEI
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
                <strong>Importante:</strong> Como MEI, você tem obrigações mensais e anuais. 
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
              Tire suas dúvidas sobre contabilidade MEI
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                MEI precisa de contador?
              </h3>
              <p className="text-gray-600">
                Embora não seja obrigatório, é altamente recomendado. Um contador especializado 
                garante que suas obrigações sejam cumpridas corretamente e evita problemas futuros.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quais são as obrigações mensais do MEI?
              </h3>
              <p className="text-gray-600">
                MEI não tem obrigações mensais, apenas a declaração anual (DASN-SIMEI) 
                e o controle de receitas. Mas é importante manter a documentação organizada.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso emitir nota fiscal como MEI?
              </h3>
              <p className="text-gray-600">
                Sim! MEI pode emitir notas fiscais. Nós orientamos sobre como fazer isso 
                corretamente e mantemos o controle das suas emissões.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                O que acontece se eu ultrapassar o limite do MEI?
              </h3>
              <p className="text-gray-600">
                Se ultrapassar R$ 81.000/ano, você precisará migrar para ME. 
                Nós ajudamos nesse processo e orientamos sobre as mudanças necessárias.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Como funciona o suporte?
              </h3>
              <p className="text-gray-600">
                Oferecemos suporte via WhatsApp, com resposta rápida. Você pode tirar dúvidas 
                a qualquer momento e receber orientações personalizadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para ter tranquilidade?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Deixe sua contabilidade conosco e foque no que realmente importa: 
            fazer seu negócio crescer. Comece hoje mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
            >
              Começar Agora
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

export default ServiceMEI;
