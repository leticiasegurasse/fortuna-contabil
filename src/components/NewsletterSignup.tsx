import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { newsletterService } from '../services/newsletterService';

interface NewsletterSignupProps {
  variant?: 'default' | 'accent' | 'primary';
  className?: string;
}

const NewsletterSignup = ({ variant = 'default', className = '' }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Por favor, insira um e-mail válido.' });
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Por favor, insira um e-mail válido.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);

      const response = await newsletterService.subscribe(email);
      
      if (response.success) {
        setMessage({ type: 'success', text: response.message || 'Inscrição realizada com sucesso!' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: response.message || 'Erro ao realizar inscrição.' });
      }
    } catch (error: any) {
      console.error('Erro ao inscrever na newsletter:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao realizar inscrição. Tente novamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Configurações de estilo baseadas na variante
  const getStyles = () => {
    switch (variant) {
      case 'accent':
        return {
          container: 'bg-gradient-to-br from-accent-500 to-accent-600 text-white',
          button: 'bg-primary-500 text-secondary-500 hover:bg-primary-600',
          input: 'text-secondary-500 focus:ring-primary-500',
          message: 'text-accent-100'
        };
      case 'primary':
        return {
          container: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white',
          button: 'bg-accent-500 text-white hover:bg-accent-600',
          input: 'text-secondary-500 focus:ring-accent-500',
          message: 'text-primary-100'
        };
      default:
        return {
          container: 'bg-gradient-to-br from-accent-500 to-accent-600 text-white',
          button: 'bg-primary-500 text-secondary-500 hover:bg-primary-600',
          input: 'text-secondary-500 focus:ring-primary-500',
          message: 'text-accent-100'
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 relative overflow-hidden ${styles.container} ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-20 h-20 bg-primary-400 rounded-full -translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary-300 rounded-full translate-x-8 translate-y-8"></div>
      </div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-6 w-6 text-white" />
          <h3 className="text-lg font-bold">
            Fique por dentro!
          </h3>
        </div>
        
        {/* Description */}
        <p className={`mb-4 ${styles.message}`}>
          Receba nossas novidades e dicas exclusivas no seu e-mail.
        </p>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${styles.input} disabled:opacity-50`}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Processando...
              </div>
            ) : (
              'Inscrever-se'
            )}
          </button>
        </form>
        
        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                : 'bg-red-500/20 text-red-100 border border-red-400/30'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{message.text}</span>
          </motion.div>
        )}
        
        {/* Privacy Note */}
        <p className="text-xs opacity-70 mt-3">
          Ao se inscrever, você concorda em receber e-mails da Fortuna Contábil. 
          Você pode cancelar a inscrição a qualquer momento.
        </p>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;
