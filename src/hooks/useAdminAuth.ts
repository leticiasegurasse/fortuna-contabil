import { useState, useEffect } from 'react';
import { API_URL, API_ENDPOINTS } from '../config/api';

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

      if (storedToken && storedUser) {
        // Verificar se o token ainda é válido
        const response = await fetch(`${API_URL}${API_ENDPOINTS.AUTH.VERIFY_TOKEN}`, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          return true;
        } else {
          // Token inválido, limpar dados
          logout();
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      logout();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
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
