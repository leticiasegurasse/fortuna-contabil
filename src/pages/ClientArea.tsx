import { useState } from 'react';
import { Eye, EyeOff, Lock, User, FileText, Download, Calendar, AlertCircle } from 'lucide-react';

const ClientArea = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login
    setIsLoggedIn(true);
  };

  const documents = [
    {
      id: '1',
      name: 'Guia DAS - Janeiro 2024',
      type: 'Guia',
      uploadedAt: '2024-01-15',
      url: '#'
    },
    {
      id: '2',
      name: 'Relatório Mensal - Dezembro 2023',
      type: 'Relatório',
      uploadedAt: '2024-01-10',
      url: '#'
    },
    {
      id: '3',
      name: 'Nota Fiscal - 001/2024',
      type: 'Nota Fiscal',
      uploadedAt: '2024-01-05',
      url: '#'
    }
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'DAS - Fevereiro 2024',
      date: '2024-02-20',
      type: 'Obrigação Mensal'
    },
    {
      id: '2',
      title: 'Declaração Anual MEI',
      date: '2024-05-31',
      type: 'Obrigação Anual'
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Área do Cliente
              </h1>
              <p className="text-gray-600">
                Acesse seus documentos e informações
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Entrar
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Esqueceu sua senha?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Clique aqui
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Ainda não é cliente?
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Entre em contato conosco e descubra como podemos ajudar seu negócio.
                    </p>
                    <a
                      href="/contato"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Solicitar orçamento →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Área do Cliente
              </h1>
              <p className="text-blue-100">
                Bem-vindo de volta! Acesse seus documentos e informações.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <User size={24} />
              </div>
              <div>
                <p className="font-semibold">Cliente Fortuna</p>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-sm text-blue-100 hover:text-white"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Documentos</p>
                      <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileText size={24} className="text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Próximos Vencimentos</p>
                      <p className="text-2xl font-bold text-gray-900">{upcomingDeadlines.length}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Calendar size={24} className="text-yellow-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-2xl font-bold text-green-600">Em Dia</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Seus Documentos
                </h2>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FileText size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-600">
                            {doc.type} • {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Download size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Próximos Vencimentos
                </h3>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-gray-900">{deadline.title}</h4>
                      <p className="text-sm text-gray-600">{deadline.type}</p>
                      <p className="text-sm text-yellow-600 font-medium">
                        {new Date(deadline.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Ações Rápidas
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Solicitar Documento
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Agendar Reunião
                  </button>
                  <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                    Tirar Dúvida
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Precisa de Ajuda?
                </h3>
                <p className="text-gray-600 mb-4">
                  Nossa equipe está disponível para ajudar você.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/5531999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-500 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:+5531999999999"
                    className="block bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Telefone
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientArea;
