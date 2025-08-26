import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag,
  MoreVertical,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '../../config/routes';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  publishedAt: string;
  views: number;
  featured: boolean;
}

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);



  // Dados mockados para demonstração
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Como abrir uma empresa MEI em 2024',
      excerpt: 'Guia completo com todas as etapas necessárias para abrir sua empresa como Microempreendedor Individual...',
      author: 'João Silva',
      category: 'Abertura de Empresas',
      status: 'published',
      publishedAt: '2024-01-15',
      views: 1247,
      featured: true
    },
    {
      id: 2,
      title: 'Declaração de IR: Dúvidas frequentes',
      excerpt: 'Respostas para as principais dúvidas sobre declaração do Imposto de Renda Pessoa Física...',
      author: 'Maria Santos',
      category: 'Imposto de Renda',
      status: 'published',
      publishedAt: '2024-01-10',
      views: 892,
      featured: false
    },
    {
      id: 3,
      title: 'Benefícios da contabilidade para pequenas empresas',
      excerpt: 'Descubra como uma boa contabilidade pode ajudar sua empresa a crescer e se manter organizada...',
      author: 'Carlos Oliveira',
      category: 'Consultoria',
      status: 'draft',
      publishedAt: '2024-01-08',
      views: 0,
      featured: false
    },
    {
      id: 4,
      title: 'Mudanças na legislação trabalhista 2024',
      excerpt: 'Principais alterações na legislação trabalhista que entram em vigor este ano...',
      author: 'Ana Costa',
      category: 'Legislação',
      status: 'published',
      publishedAt: '2024-01-05',
      views: 1567,
      featured: true
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectPost = (postId: number) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: 'Publicado', class: 'bg-green-100 text-green-800' },
      draft: { label: 'Rascunho', class: 'bg-yellow-100 text-yellow-800' },
      archived: { label: 'Arquivado', class: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-secondary-500">
              Gerenciamento do Blog
            </h1>
            <p className="text-neutral-500">
              Gerencie os posts do blog, crie novos conteúdos e acompanhe o desempenho.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link
              to={ROUTES.ADMIN_BLOG_CATEGORIES}
              className="inline-flex items-center space-x-2 border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Tag className="h-4 w-4" />
              <span>Categorias</span>
            </Link>
            
            <Link
              to={ROUTES.ADMIN_BLOG_NEW}
              className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Post</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Todos os status</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
              <option value="archived">Arquivados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-secondary-500">
              Posts ({filteredPosts.length})
            </h3>
            
            {selectedPosts.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-500">
                  {selectedPosts.length} selecionado(s)
                </span>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Excluir selecionados
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Visualizações
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredPosts.map((post) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => handleSelectPost(post.id)}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-secondary-500 truncate">
                            {post.title}
                          </h4>
                          {post.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                              Destaque
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-neutral-400 mr-2" />
                      <span className="text-sm text-neutral-900">{post.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-neutral-400 mr-2" />
                      <span className="text-sm text-neutral-900">{post.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-neutral-400 mr-2" />
                      <span className="text-sm text-neutral-900">
                        {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-neutral-400 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-neutral-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-neutral-400" />
            <h3 className="mt-2 text-sm font-medium text-neutral-900">Nenhum post encontrado</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece criando seu primeiro post do blog.'
              }
            </p>
                         {!searchTerm && statusFilter === 'all' && (
               <div className="mt-6">
                 <Link
                   to={ROUTES.ADMIN_BLOG_NEW}
                   className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                 >
                  <Plus className="h-4 w-4" />
                  <span>Criar primeiro post</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
