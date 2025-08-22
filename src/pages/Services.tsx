import { Link } from 'react-router-dom';
import { ArrowRight, Building, Calculator, FileText, Shield, Users, TrendingUp, Zap, Heart } from 'lucide-react';
import { ROUTES } from '../config/routes';
import CTASection from '../components/CTASection';
import SectionDivider from '../components/SectionDivider';
import FAQ from '../components/FAQ';
import sobreNosImg from '../assets/images/sobre_nos.jpg';

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
      
    },
    {
      id: '2',
      title: 'Contabilidade MEI',
      subtitle: 'Gestão completa para Microempreendedores',
      description: 'Serviços contábeis especializados para MEI, incluindo declaração anual, orientação fiscal e suporte contínuo.',
      icon: Calculator,
      
    },
    {
      id: '3',
      title: 'Consultoria Contábil',
      subtitle: 'Redução de custos e melhor organização',
      description: 'Análise personalizada do seu negócio para identificar oportunidades de economia e melhor organização fiscal.',
      icon: TrendingUp,
      
    },
    {
      id: '4',
      title: 'Declaração de IR',
      subtitle: 'Pessoa Física e Jurídica',
      description: 'Declaração completa do Imposto de Renda com otimização fiscal e suporte especializado.',
      icon: FileText,
      
    },
    {
      id: '5',
      title: 'Regularização de Empresas',
      subtitle: 'Solução para empresas irregulares',
      description: 'Ajudamos empresas em situação irregular a regularizar sua situação cadastral e fiscal.',
      icon: Shield,
      
    },
    {
      id: '6',
      title: 'Contabilidade para Pequenas Empresas',
      subtitle: 'ME e EPP',
      description: 'Serviços contábeis completos para Microempresas e Empresas de Pequeno Porte.',
      icon: Users,
      
    }
  ];



  const faqItems = [
    {
      question: 'Como funciona o processo de abertura de empresa?',
      answer: 'O processo é 100% online. Após o contato inicial, analisamos sua necessidade, escolhemos o melhor tipo de empresa e iniciamos o processo de abertura. Você acompanha tudo em tempo real e recebe suporte durante todo o processo.',
      icon: Zap,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-br from-primary-100 to-accent-100'
    },
    {
      question: 'Vocês atendem em todo o Brasil?',
      answer: 'Sim! Atendemos empreendedores em todo o território nacional. Como nosso atendimento é 100% online, não há limitações geográficas.',
      icon: Shield,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-br from-accent-100 to-primary-100'
    },
    {
      question: 'Qual a diferença entre MEI e ME?',
      answer: 'MEI é para faturamento até R$ 81.000/ano, com tributação simplificada. ME é para faturamento até R$ 360.000/ano, com mais obrigações mas também mais benefícios. Analisamos seu caso para indicar a melhor opção.',
      icon: Building,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-br from-primary-100 to-accent-100'
    },
    {
      question: 'Como funciona o suporte?',
      answer: 'Oferecemos suporte via WhatsApp, telefone e e-mail. Para clientes MEI, o suporte está incluso no valor mensal. Para outros serviços, o suporte é personalizado conforme a necessidade.',
      icon: Users,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-br from-accent-100 to-primary-100'
    },
    {
      question: 'Posso cancelar o serviço a qualquer momento?',
      answer: 'Sim, você pode cancelar a qualquer momento. Não há fidelidade ou multas. Apenas pedimos um aviso prévio para organizarmos a transição.',
      icon: Heart,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-br from-primary-100 to-accent-100'
    }
  ];

  return (
    <div className="overflow-x-hidden">
             {/* Hero Section */}
       <section className="relative py-20 h-[50vh] text-white flex items-center justify-center">
         {/* Background Image */}
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style={{ backgroundImage: `url(${sobreNosImg})` }}
         >
           <div className="absolute inset-0 bg-gradient-to-br from-accent-600/90 via-accent-700/85 to-accent-800/90"></div>
         </div>
         
         {/* Content */}
         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h1 className="text-4xl lg:text-6xl font-bold mb-6">
             Nossos Serviços
           </h1>
           <p className="text-xl text-accent-100 max-w-3xl mx-auto leading-relaxed">
             Soluções completas em contabilidade para MEI e pequenas empresas. 
             Atendimento humanizado, 100% online e transparência total.
           </p>
         </div>
       </section>

      {/* Services */}
       <section className="py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              Serviços Especializados
            </h2>
            <SectionDivider />
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Oferecemos soluções personalizadas para cada tipo de negócio, 
              sempre com foco na transparência e no crescimento organizado.
            </p>
          </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="group bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 mx-auto mb-6 w-20 h-20 flex items-center justify-center">
                      <service.icon size={40} className="text-primary-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-secondary-500 group-hover:text-primary-500 transition-colors mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-accent-600 font-medium mb-4">
                      {service.subtitle}
                    </p>
                    
                    <p className="text-neutral-500 leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      <Link
                        to={ROUTES.CONTACT}
                        className="w-full bg-accent-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-accent-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg hover:shadow-xl text-sm"
                      >
                        Solicitar Orçamento
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                      <Link
                        to={getServiceRoute(service.id)}
                        className="w-full bg-primary-50 text-primary-600 py-3 px-6 rounded-xl font-semibold hover:bg-primary-100 transition-all duration-300 inline-flex items-center justify-center border border-primary-200 text-sm"
                      >
                        Ver Detalhes
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
       </section>

       {/* FAQ Section */}
        <FAQ
          title="Perguntas Frequentes"
          subtitle="Tire suas dúvidas sobre nossos serviços"
          items={faqItems}
        />

      {/* CTA Section */}
      <CTASection
        title="Pronto para começar?"
        description="Entre em contato conosco e descubra qual serviço é ideal para o seu negócio. Oferecemos uma consulta gratuita para analisar sua necessidade."
        primaryButtonText="Solicitar Consulta Gratuita"
        secondaryButtonText="WhatsApp"
        secondaryButtonLink="https://wa.me/5531990726579"
        isExternalSecondary={true}
      />
    </div>
  );
};

export default Services;
