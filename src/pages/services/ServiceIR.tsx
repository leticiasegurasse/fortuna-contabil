import { 
  Clock, 
  Shield, 
  Calculator, 
  Users, 
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
import DocumentsRequired from '../../components/DocumentsRequired';

const ServiceIR = () => {
  const services = [
    {
      title: 'Declaração PF',
      description: 'Declaração completa para Pessoa Física',
      features: ['Rendimentos do trabalho', 'Rendimentos de aplicações', 'Deduções permitidas']
    },
    {
      title: 'Declaração PJ',
      description: 'Declaração para Pessoa Jurídica',
      features: ['Lucro Real', 'Lucro Presumido', 'Simples Nacional']
    },
    {
      title: 'Otimização Fiscal',
      description: 'Estratégias para redução de impostos',
      features: ['Planejamento tributário', 'Deduções legais', 'Economia comprovada']
    },
    {
      title: 'Suporte Especializado',
      description: 'Acompanhamento durante todo o processo',
      features: ['Análise prévia', 'Declaração completa', 'Acompanhamento pós-entrega']
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Declaração dentro da legislação'
    },
    {
      icon: Calculator,
      title: 'Otimização Fiscal',
      description: 'Máxima economia permitida por lei'
    },
    {
      icon: Users,
      title: 'Suporte Completo',
      description: 'Acompanhamento especializado'
    },
    {
      icon: Clock,
      title: 'Agilidade',
      description: 'Processo rápido e eficiente'
    }
  ];

  const documents = [
    'Documentos pessoais (RG, CPF)',
    'Comprovantes de rendimentos',
    'Extratos bancários',
    'Informes de rendimentos',
    'Comprovantes de despesas',
    'Documentos de bens e direitos'
  ];

  const faqItems = [
    {
      question: 'Quem precisa declarar Imposto de Renda?',
      answer: 'Pessoas que receberam rendimentos tributáveis acima de R$ 28.559,70 em 2024, ou que tiveram rendimentos isentos acima de R$ 40.000,00, ou que realizaram operações na bolsa de valores, entre outros casos.',
      icon: UserCheck,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Quando é o prazo para declarar?',
      answer: 'O prazo para entrega da declaração de IR 2024 (ano-base 2023) vai de 15 de março a 31 de maio de 2024. Após esse prazo, há multa de 20% sobre o imposto devido.',
      icon: Calendar,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'Quais documentos preciso fornecer?',
      answer: 'RG, CPF, comprovantes de rendimentos, extratos bancários, informes de rendimentos, comprovantes de despesas dedutíveis e documentos de bens e direitos.',
      icon: FileCheck,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      question: 'Posso deduzir despesas médicas?',
      answer: 'Sim, despesas médicas são dedutíveis do IR, incluindo consultas, exames, medicamentos, planos de saúde e tratamentos. O limite é de 100% dos gastos.',
      icon: DollarSign,
      iconColor: 'text-accent-500',
      gradientColors: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      question: 'O que acontece se eu não declarar?',
      answer: 'Quem é obrigado a declarar e não faz pode receber multa de 20% sobre o imposto devido, mais juros e correção monetária. Em casos extremos, pode haver processo criminal.',
      icon: HelpCircle,
      iconColor: 'text-primary-500',
      gradientColors: 'bg-gradient-to-r from-primary-500 to-primary-600'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <ServiceHero
        breadcrumb="Declaração de IR"
        title="Declaração de"
        titleHighlight="IR"
        description="Declaração completa do Imposto de Renda com otimização fiscal e suporte especializado. Atendemos Pessoa Física e Jurídica com máxima segurança e economia."
        primaryButtonText="Solicitar Declaração"
        features={[
          "Declaração segura",
          "Otimização fiscal",
          "Suporte especializado",
          "Processo rápido"
        ]}
      />

      {/* Benefits Section */}
      <BenefitsSection
        title="Vantagens do Nosso Serviço"
        subtitle="Oferecemos um serviço completo e transparente para declaração de IR"
        benefits={benefits}
      />

      {/* Services Section */}
      <ServicesSection
        title="Nossos Serviços de IR"
        subtitle="Soluções especializadas para diferentes tipos de declaração"
        services={services}
        buttonText="Solicitar Declaração"
      />

      {/* Documents Required */}
      <DocumentsRequired
        subtitle="Documentação necessária para a declaração"
        documents={documents}
        importantNote="Todos os documentos podem ser enviados digitalmente. O processo é 100% online para sua comodidade."
        backgroundColor="background"
      />

      {/* FAQ Section */}
      <FAQ
        title="Perguntas Frequentes"
        subtitle="Tire suas dúvidas sobre declaração de IR"
        items={faqItems}
      />

      {/* CTA Section */}
      <CTASection
        title="Pronto para fazer sua declaração?"
        description="Entre em contato conosco e descubra como podemos ajudar você a fazer sua declaração de IR com segurança e otimização fiscal."
        primaryButtonText="Solicitar Declaração"
        secondaryButtonText="WhatsApp"
        secondaryButtonLink="https://wa.me/5531990726579"
        isExternalSecondary={true}
      />
    </div>
  );
};

export default ServiceIR;
