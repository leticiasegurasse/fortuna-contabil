import { 
  Users, 
  Clock, 
  Shield, 
  FileText, 
  Calculator, 
  TrendingUp,
  Calendar,
  UserCheck,
  BarChart3,
  Target
} from 'lucide-react';
import CTASection from '../../components/CTASection';
import FAQ from '../../components/FAQ';
import ServiceHero from '../../components/ServiceHero';
import BenefitsSection from '../../components/BenefitsSection';
import ServicesSection from '../../components/ServicesSection';
import ProcessSteps from '../../components/ProcessSteps';

const ServiceSmallBusiness = () => {
  const services = [
    {
      title: 'Contabilidade Completa',
      description: 'Gestão contábil integral para ME e EPP',
      features: ['Escrituração contábil', 'Relatórios mensais', 'Controle financeiro']
    },
    {
      title: 'Gestão Fiscal',
      description: 'Acompanhamento de todas as obrigações fiscais',
      features: ['Cálculo de impostos', 'Emissão de guias', 'Controle de prazos']
    },
    {
      title: 'Planejamento Tributário',
      description: 'Estratégias para otimização fiscal',
      features: ['Análise de enquadramento', 'Redução de custos', 'Compliance fiscal']
    },
    {
      title: 'Suporte Empresarial',
      description: 'Orientação para crescimento organizado',
      features: ['Consultoria contábil', 'Análise de viabilidade', 'Suporte estratégico']
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Trabalho realizado com total transparência'
    },
    {
      icon: Clock,
      title: 'Agilidade',
      description: 'Processos otimizados para máxima eficiência'
    },
    {
      icon: Users,
      title: 'Suporte Personalizado',
      description: 'Atendimento humanizado e direto'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Garantido',
      description: 'Base sólida para seu negócio crescer'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Análise Inicial',
      description: 'Diagnóstico da situação atual da empresa',
      icon: FileText
    },
    {
      step: '02',
      title: 'Planejamento',
      description: 'Estratégia personalizada para seu negócio',
      icon: TrendingUp
    },
    {
      step: '03',
      title: 'Implementação',
      description: 'Execução dos serviços contábeis',
      icon: Calculator
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
      question: 'Qual a diferença entre ME e EPP?',
      answer: 'ME (Microempresa) tem faturamento até R$ 360.000/ano, enquanto EPP (Empresa de Pequeno Porte) tem faturamento até R$ 4.800.000/ano. Ambas podem optar pelo Simples Nacional, mas com alíquotas diferentes.',
      icon: Target,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'O que está incluído na contabilidade completa?',
      answer: 'Incluímos escrituração contábil, relatórios mensais, gestão fiscal, planejamento tributário, emissão de guias, controle de prazos e suporte empresarial personalizado.',
      icon: BarChart3,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Como funciona o Simples Nacional?',
      answer: 'O Simples Nacional é um regime tributário que unifica 8 impostos em uma única guia mensal. As alíquotas variam conforme o faturamento e a atividade da empresa.',
      icon: Calculator,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Posso ter funcionários sendo ME ou EPP?',
      answer: 'Sim! ME pode ter até 9 funcionários e EPP pode ter até 99 funcionários. Ambas precisam cumprir obrigações trabalhistas e previdenciárias.',
      icon: UserCheck,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Quais são as obrigações mensais?',
      answer: 'As principais obrigações incluem: DAS (Simples Nacional), DARF (IR e CSLL), DCTF, SPED, e relatórios contábeis. Nós cuidamos de todas essas obrigações para você.',
      icon: Calendar,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <ServiceHero
        breadcrumb="Contabilidade para Pequenas Empresas"
        title="Contabilidade para"
        titleHighlight="Pequenas Empresas"
        description="Serviços contábeis completos para Microempresas e Empresas de Pequeno Porte. Gestão integral com foco no crescimento organizado e sustentável."
        primaryButtonText="Solicitar Orçamento"
        features={[
          "Especialização em ME e EPP",
          "Contabilidade completa",
          "Suporte personalizado",
          "Crescimento organizado"
        ]}
      />

      {/* Benefits Section */}
      <BenefitsSection
        title="Vantagens do Nosso Serviço"
        subtitle="Benefícios que fazem a diferença para pequenas empresas"
        benefits={benefits}
      />

      {/* Process Section */}
      <ProcessSteps
        title="Como Funciona Nosso Trabalho"
        subtitle="Processo estruturado para resultados efetivos"
        steps={process}
      />

      {/* Services Section */}
      <ServicesSection
        title="Nossos Serviços para Pequenas Empresas"
        subtitle="Soluções especializadas para ME e EPP"
        services={services}
        backgroundColor="background"
      />

      {/* FAQ Section */}
      <FAQ
        title="Perguntas Frequentes"
        subtitle="Tire suas dúvidas sobre contabilidade para pequenas empresas"
        items={faqItems}
      />

      {/* CTA Section */}
      <CTASection
        title="Pronto para organizar sua contabilidade?"
        description="Entre em contato conosco e descubra como podemos ajudar sua pequena empresa a crescer de forma organizada e sustentável."
        primaryButtonText="Solicitar Orçamento"
        secondaryButtonText="WhatsApp"
        secondaryButtonLink="https://wa.me/5531990726579"
        isExternalSecondary={true}
      />
    </div>
  );
};

export default ServiceSmallBusiness;
