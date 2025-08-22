import { 
  Shield, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp,
  HelpCircle,
  Calendar,
  UserCheck,
  AlertTriangle,
  CheckSquare
} from 'lucide-react';
import CTASection from '../../components/CTASection';
import FAQ from '../../components/FAQ';
import ServiceHero from '../../components/ServiceHero';
import BenefitsSection from '../../components/BenefitsSection';
import ServicesSection from '../../components/ServicesSection';
import ProcessSteps from '../../components/ProcessSteps';

const ServiceRegularization = () => {
  const services = [
    {
      title: 'Análise da Situação',
      description: 'Diagnóstico completo da irregularidade',
      features: ['Identificação de pendências', 'Análise de multas', 'Planejamento de regularização']
    },
    {
      title: 'Regularização Fiscal',
      description: 'Quitação de débitos e multas',
      features: ['Negociação de débitos', 'Parcelamento de multas', 'Quitação de pendências']
    },
    {
      title: 'Regularização Cadastral',
      description: 'Atualização de dados na Receita',
      features: ['Atualização de endereço', 'Correção de dados', 'Inclusão de atividades']
    },
    {
      title: 'Acompanhamento Contínuo',
      description: 'Monitoramento pós-regularização',
      features: ['Controle de obrigações', 'Prevenção de irregularidades', 'Suporte contínuo']
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Regularização dentro da lei'
    },
    {
      icon: Clock,
      title: 'Processo Rápido',
      description: 'Regularização em tempo hábil'
    },
    {
      icon: Users,
      title: 'Suporte Especializado',
      description: 'Acompanhamento personalizado'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Garantido',
      description: 'Base sólida para o negócio'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Diagnóstico',
      description: 'Análise completa da situação irregular',
      icon: FileText
    },
    {
      step: '02',
      title: 'Planejamento',
      description: 'Estratégia de regularização personalizada',
      icon: TrendingUp
    },
    {
      step: '03',
      title: 'Execução',
      description: 'Implementação das ações de regularização',
      icon: Shield
    },
    {
      step: '04',
      title: 'Acompanhamento',
      description: 'Monitoramento contínuo da situação',
      icon: Clock
    }
  ];

  const faqItems = [
    {
      question: 'Como sei se minha empresa está irregular?',
      answer: 'Sinais de irregularidade incluem: CNPJ inativo, pendências na Receita Federal, multas não pagas, obrigações fiscais em atraso, ou dados cadastrais desatualizados. Podemos fazer uma análise completa da sua situação.',
      icon: AlertTriangle,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Quanto tempo demora para regularizar uma empresa?',
      answer: 'O tempo varia conforme a complexidade das irregularidades. Casos simples podem ser resolvidos em 1-2 semanas, enquanto casos mais complexos podem levar 1-3 meses. Fazemos um cronograma detalhado no diagnóstico.',
      icon: Calendar,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Posso parcelar multas e débitos?',
      answer: 'Sim, a maioria das multas e débitos pode ser parcelada. Negociamos as melhores condições possíveis, incluindo redução de multas e prazos de pagamento que se adequem à sua situação financeira.',
      icon: CheckSquare,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'O que acontece se eu não regularizar?',
      answer: 'Empresas irregulares podem sofrer bloqueios, multas crescentes, impedimentos para abrir contas bancárias, restrições para participar de licitações e até mesmo a dissolução da empresa pela Receita Federal.',
      icon: HelpCircle,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Vocês garantem a regularização?',
      answer: 'Sim, garantimos que sua empresa ficará totalmente regularizada. Trabalhamos até resolver todas as pendências e fornecemos certificado de regularização. Se houver algum problema, assumimos a responsabilidade.',
      icon: UserCheck,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <ServiceHero
        breadcrumb="Regularização de Empresas"
        title="Regularização de"
        titleHighlight="Empresas"
        description="Ajudamos empresas em situação irregular a regularizar sua situação cadastral e fiscal. Processo seguro e transparente para normalizar sua empresa."
        primaryButtonText="Solicitar Regularização"
        features={[
          "Processo seguro",
          "Regularização completa",
          "Suporte especializado",
          "Acompanhamento contínuo"
        ]}
      />

      {/* Benefits Section */}
      <BenefitsSection
        title="Vantagens da Regularização"
        subtitle="Benefícios que fazem a diferença para sua empresa"
        benefits={benefits}
      />

      {/* Process Section */}
      <ProcessSteps
        title="Como Funciona a Regularização"
        subtitle="Processo estruturado para regularização efetiva"
        steps={process}
      />

      {/* Services Section */}
      <ServicesSection
        title="Nossos Serviços de Regularização"
        subtitle="Soluções especializadas para diferentes tipos de irregularidade"
        services={services}
        backgroundColor="background"
      />

      {/* FAQ Section */}
      <FAQ
        title="Perguntas Frequentes"
        subtitle="Tire suas dúvidas sobre regularização de empresas"
        items={faqItems}
      />

      {/* CTA Section */}
      <CTASection
        title="Pronto para regularizar sua empresa?"
        description="Entre em contato conosco e descubra como podemos ajudar sua empresa a sair da irregularidade e voltar a operar normalmente."
        primaryButtonText="Solicitar Regularização"
        secondaryButtonText="WhatsApp"
        secondaryButtonLink="https://wa.me/5531990726579"
        isExternalSecondary={true}
      />
    </div>
  );
};

export default ServiceRegularization;
