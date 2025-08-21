import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Building, Calculator, FileText, Shield, Users, TrendingUp, Clock } from 'lucide-react';
import { ROUTES } from '../config/routes';

const Services = () => {
  const getServiceRoute = (serviceId: string) => {
    switch (serviceId) {
      case '1': return ROUTES.SERVICE_OPENING;
      case '2': return ROUTES.SERVICE_MEI;
      case '3': return ROUTES.SERVICE_CONSULTING;
      case '4': return ROUTES.SERVICE_IR;
      case '5': return ROUTES.SERVICE_REGULARIZATION;
      case '6': return ROUTES.SERVICE_SMALL_BUSINESS;
      default: return ROUTES.SERVICES;
    }
  };
  const services = [
    {
      id: '1',
      title: 'Abertura de Empresas',
      subtitle: 'MEI, ME, EPP e outros tipos de CNPJ',
      description: 'Processo completo de abertura de empresas com agilidade e segurança. Atendemos todos os tipos de CNPJ, desde MEI até EPP.',
      icon: Building,
      features: [
        'Processo 100% online',
        'Suporte especializado durante todo o processo',
        'Documentação completa e organizada',
        'Acompanhamento até a emissão do CNPJ',
        'Orientação sobre o tipo de empresa ideal',
        'Suporte pós-abertura'
      ],
      price: 'A partir de R$ 150',
      isPopular: true
    },
    {
      id: '2',
      title: 'Contabilidade MEI',
      subtitle: 'Gestão completa para Microempreendedores',
      description: 'Serviços contábeis especializados para MEI, incluindo declaração anual, orientação fiscal e suporte contínuo.',
      icon: Calculator,
      features: [
        'Declaração anual do MEI',
        'Orientação fiscal personalizada',
        'Suporte contínuo via WhatsApp',
        'Controle de receitas e despesas',
        'Avisos de vencimentos',
        'Relatórios mensais'
      ],
      price: 'R$ 49/mês'
    },
    {
      id: '3',
      title: 'Consultoria Contábil',
      subtitle: 'Redução de custos e melhor organização',
      description: 'Análise personalizada do seu negócio para identificar oportunidades de economia e melhor organização fiscal.',
      icon: TrendingUp,
      features: [
        'Análise completa da situação fiscal',
        'Estratégias para redução de custos',
        'Planejamento tributário',
        'Orientação sobre enquadramentos',
        'Relatórios detalhados',
        'Acompanhamento mensal'
      ],
      price: 'Sob consulta'
    },
    {
      id: '4',
      title: 'Declaração de IR',
      subtitle: 'Pessoa Física e Jurídica',
      description: 'Declaração completa do Imposto de Renda com otimização fiscal e suporte especializado.',
      icon: FileText,
      features: [
        'Declaração completa de IR',
        'Otimização fiscal',
        'Suporte especializado',
        'Análise de deduções',
        'Entrega dentro do prazo',
        'Suporte pós-entrega'
      ],
      price: 'A partir de R$ 80'
    },
    {
      id: '5',
      title: 'Regularização de Empresas',
      subtitle: 'Solução para empresas irregulares',
      description: 'Ajudamos empresas em situação irregular a regularizar sua situação cadastral e fiscal.',
      icon: Shield,
      features: [
        'Análise da situação atual',
        'Plano de regularização',
        'Negociação com órgãos públicos',
        'Acompanhamento do processo',
        'Orientação preventiva',
        'Suporte contínuo'
      ],
      price: 'Sob consulta'
    },
    {
      id: '6',
      title: 'Contabilidade para Pequenas Empresas',
      subtitle: 'ME e EPP',
      description: 'Serviços contábeis completos para Microempresas e Empresas de Pequeno Porte.',
      icon: Users,
      features: [
        'Escrituração contábil completa',
        'Apuração de impostos',
        'Relatórios gerenciais',
        'Suporte fiscal',
        'Declarações obrigatórias',
        'Orientação empresarial'
      ],
      price: 'A partir de R$ 199/mês'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Agilidade',
      description: 'Processos otimizados para máxima eficiência'
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Trabalho realizado com total transparência'
    },
    {
      icon: Users,
      title: 'Suporte',
      description: 'Atendimento humanizado e personalizado'
    },
    {
      icon: TrendingUp,
      title: 'Resultados',
      description: 'Foco no crescimento do seu negócio'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Nossos Serviços
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Soluções completas em contabilidade para MEI e pequenas empresas. 
            Atendimento humanizado, 100% online e transparência total.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Serviços Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções personalizadas para cada tipo de negócio, 
              sempre com foco na transparência e no crescimento organizado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow ${
                  service.isPopular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {service.isPopular && (
                  <div className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Mais Popular
                  </div>
                )}
                
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <service.icon size={32} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    {service.price}
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={ROUTES.CONTACT}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  Solicitar Orçamento
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  to={getServiceRoute(service.id)}
                  className="w-full bg-gray-100 text-gray-900 py-2 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-flex items-center justify-center mt-2"
                >
                  Ver Detalhes
                  <ArrowRight size={16} className="ml-2" />
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
              Tire suas dúvidas sobre nossos serviços
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Como funciona o processo de abertura de empresa?
              </h3>
              <p className="text-gray-600">
                O processo é 100% online. Após o contato inicial, analisamos sua necessidade, 
                escolhemos o melhor tipo de empresa e iniciamos o processo de abertura. 
                Você acompanha tudo em tempo real e recebe suporte durante todo o processo.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Vocês atendem em todo o Brasil?
              </h3>
              <p className="text-gray-600">
                Sim! Atendemos empreendedores em todo o território nacional. 
                Como nosso atendimento é 100% online, não há limitações geográficas.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Qual a diferença entre MEI e ME?
              </h3>
              <p className="text-gray-600">
                MEI é para faturamento até R$ 81.000/ano, com tributação simplificada. 
                ME é para faturamento até R$ 360.000/ano, com mais obrigações mas também 
                mais benefícios. Analisamos seu caso para indicar a melhor opção.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Como funciona o suporte?
              </h3>
              <p className="text-gray-600">
                Oferecemos suporte via WhatsApp, telefone e e-mail. Para clientes MEI, 
                o suporte está incluso no valor mensal. Para outros serviços, 
                o suporte é personalizado conforme a necessidade.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso cancelar o serviço a qualquer momento?
              </h3>
              <p className="text-gray-600">
                Sim, você pode cancelar a qualquer momento. Não há fidelidade ou multas. 
                Apenas pedimos um aviso prévio para organizarmos a transição.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Entre em contato conosco e descubra qual serviço é ideal para o seu negócio. 
            Oferecemos uma consulta gratuita para analisar sua necessidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
            >
              Solicitar Consulta Gratuita
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <a
                              href="https://wa.me/5531990726579"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
