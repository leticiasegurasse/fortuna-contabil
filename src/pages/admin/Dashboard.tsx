import { useState, useEffect } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { 
  Users, 
  FileText, 
  BarChart3, 
  DollarSign, 
  Edit3, 
  Tag, 
  FolderOpen, 
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { apiService } from '../../services/api';

interface DashboardStats {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
  totalNewsletterSubscribers: number;
  recentPosts: Array<{
    id: number;
    title: string;
    status: string;
    views: number;
    createdAt: string;
  }>;
  pendingDocuments: number;
  activeClients: number;
  monthlyRevenue: number;
  conversionRate: number;
}

const AdminDashboard = () => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      // Buscar estatísticas do blog
      const [postsRes, categoriesRes, tagsRes, newsletterRes] = await Promise.all([
        apiService.get<any>('/api/posts'),
        apiService.get<any>('/api/categories'),
        apiService.get<any>('/api/tags'),
        apiService.get<any>('/api/newsletter/stats')
      ]);

      // Simular dados de contabilidade (em produção, viriam de endpoints específicos)
      const mockAccountingData = {
        pendingDocuments: Math.floor(Math.random() * 50) + 10,
        activeClients: Math.floor(Math.random() * 200) + 100,
        monthlyRevenue: Math.floor(Math.random() * 100000) + 50000,
        conversionRate: Math.floor(Math.random() * 30) + 60
      };

      setStats({
        totalPosts: postsRes.data?.length || 0,
        totalCategories: categoriesRes.data?.length || 0,
        totalTags: tagsRes.data?.length || 0,
        totalNewsletterSubscribers: newsletterRes.data?.totalSubscribers || 0,
        recentPosts: postsRes.data?.slice(0, 5) || [],
        ...mockAccountingData
      });
    } catch (err) {
      setError('Erro ao carregar estatísticas do dashboard');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <Clock className="h-4 w-4" />;
      case 'archived': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">{error}</span>
        </div>
        <button 
          onClick={fetchDashboardStats}
          className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-500">
          Dashboard Administrativo
        </h1>
        <p className="text-neutral-600 mt-2">
          Bem-vindo de volta, {user?.username}! Aqui está um resumo completo das atividades da Fortuna Contábil.
        </p>
      </div>

      {/* Stats Grid - Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">
                Clientes Ativos
              </p>
              <p className="text-3xl font-bold">
                {stats?.activeClients || 0}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-blue-200 mr-1" />
                <span className="text-xs text-blue-200">+12% vs mês anterior</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-400/20">
              <Users className="h-8 w-8" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium mb-1">
                Documentos Pendentes
              </p>
              <p className="text-3xl font-bold">
                {stats?.pendingDocuments || 0}
              </p>
              <div className="flex items-center mt-2">
                <AlertTriangle className="h-4 w-4 text-yellow-200 mr-1" />
                <span className="text-xs text-yellow-200">Requer atenção</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-yellow-400/20">
              <FileText className="h-8 w-8" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">
                Faturamento Mensal
              </p>
              <p className="text-3xl font-bold">
                {formatCurrency(stats?.monthlyRevenue || 0)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-200 mr-1" />
                <span className="text-xs text-green-200">+8% vs mês anterior</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-400/20">
              <DollarSign className="h-8 w-8" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">
                Taxa de Conversão
              </p>
              <p className="text-3xl font-bold">
                {stats?.conversionRate || 0}%
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-purple-200 mr-1" />
                <span className="text-xs text-purple-200">+2% vs mês anterior</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-400/20">
              <BarChart3 className="h-8 w-8" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blog Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
      >
        <h3 className="text-lg font-semibold text-secondary-500 mb-4">
          Estatísticas do Blog
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats?.totalPosts || 0}</div>
            <div className="text-sm text-blue-600">Posts</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats?.totalCategories || 0}</div>
            <div className="text-sm text-green-600">Categorias</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats?.totalTags || 0}</div>
            <div className="text-sm text-purple-600">Tags</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats?.totalNewsletterSubscribers || 0}</div>
            <div className="text-sm text-orange-600">Newsletter</div>
          </div>
        </div>
      </motion.div>

      {/* Blog Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
      >
        <h3 className="text-lg font-semibold text-secondary-500 mb-4">
          Gerenciamento do Blog
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to={ROUTES.ADMIN_BLOG}
            className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
          >
            <Edit3 className="h-5 w-5 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-secondary-500">
              Posts do Blog
            </span>
          </Link>
          
          <Link 
            to={ROUTES.ADMIN_BLOG_NEW}
            className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
          >
            <FileText className="h-5 w-5 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-secondary-500">
              Novo Post
            </span>
          </Link>
          
          <Link 
            to={ROUTES.ADMIN_BLOG_CATEGORIES}
            className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
          >
            <FolderOpen className="h-5 w-5 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-secondary-500">
              Categorias
            </span>
          </Link>
          
          <Link 
            to={ROUTES.ADMIN_BLOG_TAGS}
            className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
          >
            <Tag className="h-5 w-5 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-secondary-500">
              Tags
            </span>
          </Link>
        </div>
      </motion.div>

      {/* Recent Posts */}
      {stats?.recentPosts && stats.recentPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
        >
          <h3 className="text-lg font-semibold text-secondary-500 mb-4">
            Posts Recentes
          </h3>
          <div className="space-y-3">
            {stats.recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-secondary-500 truncate">{post.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 mt-1">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views}</span>
                    </span>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                  {getStatusIcon(post.status)}
                  <span className="capitalize">{post.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
      >
        <h3 className="text-lg font-semibold text-secondary-500 mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <Users className="h-5 w-5 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-secondary-500">
              Gerenciar Clientes
            </span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <FileText className="h-5 w-5 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-secondary-500">
              Documentos
            </span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <Calendar className="h-5 w-5 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-secondary-500">
              Prazos Fiscais
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
