import { 
  TrendingUp, 
  Clock, 
  Shield, 
  FileText, 
  Users, 
  Calculator,
  HelpCircle,
  Calendar,
  UserCheck,
  Target,
  BarChart3
} from 'lucide-react';
import CTASection from '../../components/CTASection';
import FAQ from '../../components/FAQ';
import ServiceHero from '../../components/ServiceHero';
import BenefitsSection from '../../components/BenefitsSection';
import ServicesSection from '../../components/ServicesSection';
import ProcessSteps from '../../components/ProcessSteps';

const ServiceConsulting = () => {
  const services = [
    {
      title: 'Análise Fiscal',
      description: 'Análise completa da situação fiscal da empresa',
      features: ['Identificação de oportunidades', 'Redução de custos', 'Otimização tributária']
    },
    {
      title: 'Planejamento Contábil',
      description: 'Estratégias para crescimento organizado',
      features: ['Planejamento financeiro', 'Controle de receitas', 'Gestão de despesas']
    },
    {
      title: 'Orientação Empresarial',
      description: 'Consultoria para tomada de decisões',
      features: ['Análise de viabilidade', 'Estruturação empresarial', 'Crescimento sustentável']
    },
    {
      title: 'Compliance Fiscal',
      description: 'Adequação às normas fiscais',
      features: ['Regularização fiscal', 'Prevenção de multas', 'Conformidade legal']
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução de Custos',
      description: 'Identificamos oportunidades de economia'
    },
    {
      icon: Shield,
      title: 'Segurança Fiscal',
      description: 'Trabalho realizado com total transparência'
    },
    {
      icon: Users,
      title: 'Suporte Especializado',
      description: 'Consultoria personalizada para seu negócio'
    },
    {
      icon: Calculator,
      title: 'Resultados Mensuráveis',
      description: 'Acompanhamento de indicadores e metas'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Diagnóstico',
      description: 'Análise completa da situação atual da empresa',
      icon: FileText
    },
    {
      step: '02',
      title: 'Planejamento',
      description: 'Desenvolvimento de estratégias personalizadas',
      icon: TrendingUp
    },
    {
      step: '03',
      title: 'Implementação',
      description: 'Execução das ações planejadas',
      icon: Shield
    },
    {
      step: '04',
      title: 'Acompanhamento',
      description: 'Monitoramento contínuo dos resultados',
      icon: Clock
    }
  ];

  const faqItems = [
    {
      question: 'Como funciona a consultoria contábil?',
      answer: 'Nossa consultoria é personalizada e começa com um diagnóstico completo da sua empresa. Analisamos sua situação fiscal, financeira e contábil para identificar oportunidades de melhoria e redução de custos.',
      icon: Target,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Quanto tempo dura o processo de consultoria?',
      answer: 'O tempo varia conforme a complexidade da empresa. Geralmente, o diagnóstico inicial leva 1-2 semanas, e o acompanhamento pode ser mensal, trimestral ou semestral, dependendo das suas necessidades.',
      icon: Calendar,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Que tipos de economia posso esperar?',
      answer: 'Dependendo da sua situação atual, é possível reduzir custos em 10% a 30% através de otimização tributária, melhor gestão financeira e adequação ao regime tributário mais vantajoso.',
      icon: BarChart3,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Vocês atendem empresas de qualquer porte?',
      answer: 'Sim! Atendemos desde MEI até empresas de médio porte. Cada empresa recebe um tratamento personalizado, considerando suas características específicas e necessidades.',
      icon: UserCheck,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Como é feito o acompanhamento dos resultados?',
      answer: 'Fornecemos relatórios mensais com indicadores de performance, acompanhamento de metas e reuniões periódicas para ajustar estratégias conforme necessário.',
      icon: HelpCircle,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <ServiceHero
        breadcrumb="Consultoria Contábil"
        title="Consultoria"
        titleHighlight="Contábil"
        description="Análise personalizada do seu negócio para identificar oportunidades de economia e melhor organização fiscal. Consultoria especializada para crescimento sustentável."
        primaryButtonText="Solicitar Consultoria"
        features={[
          "Consultoria personalizada",
          "Resultados mensuráveis",
          "Acompanhamento contínuo",
          "Experiência comprovada"
        ]}
      />

      {/* Benefits Section */}
      <BenefitsSection
        title="Vantagens da Consultoria"
        subtitle="Benefícios que fazem a diferença para o seu negócio"
        benefits={benefits}
      />

      {/* Process Section */}
      <ProcessSteps
        title="Como Funciona a Consultoria"
        subtitle="Processo estruturado para resultados efetivos"
        steps={process}
      />

      {/* Services Section */}
      <ServicesSection
        title="Nossos Serviços de Consultoria"
        subtitle="Soluções especializadas para diferentes necessidades"
        services={services}
        buttonText="Solicitar Consultoria"
        backgroundColor="background"
      />

      {/* FAQ Section */}
      <FAQ
        title="Perguntas Frequentes"
        subtitle="Tire suas dúvidas sobre consultoria contábil"
        items={faqItems}
      />

      {/* CTA Section */}
      <CTASection
        title="Pronto para otimizar seu negócio?"
        description="Entre em contato conosco e descubra como nossa consultoria pode ajudar sua empresa a crescer de forma organizada e sustentável."
        primaryButtonText="Solicitar Consultoria"
        secondaryButtonText="WhatsApp"
        secondaryButtonLink="https://wa.me/5531990726579"
        isExternalSecondary={true}
      />
    </div>
  );
};

export default ServiceConsulting;
