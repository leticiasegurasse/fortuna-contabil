import { useState, useEffect } from 'react';
import { API_CONFIG } from '../config';

interface AdminUser {
  id: number;
  username: string;
  email?: string;
}

interface UseAdminAuthReturn {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAdminAuth = (): UseAdminAuthReturn => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem('adminToken');
      const storedUser = localStorage.getItem('adminUser');

      console.log('🔍 Verificando autenticação...');
      console.log('📝 Token armazenado:', storedToken ? 'Sim' : 'Não');
      console.log('👤 Usuário armazenado:', storedUser ? 'Sim' : 'Não');

      if (storedToken && storedUser) {
        // Verificar se o token ainda é válido
        console.log('🔐 Verificando validade do token...');
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/auth/verify-token`, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('📡 Resposta da verificação:', response.status, response.statusText);

        if (response.ok) {
          console.log('✅ Token válido, autenticação confirmada');
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          return true;
        } else {
          console.log('❌ Token inválido, limpando dados');
          // Token inválido, limpar dados
          logout();
          return false;
        }
      } else {
        console.log('⚠️ Nenhum token ou usuário encontrado');
      }
      return false;
    } catch (error) {
      console.error('❌ Erro ao verificar autenticação:', error);
      logout();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar dados no localStorage
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data.user));
        
        // Atualizar estado
        setToken(data.data.token);
        setUser(data.data.user);
        
        return { success: true, message: data.message || 'Login realizado com sucesso!' };
      } else {
        return { success: false, message: data.message || 'Erro ao fazer login' };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, message: 'Erro de conexão. Tente novamente.' };
    }
  };

  const logout = () => {
    // Limpar dados do localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Limpar estado
    setToken(null);
    setUser(null);
  };

  return {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    checkAuth,
  };
};
