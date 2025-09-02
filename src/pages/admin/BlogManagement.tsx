import { useState, useEffect } from 'react';
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
  FileText,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '../../config/routes';
import { postService } from '../../services/postService';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import type { Post, PaginatedResponse } from '../../types/blog';

const BlogManagement = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [deletingPosts, setDeletingPosts] = useState<number[]>([]);

  // Carregar posts do banco de dados
  const loadPosts = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response: PaginatedResponse<Post> = await postService.getPosts(
        currentPage,
        10, // 10 posts por página
        statusFilter === 'all' ? undefined : statusFilter,
        undefined, // categoryId
        searchTerm || undefined
      );
      
      setPosts(response.data);
      setTotalPages(response.pagination.pages);
      setTotalPosts(response.pagination.total);
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
      setError('Erro ao carregar posts. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar posts quando mudar filtros ou página
  useEffect(() => {
    if (isAuthenticated && token) {
      setCurrentPage(1); // Reset para primeira página ao mudar filtros
      loadPosts();
    }
  }, [searchTerm, statusFilter, isAuthenticated, token]);

  // Carregar posts quando mudar página
  useEffect(() => {
    if (isAuthenticated && token && currentPage > 1) {
      loadPosts();
    }
  }, [currentPage, isAuthenticated, token]);

  // Função de busca com debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        setCurrentPage(1);
        loadPosts();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Excluir post
  const handleDeletePost = async (postId: number) => {
    if (!token || !confirm('Tem certeza que deseja excluir este post?')) return;
    
    try {
      setDeletingPosts(prev => [...prev, postId]);
      await postService.deletePost(postId, token);
      
      // Recarregar posts
      await loadPosts();
      
      // Remover da seleção
      setSelectedPosts(prev => prev.filter(id => id !== postId));
    } catch (err) {
      console.error('Erro ao excluir post:', err);
      alert('Erro ao excluir post. Tente novamente.');
    } finally {
      setDeletingPosts(prev => prev.filter(id => id !== postId));
    }
  };

  // Excluir posts selecionados
  const handleDeleteSelected = async () => {
    if (!token || selectedPosts.length === 0) return;
    
    if (!confirm(`Tem certeza que deseja excluir ${selectedPosts.length} post(s)?`)) return;
    
    try {
      setDeletingPosts(prev => [...prev, ...selectedPosts]);
      
      // Excluir posts em paralelo
      await Promise.all(
        selectedPosts.map(postId => postService.deletePost(postId, token))
      );
      
      // Recarregar posts
      await loadPosts();
      setSelectedPosts([]);
    } catch (err) {
      console.error('Erro ao excluir posts selecionados:', err);
      alert('Erro ao excluir posts selecionados. Tente novamente.');
    } finally {
      setDeletingPosts([]);
    }
  };

  // Atualizar status do post
  const handleUpdateStatus = async (postId: number, newStatus: string) => {
    if (!token) return;
    
    try {
      await postService.updatePostStatus(postId, newStatus, token);
      await loadPosts(); // Recarregar para atualizar a lista
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Erro ao atualizar status. Tente novamente.');
    }
  };

  const handleSelectPost = (postId: number) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(post => post.id));
    }
  };

  const getStatusBadge = (status: string, postId: number) => {
    const statusConfig = {
      published: { label: 'Publicado', class: 'bg-green-100 text-green-800' },
      draft: { label: 'Rascunho', class: 'bg-yellow-100 text-yellow-800' },
      archived: { label: 'Arquivado', class: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <select
        value={status}
        onChange={(e) => handleUpdateStatus(postId, e.target.value)}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class} border-0 cursor-pointer`}
      >
        <option value="published" className="bg-green-100 text-green-800">Publicado</option>
        <option value="draft" className="bg-yellow-100 text-yellow-800">Rascunho</option>
        <option value="archived" className="bg-gray-100 text-gray-800">Arquivado</option>
      </select>
    );
  };

  // Componente de paginação
  const Pagination = () => (
    <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200">
      <div className="text-sm text-neutral-500">
        Mostrando {((currentPage - 1) * 10) + 1} a {Math.min(currentPage * 10, totalPosts)} de {totalPosts} posts
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-2 text-neutral-400 hover:text-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <span className="text-sm text-neutral-500">
          Página {currentPage} de {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="p-2 text-neutral-400 hover:text-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-sm font-medium text-neutral-900">Acesso negado</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Você precisa estar logado para acessar esta página.
        </p>
      </div>
    );
  }

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
              Posts ({totalPosts})
            </h3>
            
            {selectedPosts.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-500">
                  {selectedPosts.length} selecionado(s)
                </span>
                <button 
                  onClick={handleDeleteSelected}
                  disabled={deletingPosts.length > 0}
                  className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                >
                  {deletingPosts.length > 0 ? 'Excluindo...' : 'Excluir selecionados'}
                </button>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="mx-auto h-8 w-8 text-primary-500 animate-spin" />
            <p className="mt-2 text-sm text-neutral-500">Carregando posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-2 text-sm font-medium text-neutral-900">Erro ao carregar posts</h3>
            <p className="mt-1 text-sm text-neutral-500">{error}</p>
            <button
              onClick={loadPosts}
              className="mt-4 inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedPosts.length === posts.length && posts.length > 0}
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
                  {posts.map((post) => (
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
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-neutral-400 mr-2" />
                          <span className="text-sm text-neutral-900">
                            {post.author?.username || 'Usuário'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 text-neutral-400 mr-2" />
                          <span className="text-sm text-neutral-900">
                            {post.category?.name || 'Sem categoria'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(post.status, post.id)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {post.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-neutral-400 mr-2" />
                          <span className="text-sm text-neutral-900">
                            {post.publishedAt 
                              ? new Date(post.publishedAt).toLocaleDateString('pt-BR')
                              : new Date(post.createdAt).toLocaleDateString('pt-BR')
                            }
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-neutral-400 hover:text-neutral-600"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            to={ROUTES.ADMIN_BLOG_EDIT.replace(':id', post.id.toString())}
                            className="text-neutral-400 hover:text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            disabled={deletingPosts.includes(post.id)}
                            className="text-neutral-400 hover:text-red-600 disabled:opacity-50"
                          >
                            {deletingPosts.includes(post.id) ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            {totalPages > 1 && <Pagination />}

            {posts.length === 0 && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
