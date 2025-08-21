import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';

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
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Mensagem Enviada!
          </h1>
          <p className="text-gray-600 mb-8">
            Obrigado pelo contato! Retornaremos em breve com as informações solicitadas.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Enviar Nova Mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Entre em Contato
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Estamos aqui para ajudar seu negócio a crescer. Entre em contato conosco 
            e descubra como podemos descomplicar sua contabilidade.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envie sua Mensagem
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(31) 99072-6579"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Serviço de Interesse
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Conte-nos sobre sua necessidade..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send size={20} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informações de Contato
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <info.icon size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 whitespace-pre-line">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-green-500 p-3 rounded-lg">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Atendimento Rápido
                    </h3>
                    <p className="text-gray-600">
                      Prefere WhatsApp? Clique aqui!
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/5531990726579"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center justify-center"
                >
                  Abrir WhatsApp
                  <MessageCircle size={20} className="ml-2" />
                </a>
              </div>

              {/* Why Choose Us */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Por que escolher a Fortuna?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    Atendimento humanizado
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    100% online
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    Transparência total
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    Especialistas em MEI
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Localização
            </h2>
            <p className="text-xl text-gray-600">
              Atendemos em todo o Brasil, mas nossa base está em Belo Horizonte
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Mapa interativo será implementado aqui
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Belo Horizonte - MG, Brasil
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
