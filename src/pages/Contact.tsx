import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import SectionDivider from '../components/SectionDivider';
import CTASection from '../components/CTASection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Formatar mensagem para WhatsApp
    const whatsappMessage = `*Nova mensagem do site Fortuna Contábil*

*Nome:* ${formData.name}
*E-mail:* ${formData.email}
*Telefone:* ${formData.phone}
${formData.company ? `*Empresa:* ${formData.company}\n` : ''}
${formData.service ? `*Serviço de Interesse:* ${formData.service}\n` : ''}
*Mensagem:* ${formData.message}

_Enviado através do formulário de contato do site_`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/5531990726579?text=${encodedMessage}`;
    
    // Simular um pequeno delay para mostrar o loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    
    // Redirecionar para o WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      content: '(31) 99072-6579',
              link: 'tel:+5531990726579'
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'fortunacontabill@gmail.com',
      link: 'mailto:fortunacontabill@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Localização',
      content: 'Belo Horizonte - MG\nAtendimento em todo o Brasil',
      link: null
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      content: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h',
      link: null
    }
  ];

  const services = [
    'Abertura de Empresas',
    'Contabilidade MEI',
    'Consultoria Contábil',
    'Declaração de IR',
    'Regularização de Empresas',
    'Contabilidade para Pequenas Empresas',
    'Outro'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-50">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-accent-600" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-500 mb-4">
            Mensagem Enviada!
          </h1>
          <p className="text-neutral-500 mb-8">
            Obrigado pelo contato! Retornaremos em breve com as informações solicitadas.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Enviar Nova Mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Contact Section */}
      <section className="py-20 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
              Fale Conosco
            </h2>
            <SectionDivider />
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-secondary-500 mb-6">
                Envie sua Mensagem
              </h3>
              
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-accent-700">
                  <MessageCircle size={20} />
                  <p className="text-sm font-medium">
                    Sua mensagem será enviada diretamente para nosso WhatsApp para um atendimento mais rápido!
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-500 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-500 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-500 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                      placeholder="(31) 99072-6579"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-secondary-500 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-secondary-500 mb-2">
                    Serviço de Interesse
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-500 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    placeholder="Conte-nos sobre sua necessidade..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-accent-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Preparando WhatsApp...
                    </>
                  ) : (
                    <>
                      Enviar via WhatsApp
                      <MessageCircle size={20} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="rounded-2xl p-8 border border-gray-200 h-full flex flex-col justify-between space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-secondary-500 mb-6">
                  Informações de Contato
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-3 rounded-xl">
                        <info.icon size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-500 mb-1">
                          {info.title}
                        </h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-neutral-500 hover:text-accent-600 transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-neutral-500 whitespace-pre-line">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-accent-50 border border-accent-200 rounded-2xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-accent-500 p-3 rounded-xl">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-500">
                      Atendimento Rápido
                    </h4>
                    <p className="text-neutral-500">
                      Prefere WhatsApp? Clique aqui!
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/5531990726579"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-accent-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg"
                >
                  Abrir WhatsApp
                  <MessageCircle size={20} className="ml-2" />
                </a>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <CTASection
        title="Pronto para começar?"
        description="Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer de forma organizada e sem complicações."
        primaryButtonText="Solicitar Orçamento"
        secondaryButtonText="WhatsApp"
        secondaryButtonLink="https://wa.me/5531990726579"
        isExternalSecondary={true}
      />
    </div>
  );
};

export default Contact;
