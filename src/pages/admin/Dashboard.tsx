import { useAdminAuth } from '../../hooks/useAdminAuth';
import { Settings, Users, FileText, BarChart3, DollarSign, Edit3, Tag, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

const AdminDashboard = () => {
  const { user } = useAdminAuth();

  const stats = [
    {
      title: 'Total de Clientes',
      value: '156',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Documentos Pendentes',
      value: '23',
      icon: FileText,
      color: 'bg-yellow-500',
      change: '+5%',
      changeType: 'negative'
    },
    {
      title: 'Faturamento Mensal',
      value: 'R$ 45.230',
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Taxa de Conversão',
      value: '68%',
      icon: BarChart3,
      color: 'bg-purple-500',
      change: '+2%',
      changeType: 'positive'
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-500">
          Dashboard
        </h1>
        <p className="text-neutral-500">
          Bem-vindo de volta, {user?.username}! Aqui está um resumo das atividades da Fortuna Contábil.
        </p>
      </div>
        

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-secondary-500">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-neutral-500 ml-1">vs mês anterior</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-secondary-500 mb-4">
            Gerenciamento do Blog
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to={ROUTES.ADMIN_BLOG}
              className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <Edit3 className="h-5 w-5 text-primary-500" />
              <span className="text-sm font-medium text-secondary-500">
                Posts do Blog
              </span>
            </Link>
            
            <Link 
              to={ROUTES.ADMIN_BLOG_NEW}
              className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-primary-500" />
              <span className="text-sm font-medium text-secondary-500">
                Novo Post
              </span>
            </Link>
            
            <Link 
              to={ROUTES.ADMIN_BLOG_CATEGORIES}
              className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <FolderOpen className="h-5 w-5 text-primary-500" />
              <span className="text-sm font-medium text-secondary-500">
                Categorias
              </span>
            </Link>
            
            <Link 
              to={ROUTES.ADMIN_BLOG_TAGS}
              className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <Tag className="h-5 w-5 text-primary-500" />
              <span className="text-sm font-medium text-secondary-500">
                Tags
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
        >
          <h3 className="text-lg font-semibold text-secondary-500 mb-4">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
              <Users className="h-5 w-5 text-primary-500" />
              <span className="text-sm font-medium text-secondary-500">
                Gerenciar Clientes
              </span>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
              <FileText className="h-5 w-5 text-primary-500" />
              <span className="text-sm font-medium text-secondary-500">
                Documentos
              </span>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
              <Settings className="h-5 w-5 text-primary-500" />
              <span className="text-sm font-medium text-secondary-500">
                Configurações
              </span>
            </button>
          </div>
        </motion.div>
     </div>
   );
 };

export default AdminDashboard;
