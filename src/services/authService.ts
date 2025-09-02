// Serviço para gerenciar autenticação
import { apiService } from './api';
import { API_CONFIG } from '../config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

export interface ApiAuthResponse {
  success: boolean;
  message: string;
  data: AuthResponse;
}

export class AuthService {
  private readonly TOKEN_KEY = 'adminToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_KEY = 'user';

  // Fazer login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<ApiAuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      
      if (response.success && response.data) {
        // Salvar tokens no localStorage
        this.setToken(response.data.token);
        this.setRefreshToken(response.data.refreshToken);
        this.setUser(response.data.user);
        
        return response.data;
      }
      
      throw new Error(response.message || 'Erro no login');
    } catch (error) {
      console.error('Erro no AuthService.login:', error);
      throw error;
    }
  }

  // Fazer logout
  logout(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUser();
  }

  // Verificar se está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Obter token atual
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Obter refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Obter usuário atual
  getUser(): any | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Renovar token
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }

      const response = await apiService.post<ApiAuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );
      
      if (response.success && response.data) {
        this.setToken(response.data.token);
        this.setRefreshToken(response.data.refreshToken);
        return response.data.token;
      }
      
      throw new Error(response.message || 'Erro ao renovar token');
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      this.logout(); // Logout em caso de erro
      return null;
    }
  }

  // Verificar se token está expirado
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  // Obter token válido (renova se necessário)
  async getValidToken(): Promise<string | null> {
    const token = this.getToken();
    
    if (!token) {
      return null;
    }

    if (this.isTokenExpired(token)) {
      return await this.refreshToken();
    }

    return token;
  }

  // Métodos privados para gerenciar localStorage
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  private setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  private removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}

export const authService = new AuthService();
