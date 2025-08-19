import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Shield, Building, BarChart3, Lightbulb, FileText, Play, Award, Zap, Target, MessageCircle, FileText as FileTextIcon, CheckCircle2, TrendingUp } from 'lucide-react';
import { ROUTES } from '../config/routes';

const Home = () => {
  const services = [
    {
      id: '1',
      title: 'Abertura de Empresas',
      description: 'MEI, ME, EPP e outros tipos de CNPJ com agilidade e segurança.',
      icon: Building,
      features: ['Processo 100% online', 'Suporte especializado', 'Documentação completa'],
      image: '/images/services/abertura-empresas.jpg'
    },
    {
      id: '2',
      title: 'Contabilidade MEI',
      description: 'Gestão completa para Microempreendedores Individuais.',
      icon: BarChart3,
      features: ['Declaração anual', 'Orientação fiscal', 'Suporte contínuo'],
      image: '/images/services/contabilidade-mei.jpg'
    },
    {
      id: '3',
      title: 'Consultoria Contábil',
      description: 'Redução de custos e melhor organização para seu negócio.',
      icon: Lightbulb,
      features: ['Análise personalizada', 'Estratégias de economia', 'Planejamento fiscal'],
      image: '/images/services/consultoria.jpg'
    },
    {
      id: '4',
      title: 'Declaração de IR',
      description: 'Imposto de Renda Pessoa Física e Jurídica com tranquilidade.',
      icon: FileText,
      features: ['Declaração completa', 'Otimização fiscal', 'Suporte especializado'],
      image: '/images/services/declaracao-ir.jpg'
    }
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Maria Silva',
      company: 'Salão de Beleza',
      content: 'A Fortuna Contábil transformou a gestão do meu negócio. Atendimento humanizado e sempre disponível para tirar dúvidas.',
      rating: 5,
      avatar: '/images/testimonials/maria-silva.jpg'
    },
    {
      id: '2',
      name: 'João Santos',
      company: 'Consultor de TI',
      content: 'Como MEI, precisava de uma contabilidade que entendesse minha realidade. A Fortuna foi a escolha certa!',
      rating: 5,
      avatar: '/images/testimonials/joao-santos.jpg'
    },
    {
      id: '3',
      name: 'Ana Costa',
      company: 'Loja Virtual',
      content: 'Processo de abertura da empresa foi super rápido e sem complicações. Recomendo para todos os empreendedores.',
      rating: 5,
      avatar: '/images/testimonials/ana-costa.jpg'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Processo Rápido',
      description: 'Abertura de empresa em até 48 horas'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Seus dados protegidos com a máxima segurança'
    },
    {
      icon: Target,
      title: 'Foco no Cliente',
      description: 'Atendimento personalizado para cada necessidade'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Primeiro Contato',
      description: 'Entre em contato conosco via WhatsApp, telefone ou formulário. Vamos entender suas necessidades.',
      icon: MessageCircle,
      color: 'primary'
    },
    {
      step: '02',
      title: 'Análise Personalizada',
      description: 'Analisamos seu caso e criamos uma solução personalizada para seu negócio.',
      icon: FileTextIcon,
      color: 'accent'
    },
    {
      step: '03',
      title: 'Execução Rápida',
      description: 'Executamos todo o processo de forma ágil e transparente, mantendo você informado.',
      icon: Zap,
      color: 'primary'
    },
    {
      step: '04',
      title: 'Acompanhamento Contínuo',
      description: 'Oferecemos suporte contínuo e acompanhamento para o crescimento do seu negócio.',
      icon: CheckCircle2,
      color: 'accent'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent-600 via-accent-700 to-accent-800 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/10 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-40 items-center">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 rounded-full text-primary-200 text-sm font-medium mb-4">
                <Award size={16} className="mr-2" />
                Especialistas em MEI e Pequenas Empresas
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Contabilidade{' '}
                <span className="text-primary-400">Descomplicada</span>
                {' '}para seu Negócio
              </h1>
              
              <p className="text-xl text-accent-100 leading-relaxed">
                Especialistas em MEI e pequenas empresas. Atendimento humanizado, 
                100% online e transparência total. Deixe sua contabilidade conosco 
                e foque no que realmente importa: seu negócio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={ROUTES.CONTACT}
                  className="bg-primary-500 text-secondary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg"
                >
                  Fale Conosco
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  to={ROUTES.SERVICES}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-accent-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
                >
                  Nossos Serviços
                </Link>
              </div>
              
            </div>
            
            <div className="flex-1 relative max-w-sm">
              {/* Hero Image */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Por que escolher a Fortuna?</h3>
                    <p className="text-accent-200 text-sm">Assista ao vídeo e descubra</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle size={20} className="text-primary-400 flex-shrink-0" />
                      <span className="text-sm">Atendimento humanizado</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle size={20} className="text-primary-400 flex-shrink-0" />
                      <span className="text-sm">100% online</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle size={20} className="text-primary-400 flex-shrink-0" />
                      <span className="text-sm">Transparência total</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle size={20} className="text-primary-400 flex-shrink-0" />
                      <span className="text-sm">Especialistas em MEI</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-500/20 rounded-full blur-xl"></div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background-100 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background-50 to-background-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full text-accent-600 text-sm font-medium mb-4">
              Como Funciona
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              Processo Simples e Transparente
            </h2>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Em apenas 4 passos, você terá sua contabilidade organizada e seu negócio 
              pronto para crescer de forma sustentável.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-accent-200 transform -translate-y-1/2 z-0"></div>
                )}
                
                <div className="relative z-10 bg-background-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  {/* Step Number */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto ${
                    step.color === 'primary' 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-accent-100 text-accent-600'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto ${
                    step.color === 'primary' 
                      ? 'bg-primary-50 text-primary-500' 
                      : 'bg-accent-50 text-accent-500'
                  }`}>
                    <step.icon size={24} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold text-secondary-500 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to={ROUTES.CONTACT}
              className="bg-primary-500 text-secondary-500 px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg"
            >
              Começar Agora
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-medium mb-4">
              Nossos Serviços
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              Soluções Completas para seu Negócio
            </h2>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Oferecemos soluções completas em contabilidade para MEI e pequenas empresas, 
              com foco em transparência e crescimento do seu negócio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group bg-background-500 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* Service Image */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <service.icon size={64} className="text-primary-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400 text-sm">
                    Imagem: {service.title}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-500 mb-3 group-hover:text-primary-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-neutral-500">
                        <CheckCircle size={14} className="text-accent-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              to={ROUTES.SERVICES}
              className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg"
            >
              Ver Todos os Serviços
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-medium">
                Sobre Nós
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500">
                Especialistas em Contabilidade para Pequenos Negócios
              </h2>
              
              <p className="text-lg text-neutral-500 leading-relaxed">
                Com 3 anos de experiência, somos especialistas em contabilidade para MEI e pequenas empresas. 
                Nossa missão é descomplicar a gestão contábil, oferecendo soluções personalizadas e 
                atendimento humanizado.
              </p>
              
              <p className="text-lg text-neutral-500 leading-relaxed">
                Atendemos empreendedores em todo o Brasil com rapidez e eficiência, sempre mantendo 
                a proximidade e transparência que são nossos pilares fundamentais.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={ROUTES.ABOUT}
                  className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg"
                >
                  Conheça Nossa História
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <a
                  href="#video"
                  className="border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300 inline-flex items-center"
                >
                  <Play size={20} className="mr-2" />
                  Ver Vídeo
                </a>
              </div>
            </div>
            
            <div className="relative">
              {/* About Image */}
              <div className="relative">
                <div className="bg-background-500 rounded-2xl shadow-xl p-8 relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award size={24} className="text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-500 mb-2">Nossos Valores</h3>
                    <p className="text-neutral-500 text-sm">Pilares que guiam nosso trabalho</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <Users size={20} className="text-primary-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-500">Atendimento Humanizado</h4>
                        <p className="text-neutral-500 text-sm">Não tratamos você como mais um número</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-accent-50 rounded-lg">
                      <div className="bg-accent-100 p-2 rounded-lg">
                        <Shield size={20} className="text-accent-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-500">Transparência Total</h4>
                        <p className="text-neutral-500 text-sm">Sem surpresas na cobrança</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <TrendingUp size={20} className="text-primary-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-500">Crescimento Organizado</h4>
                        <p className="text-neutral-500 text-sm">Ajudamos seu negócio a crescer</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background Image Placeholder */}
                <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-accent-200 to-primary-200 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full text-accent-600 text-sm font-medium mb-4">
              Depoimentos
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-neutral-500">
              A satisfação dos nossos clientes é nossa maior conquista
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-background-500 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="flex items-center mb-6">
                  <div className="flex items-center space-x-1 mr-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-primary-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-neutral-400">5.0</div>
                </div>
                
                <p className="text-neutral-500 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full flex items-center justify-center mr-4">
                    <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center text-neutral-500 text-sm font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-500">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600 to-accent-700"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/10 to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
            Comece Agora
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para descomplicar sua contabilidade?
          </h2>
          <p className="text-xl text-accent-100 mb-8 leading-relaxed">
            Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer 
            de forma organizada e sem complicações.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="bg-primary-500 text-secondary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg"
            >
              Solicitar Orçamento
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-accent-500 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
