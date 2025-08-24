import { Shield, Lock, Eye, Users, FileText, CheckCircle } from 'lucide-react';
import SectionDivider from '../components/SectionDivider';
import CTASection from '../components/CTASection';

const PrivacyPolicy = () => {
  const lastUpdate = "15 de Janeiro de 2025";

  const sections = [
    {
      title: "1. Informações que Coletamos",
      content: [
        "Informações pessoais fornecidas diretamente por você, como nome, e-mail, telefone, CPF/CNPJ, endereço e informações da empresa.",
        "Informações de uso do site, incluindo páginas visitadas, tempo de permanência e interações.",
        "Informações técnicas como endereço IP, tipo de navegador e dispositivo utilizado.",
        "Dados contábeis e fiscais necessários para prestação dos nossos serviços."
      ]
    },
    {
      title: "2. Como Utilizamos suas Informações",
      content: [
        "Para prestar nossos serviços contábeis e fiscais de forma adequada.",
        "Para comunicar informações importantes sobre seus serviços e obrigações.",
        "Para melhorar nossos serviços e experiência do usuário.",
        "Para cumprir obrigações legais e regulamentares.",
        "Para enviar comunicações sobre novos serviços e atualizações (com seu consentimento)."
      ]
    },
    {
      title: "3. Compartilhamento de Dados",
      content: [
        "Não vendemos, alugamos ou comercializamos suas informações pessoais.",
        "Podemos compartilhar dados com órgãos governamentais quando exigido por lei.",
        "Utilizamos serviços de terceiros confiáveis para operação do site e serviços (Google Analytics, hospedagem, etc.).",
        "Todos os parceiros são obrigados a manter a confidencialidade dos dados."
      ]
    },
    {
      title: "4. Segurança dos Dados",
      content: [
        "Implementamos medidas técnicas e organizacionais para proteger suas informações.",
        "Utilizamos criptografia SSL para transmissão segura de dados.",
        "Acesso restrito aos dados apenas para funcionários autorizados.",
        "Monitoramento contínuo de segurança e atualizações regulares."
      ]
    },
    {
      title: "5. Seus Direitos",
      content: [
        "Acessar, corrigir ou atualizar suas informações pessoais.",
        "Solicitar a exclusão de dados não essenciais para prestação dos serviços.",
        "Revogar consentimento para comunicações promocionais.",
        "Solicitar portabilidade dos seus dados.",
        "Entrar em contato conosco para esclarecimentos sobre o tratamento de dados."
      ]
    },
    {
      title: "6. Retenção de Dados",
      content: [
        "Mantemos seus dados pelo tempo necessário para prestação dos serviços.",
        "Dados contábeis são mantidos conforme exigido pela legislação fiscal.",
        "Após o término da relação contratual, dados podem ser mantidos por até 5 anos.",
        "Você pode solicitar a exclusão de dados não essenciais a qualquer momento."
      ]
    },
    {
      title: "7. Cookies e Tecnologias Similares",
      content: [
        "Utilizamos cookies para melhorar a experiência de navegação.",
        "Cookies essenciais para funcionamento do site são sempre ativos.",
        "Cookies analíticos podem ser desativados através das configurações do navegador.",
        "Não utilizamos cookies para publicidade ou rastreamento invasivo."
      ]
    },
    {
      title: "8. Menores de Idade",
      content: [
        "Nossos serviços não são direcionados a menores de 18 anos.",
        "Não coletamos intencionalmente dados de menores de idade.",
        "Se você é menor de idade, não deve fornecer informações pessoais sem autorização dos pais ou responsáveis.",
        "Caso identifiquos dados de menores, tomaremos medidas para removê-los."
      ]
    },
    {
      title: "9. Alterações na Política",
      content: [
        "Esta política pode ser atualizada periodicamente para refletir mudanças em nossos serviços.",
        "Alterações significativas serão comunicadas através do site ou e-mail.",
        "O uso continuado dos serviços após mudanças constitui aceitação da nova política.",
        "A data da última atualização sempre estará visível no topo desta página."
      ]
    },
    {
      title: "10. Contato",
      content: [
        "Para dúvidas sobre esta política ou tratamento de dados, entre em contato:",
        "E-mail: fortunacontabill@gmail.com",
        "Telefone: (31) 99072-6579",
        "Endereço: Belo Horizonte - MG, Brasil",
        "Horário de atendimento: Segunda a Sexta, 8h às 18h"
      ]
    }
  ];

  const highlights = [
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Seus dados estão protegidos com as melhores práticas de segurança"
    },
    {
      icon: Lock,
      title: "Confidencialidade",
      description: "Todas as informações são tratadas com total sigilo profissional"
    },
    {
      icon: Eye,
      title: "Transparência",
      description: "Você tem controle total sobre suas informações pessoais"
    },
    {
      icon: Users,
      title: "Respeito à Privacidade",
      description: "Seguimos rigorosamente a LGPD e boas práticas de proteção de dados"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 h-[50vh] text-white flex items-center justify-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600/90 via-accent-700/85 to-accent-800/90"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Política de Privacidade
          </h1>
          <p className="text-xl text-accent-100 max-w-3xl mx-auto leading-relaxed">
            Sua privacidade é fundamental para nós. Conheça como protegemos e tratamos suas informações pessoais.
          </p>
          <div className="mt-6 text-sm text-accent-200">
            Última atualização: {lastUpdate}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              Nossos Compromissos
            </h2>
            <SectionDivider />
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Trabalhamos com transparência e responsabilidade para proteger seus dados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <highlight.icon size={40} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-500 mb-3">
                  {highlight.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              Política Completa
            </h2>
            <SectionDivider />
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Conheça em detalhes como tratamos e protegemos suas informações
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-background-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-secondary-500 mb-6 flex items-center">
                  <FileText size={28} className="text-accent-500 mr-3" />
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-neutral-600 leading-relaxed">
                      <CheckCircle size={20} className="text-accent-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-12 bg-accent-50 border border-accent-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-accent-500 p-3 rounded-xl">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-secondary-500 mb-3">
                  Importante
                </h4>
                <p className="text-neutral-600 leading-relaxed">
                  Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) 
                  e demais regulamentações aplicáveis. Ao utilizar nossos serviços, você concorda com os termos 
                  desta política de privacidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Dúvidas sobre Privacidade?"
        description="Entre em contato conosco para esclarecer qualquer dúvida sobre o tratamento de seus dados pessoais."
        primaryButtonText="Falar com Especialista"
        secondaryButtonText="Enviar E-mail"
        secondaryButtonLink="mailto:fortunacontabill@gmail.com"
        isExternalSecondary={true}
        variant="accent"
      />
    </div>
  );
};

export default PrivacyPolicy;
