import { 
  Building, 
  Clock, 
  Shield, 
  FileText, 
  Users, 
  TrendingUp,
  HelpCircle,
  Calendar,
  UserCheck,
  MapPin,
  RefreshCw
} from 'lucide-react';
import CTASection from '../../components/CTASection';
import FAQ from '../../components/FAQ';
import ServiceHero from '../../components/ServiceHero';
import BenefitsSection from '../../components/BenefitsSection';
import ServicesSection from '../../components/ServicesSection';
import ProcessSteps from '../../components/ProcessSteps';

const ServiceOpening = () => {
  const steps = [
    {
      step: '01',
      title: 'Análise Inicial',
      description: 'Avaliamos sua necessidade e indicamos o melhor tipo de empresa para seu negócio',
      icon: FileText
    },
    {
      step: '02',
      title: 'Documentação',
      description: 'Coletamos e organizamos toda a documentação necessária',
      icon: Building
    },
    {
      step: '03',
      title: 'Protocolo',
      description: 'Protocolamos o pedido junto aos órgãos competentes',
      icon: Shield
    },
    {
      step: '04',
      title: 'Acompanhamento',
      description: 'Acompanhamos todo o processo até a emissão do CNPJ',
      icon: Clock
    },
    {
      step: '05',
      title: 'Finalização',
      description: 'CNPJ emitido e orientações pós-abertura',
      icon: Shield
    }
  ];

  const types = [
    {
      title: 'MEI - Microempreendedor Individual',
      description: 'Ideal para faturamento até R$ 81.000/ano',
      features: ['Tributação simplificada', 'Poucas obrigações', 'Ideal para iniciantes']
    },
    {
      title: 'ME - Microempresa',
      description: 'Para faturamento até R$ 360.000/ano',
      features: ['Simples Nacional', 'Mais benefícios', 'Crescimento organizado']
    },
    {
      title: 'EPP - Empresa de Pequeno Porte',
      description: 'Para faturamento até R$ 4.800.000/ano',
      features: ['Simples Nacional', 'Estrutura completa', 'Escalabilidade']
    },
    {
      title: 'LTDA',
      description: 'Sociedade limitada tradicional',
      features: ['Estrutura societária', 'Flexibilidade', 'Profissionalização']
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Processo Rápido',
      description: 'Abertura em até 7 dias úteis'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Processo totalmente legal e transparente'
    },
    {
      icon: Users,
      title: 'Suporte Completo',
      description: 'Acompanhamento durante todo o processo'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Garantido',
      description: 'Base sólida para seu negócio crescer'
    }
  ];



  const faqItems = [
    {
      question: 'Quanto tempo demora para abrir uma empresa?',
      answer: 'O processo completo leva em média 7 dias úteis, desde a coleta da documentação até a emissão do CNPJ. Para MEI, pode ser ainda mais rápido.',
      icon: Calendar,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Qual a diferença entre MEI e ME?',
      answer: 'MEI é para faturamento até R$ 81.000/ano, com tributação simplificada e poucas obrigações. ME é para faturamento até R$ 360.000/ano, com mais benefícios mas também mais obrigações.',
      icon: HelpCircle,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Posso abrir empresa sendo menor de idade?',
      answer: 'Não, é necessário ter 18 anos ou mais para abrir uma empresa. Menores emancipados também podem abrir empresa.',
      icon: UserCheck,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'O que acontece se eu não tiver endereço comercial?',
      answer: 'Você pode usar seu endereço residencial como endereço comercial, desde que seja permitido pela atividade escolhida.',
      icon: MapPin,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Posso mudar o tipo de empresa depois?',
      answer: 'Sim, é possível fazer alterações no contrato social e tipo de empresa. Nós também oferecemos esse serviço.',
      icon: RefreshCw,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <ServiceHero
        breadcrumb="Abertura de Empresas"
        title="Abertura de"
        titleHighlight="Empresas"
        description="Processo completo de abertura de empresas com agilidade e segurança. Atendemos todos os tipos de CNPJ, desde MEI até EPP, com suporte especializado durante todo o processo."
        primaryButtonText="Solicitar Orçamento"
        features={[
          "Processo 100% online",
          "Suporte especializado",
          "Documentação completa",
          "Acompanhamento total"
        ]}
      />

      {/* Benefits Section */}
      <BenefitsSection
        title="Vantagens do Nosso Serviço"
        subtitle="Oferecemos um processo completo e transparente para abertura de empresas"
        benefits={benefits}
      />

      {/* Process Steps */}
      <ProcessSteps
        title="Como Funciona o Processo"
        subtitle="Processo simples e transparente em 5 etapas"
        steps={steps}
        columns={5}
      />

      {/* Types of Companies */}
      <ServicesSection
        title="Tipos de Empresa"
        subtitle="Escolha o tipo ideal para seu negócio"
        services={types}
        buttonText="Escolher Este Tipo"
        backgroundColor="background"
      />


      {/* FAQ Section */}
      <FAQ
        title="Perguntas Frequentes"
        subtitle="Tire suas dúvidas sobre abertura de empresas"
        items={faqItems}
      />

      {/* CTA Section */}
      <CTASection
        title="Pronto para abrir sua empresa?"
        description="Entre em contato conosco e descubra qual tipo de empresa é ideal para seu negócio. Oferecemos consulta gratuita para analisar sua necessidade."
        primaryButtonText="Solicitar Orçamento"
        secondaryButtonText="WhatsApp"
        secondaryButtonLink="https://wa.me/5531990726579"
        isExternalSecondary={true}
      />
    </div>
  );
};

export default ServiceOpening;
