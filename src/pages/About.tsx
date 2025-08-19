import { Link } from 'react-router-dom';
import { CheckCircle, Users, Shield, TrendingUp, Award, Clock } from 'lucide-react';
import { ROUTES } from '../config/routes';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Atendimento Humanizado',
      description: 'Não tratamos você como mais um número. Entendemos sua realidade e falamos a língua do pequeno empreendedor.'
    },
    {
      icon: Shield,
      title: 'Transparência Total',
      description: 'Sem surpresas na cobrança. O cliente sabe exatamente o que está pagando e o valor do nosso trabalho.'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Organizado',
      description: 'Não só fazemos guias e impostos. Gostamos de explicar, orientar e ajudar o cliente a crescer de forma organizada.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Formação em Ciências Contábeis',
      description: 'Júnior conclui sua formação acadêmica, preparando-se para atender o mercado com excelência.'
    },
    {
      year: '2021',
      title: 'Início da Atuação Profissional',
      description: 'Começa a conciliar a gestão da empresa com outras atividades, adquirindo experiência prática.'
    },
    {
      year: '2022',
      title: 'Dedicação Integral',
      description: 'Com o crescimento no número de clientes, passa a dedicar-se integralmente ao negócio.'
    },
    {
      year: '2023',
      title: 'Expansão e Especialização',
      description: 'Foca em MEI e pequenas empresas, desenvolvendo soluções personalizadas e especializadas.'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-600 via-accent-700 to-accent-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Sobre a Fortuna Contábil
          </h1>
          <p className="text-xl text-accent-100 max-w-3xl mx-auto leading-relaxed">
            Especialistas em contabilidade para MEI e pequenas empresas, 
            com foco em atendimento humanizado e crescimento organizado.
          </p>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Missão */}
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-500 mb-4">Nossa Missão</h3>
              <p className="text-neutral-500 leading-relaxed">
                Descomplicar a gestão contábil para MEI e pequenas empresas, 
                oferecendo soluções personalizadas e atendimento humanizado, 
                permitindo que nossos clientes foquem no crescimento do seu negócio.
              </p>
            </div>

            {/* Visão */}
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={32} className="text-accent-500" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-500 mb-4">Nossa Visão</h3>
              <p className="text-neutral-500 leading-relaxed">
                Ser referência em contabilidade para pequenos empreendedores, 
                reconhecida pela excelência no atendimento, transparência e 
                contribuição para o sucesso dos nossos clientes.
              </p>
            </div>

            {/* Valores */}
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={32} className="text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-500 mb-4">Nossos Valores</h3>
              <p className="text-neutral-500 leading-relaxed">
                Transparência, proximidade, excelência e compromisso com o 
                crescimento organizado dos nossos clientes são os pilares 
                que guiam nosso trabalho diário.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              Nossa História
            </h2>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Conheça a trajetória da Fortuna Contábil e como nos tornamos 
              especialistas em atender pequenos empreendedores.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-neutral-500 mb-6 leading-relaxed">
                Tenho 33 anos e sou formado em Ciências Contábeis desde o final de 2020. 
                Iniciei minha atuação profissional em 2021, conciliando a gestão da empresa 
                com outras atividades.
              </p>
              <p className="text-lg text-neutral-500 mb-6 leading-relaxed">
                Com o crescimento no número de clientes, passei a dedicar-me integralmente 
                ao meu negócio, transformando-o em minha principal prioridade. Ao longo 
                desse período, adquiri muita experiência no atendimento a pequenas e 
                médias empresas.
              </p>
              <p className="text-lg text-neutral-500 leading-relaxed">
                Desenvolvi soluções personalizadas e focadas nas necessidades de cada cliente. 
                Essa trajetória tem resultado em um progresso constante da empresa, com 
                aprimoramento contínuo dos processos e da qualidade do serviço prestado.
              </p>
            </div>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-accent-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    {item.year}
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-500 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-neutral-500 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores Detalhados */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              Nossos Valores em Prática
            </h2>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Conheça os princípios que guiam nosso trabalho e nos diferenciam 
              no mercado de contabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-background-500 rounded-xl shadow-lg p-8 text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} className="text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-secondary-500 mb-4">
                  {value.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              O que nos Diferencia
            </h2>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Descubra por que a Fortuna Contábil é a escolha certa para 
              o seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">
                Especialização em MEI
              </h3>
              <p className="text-neutral-500 text-sm">
                Focamos em quem mais precisa de orientação: os pequenos empreendedores.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-accent-500" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">
                100% Online
              </h3>
              <p className="text-neutral-500 text-sm">
                Atendemos empreendedores em todo o Brasil com rapidez e eficiência.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">
                Atendimento Rápido
              </h3>
              <p className="text-neutral-500 text-sm">
                Sem perder o contato humano, oferecemos agilidade quando você precisa.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-accent-500" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">
                Crescimento Organizado
              </h3>
              <p className="text-neutral-500 text-sm">
                Ajudamos seu negócio a crescer de forma sustentável e organizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-6">
                Nossos Objetivos
              </h2>
              <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
                A curto e médio prazo, nosso objetivo é ampliar significativamente 
                a base de clientes, mantendo o compromisso com a excelência, 
                a transparência e a proximidade no relacionamento.
              </p>
              <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
                Esses são pilares essenciais para a construção de parcerias 
                duradouras e para o sucesso dos nossos clientes.
              </p>
              <Link
                to={ROUTES.CONTACT}
                className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors inline-flex items-center"
              >
                Fale Conosco
                <CheckCircle size={20} className="ml-2" />
              </Link>
            </div>

            <div className="bg-accent-500 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Próximos Passos</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-primary-400" />
                  <span>Ampliar base de clientes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-primary-400" />
                  <span>Manter excelência no atendimento</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-primary-400" />
                  <span>Fortalecer transparência</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-primary-400" />
                  <span>Construir parcerias duradouras</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-primary-400" />
                  <span>Área do cliente online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para fazer parte da nossa história?
          </h2>
          <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
            Entre em contato conosco e descubra como podemos ajudar seu negócio 
            a crescer de forma organizada e sem complicações.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-colors inline-flex items-center justify-center"
            >
              Solicitar Orçamento
              <CheckCircle size={20} className="ml-2" />
            </Link>
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-500 text-secondary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-colors inline-flex items-center justify-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
