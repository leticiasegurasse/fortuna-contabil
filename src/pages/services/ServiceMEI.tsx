import { 
  Clock, 
  Shield, 
  Users, 
  TrendingUp,
  HelpCircle,
  Calendar,
  UserCheck,
  FileCheck,
  DollarSign
} from 'lucide-react';
import CTASection from '../../components/CTASection';
import FAQ from '../../components/FAQ';
import ServiceHero from '../../components/ServiceHero';
import BenefitsSection from '../../components/BenefitsSection';
import ServicesSection from '../../components/ServicesSection';

const ServiceMEI = () => {
  const services = [
    {
      title: 'Declaração Anual',
      description: 'Declaração completa do MEI com otimização fiscal',
      features: ['Declaração anual obrigatória', 'Otimização de impostos', 'Suporte especializado']
    },
    {
      title: 'Gestão Fiscal',
      description: 'Acompanhamento de todas as obrigações fiscais',
      features: ['Controle de impostos', 'Orientações fiscais', 'Prevenção de multas']
    },
    {
      title: 'Suporte Contínuo',
      description: 'Atendimento personalizado para suas dúvidas',
      features: ['WhatsApp direto', 'Orientações em tempo real', 'Suporte humanizado']
    },
    {
      title: 'Relatórios Mensais',
      description: 'Relatórios detalhados do seu negócio',
      features: ['Controle financeiro', 'Análise de receitas', 'Planejamento fiscal']
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Processo Simplificado',
      description: 'Menos burocracia e mais praticidade'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Trabalho realizado com total transparência'
    },
    {
      icon: Users,
      title: 'Suporte Personalizado',
      description: 'Atendimento humanizado e direto'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Organizado',
      description: 'Base sólida para seu negócio crescer'
    }
  ];



  const faqItems = [
    {
      question: 'O que é a declaração anual do MEI?',
      answer: 'É uma declaração obrigatória que todo MEI deve fazer anualmente, informando seu faturamento e pagando o DAS (Documento de Arrecadação do Simples Nacional) referente ao ano anterior.',
      icon: FileCheck,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Quando devo fazer a declaração anual?',
      answer: 'A declaração anual do MEI deve ser feita até 31 de maio do ano seguinte ao ano de referência. Por exemplo, a declaração de 2024 deve ser feita até 31 de maio de 2025.',
      icon: Calendar,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Quais são as obrigações mensais do MEI?',
      answer: 'O MEI deve pagar mensalmente o DAS (Documento de Arrecadação do Simples Nacional) no valor de R$ 66,00, independente do faturamento, desde que não ultrapasse o limite anual de R$ 81.000,00.',
      icon: DollarSign,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Posso ter funcionários sendo MEI?',
      answer: 'Não, o MEI não pode ter funcionários. Se precisar contratar, deve migrar para ME (Microempresa) ou EPP (Empresa de Pequeno Porte).',
      icon: UserCheck,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'O que acontece se eu ultrapassar o limite do MEI?',
      answer: 'Se ultrapassar R$ 81.000,00 de faturamento anual, você deve migrar para ME ou EPP. Caso contrário, pode perder o benefício do Simples Nacional e ter que pagar impostos maiores.',
      icon: HelpCircle,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <ServiceHero
        breadcrumb="Contabilidade MEI"
        title="Contabilidade"
        titleHighlight="MEI"
        description="Serviços contábeis especializados para MEI, incluindo declaração anual, orientação fiscal e suporte contínuo. Gestão completa para microempreendedores."
        primaryButtonText="Solicitar Orçamento"
        features={[
          "Especialização em MEI",
          "Atendimento personalizado",
          "Suporte via WhatsApp",
          "Preços acessíveis"
        ]}
      />

      {/* Benefits Section */}
      <BenefitsSection
        title="Vantagens do Nosso Serviço"
        subtitle="Oferecemos um serviço completo e transparente para MEI"
        benefits={benefits}
      />

      {/* Services Section */}
      <ServicesSection
        title="Nossos Serviços para MEI"
        subtitle="Serviços especializados para microempreendedores"
        services={services}
      />


      {/* FAQ Section */}
      <FAQ
        title="Perguntas Frequentes"
        subtitle="Tire suas dúvidas sobre contabilidade MEI"
        items={faqItems}
      />

      {/* CTA Section */}
      <CTASection
        title="Pronto para organizar sua contabilidade MEI?"
        description="Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer de forma organizada e sem complicações."
        primaryButtonText="Solicitar Orçamento"
        secondaryButtonText="WhatsApp"
        secondaryButtonLink="https://wa.me/5531990726579"
        isExternalSecondary={true}
      />
    </div>
  );
};

export default ServiceMEI;
