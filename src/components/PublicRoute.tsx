import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { useAdminAuth } from '../hooks/useAdminAuth';

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const PublicRoute = ({ children, redirectTo = ROUTES.ADMIN_BLOG }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Se já estiver logado, redirecionar para o painel admin
      console.log('Usuário já autenticado, redirecionando para:', redirectTo);
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background-500 via-background-400 to-background-300 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Verificando autenticação...</p>
          <p className="text-white/70 text-sm mt-2">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  // Se estiver autenticado, não renderiza nada (será redirecionado)
  if (isAuthenticated) {
    return null;
  }

  // Se não estiver autenticado, renderiza o conteúdo público
  return <>{children}</>;
};

export default PublicRoute;
