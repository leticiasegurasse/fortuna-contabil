import { Users, Shield, TrendingUp, Award, Clock, Star, Target, Heart } from 'lucide-react';
import sobreNosImg from '../assets/images/sobre_nos.jpg';
import fundadorImg from '../assets/images/fundador.png';
import SectionDivider from '../components/SectionDivider';
import CTASection from '../components/CTASection';

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

  const diferenciais = [
    {
      icon: Users,
      title: 'Especialização em MEI',
      description: 'Focamos em quem mais precisa de orientação: os pequenos empreendedores.',
      color: 'primary'
    },
    {
      icon: Shield,
      title: '100% Online',
      description: 'Atendemos empreendedores em todo o Brasil com rapidez e eficiência.',
      color: 'accent'
    },
    {
      icon: Clock,
      title: 'Atendimento Rápido',
      description: 'Sem perder o contato humano, oferecemos agilidade quando você precisa.',
      color: 'primary'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Organizado',
      description: 'Ajudamos seu negócio a crescer de forma sustentável e organizada.',
      color: 'accent'
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
            Sobre a Fortuna Contábil
          </h1>
          <p className="text-xl text-accent-100 max-w-3xl mx-auto leading-relaxed">
            Especialistas em contabilidade para MEI e pequenas empresas, 
            com foco em atendimento humanizado e crescimento organizado.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4 relative">
              <span className="relative z-10">Nossa História</span>
            </h2>
            <SectionDivider />
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Conheça a trajetória da Fortuna Contábil e como nos tornamos 
              especialistas em atender pequenos empreendedores.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto da História */}
            <div>
              <p className="text-lg text-justify text-neutral-500 mb-6 leading-relaxed">
                A Fortuna Contábil nasceu para transformar a relação dos pequenos negócios com a contabilidade.
                Somos uma equipe apaixonada por simplificar a burocracia e ajudar empreendedores, MEIs e
                pequenas empresas a crescerem com segurança e organização.
              </p>
              <p className="text-lg text-justify text-neutral-500 mb-6 leading-relaxed">
                Com atendimento personalizado e linguagem clara, cuidamos da parte fiscal, tributária e
                financeira para que você possa focar no que realmente importa: o sucesso do seu negócio.
              </p>
              <p className="text-lg text-justify text-neutral-500 leading-relaxed">
                Aqui, sua empresa tem apoio completo para estar sempre em dia com o governo, pagar menos
                impostos e tomar decisões estratégicas com confiança.
              </p>
              <p className="text-lg text-justify text-neutral-500 leading-relaxed font-semibold mt-6">
                Fortuna Contábil — sua parceira para crescer com segurança.
              </p>
            </div>

            {/* Imagem do Fundador */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Background decorative square */}
                <div className="w-80 h-80 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center shadow-lg">
                  {/* Main content square */}
                  <div className="w-72 h-72 bg-background-500 rounded-xl flex items-center justify-center border-4 border-white shadow-inner relative overflow-hidden">
                    <img 
                      src={fundadorImg} 
                      alt="Fundador da Fortuna Contábil"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                
                {/* Legenda do Fundador */}
                <div className="text-center mt-6">
                  <h3 className="text-xl font-bold text-secondary-500 mb-2">Júnior - Fundador</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Contador especializado em<br />
                    MEI e pequenas empresas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Detalhados */}
      <section className="py-20 bg-gradient-to-br from-white to-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4 relative">
              <span className="relative z-10">Nossos Valores em Prática</span>
            </h2>
            <SectionDivider />
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Conheça os princípios que guiam nosso trabalho e nos diferenciam 
              no mercado de contabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <value.icon size={40} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-500 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed">
                    {value.description}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="w-8 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-gradient-to-br from-background-100 to-background-200 relative overflow-hidden">
        

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4 relative">
              <span className="relative z-10">O que nos Diferencia</span>
            </h2>
            <SectionDivider />
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Descubra por que a Fortuna Contábil é a escolha certa para 
              o seu negócio.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {diferenciais.map((diferencial, index) => (
              <div key={index} className={`group relative flex flex-col lg:flex-row items-center gap-8`}>
                {/* Ícone e número */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className={`w-24 h-24 bg-gradient-to-br from-${diferencial.color}-100 to-${diferencial.color}-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <diferencial.icon size={48} className={`text-${diferencial.color}-600`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="w-full text-center lg:text-left">
                  <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl border-l-4 border-accent-500">
                    <h3 className="text-2xl font-bold text-secondary-500 mb-4 flex items-center justify-center lg:justify-start">
                      {diferencial.title}
                      <div className={`ml-3 w-2 h-2 bg-${diferencial.color}-500 rounded-full`}></div>
                    </h3>
                    <p className="text-neutral-500 leading-relaxed text-lg">
                      {diferencial.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Elemento decorativo central */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
              <span className="text-secondary-500 font-semibold">Cada diferencial é um compromisso com sua empresa</span>
            </div>
          </div>
        </div>
      </section>

             {/* CTA Section */}
       <CTASection
         title="Pronto para fazer parte da nossa história?"
         description="Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer de forma organizada e sem complicações."
         primaryButtonText="Solicitar Orçamento"
         primaryButtonLink="/contato"
         secondaryButtonText="WhatsApp"
         secondaryButtonLink="https://wa.me/5531990726579"
         isExternalSecondary={true}
       />
    </div>
  );
};

export default About;
