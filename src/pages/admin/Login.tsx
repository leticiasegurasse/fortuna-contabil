import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdminAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar mensagens de erro quando o usuário começa a digitar
    if (error) setError('');
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        setSuccess('Login realizado com sucesso! Redirecionando...');
        
        // Redirecionar para o dashboard após 1 segundo
        setTimeout(() => {
          navigate(ROUTES.ADMIN_DASHBOARD);
        }, 1000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-500 via-background-400 to-background-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/logo-preta.png" 
                alt="Fortuna Contábil" 
                className="h-12"
              />
            </div>
            <h1 className="text-2xl font-bold text-secondary-500 mb-2">
              Painel Administrativo
            </h1>
            <p className="text-neutral-500 text-sm">
              Faça login para acessar o painel de controle
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Usuário */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-secondary-500 mb-2">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-xl text-secondary-500 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-500 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-xl text-secondary-500 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mensagens de Erro/Sucesso */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm"
              >
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                'Entrar no Painel'
              )}
            </button>
          </form>

          {/* Links Adicionais */}
          <div className="mt-6 text-center">
            <Link
              to={ROUTES.HOME}
              className="text-sm text-neutral-500 hover:text-primary-500 transition-colors"
            >
              ← Voltar para o site
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-neutral-400">
            © 2024 Fortuna Contábil. Todos os direitos reservados.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
