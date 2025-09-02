import { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Tag,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '../../config/routes';
import { categoryService } from '../../services/categoryService';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import type { Category } from '../../types/blog';
import Pagination from '../../components/Pagination';
import CategoryCard from '../../components/CategoryCard';
import CategoryModal from '../../components/CategoryModal';
import CategoryDeleteModal from '../../components/CategoryDeleteModal';

const BlogCategories = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const [deletingCategories, setDeletingCategories] = useState<number[]>([]);
  
  // Estados para modais
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });
  const [submitting, setSubmitting] = useState(false);

  // Carregar categorias do banco de dados
  const loadCategories = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fazendo requisição para página:', currentPage);
      
      const response = await categoryService.getCategories(
        currentPage,
        9, // 9 categorias por página
        searchTerm || undefined
      );
      
      console.log('Resposta recebida:', response);
      
      setCategories(response.data);
      setTotalCategories(response.pagination.total);
      setTotalPages(response.pagination.pages);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      setError('Erro ao carregar categorias. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar categorias quando autenticado
  useEffect(() => {
    if (isAuthenticated && token) {
      loadCategories();
    }
  }, [isAuthenticated, token]);

  // Função de busca com debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset para primeira página ao mudar busca
      loadCategories();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset para primeira página quando necessário
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Carregar categorias quando mudar página
  useEffect(() => {
    if (isAuthenticated && token) {
      console.log('Carregando categorias para página:', currentPage);
      loadCategories();
    }
  }, [currentPage, isAuthenticated, token]);

  // Função para recarregar categorias (usada em callbacks)
  const reloadCategories = useCallback(() => {
    if (isAuthenticated && token) {
      loadCategories();
    }
  }, [isAuthenticated, token]);

  // Selecionar/deselecionar categoria individual
  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Abrir modal para criar nova categoria
  const handleCreateCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6'
    });
    setShowCreateModal(true);
  };

  // Abrir modal para editar categoria
  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      color: category.color || '#3B82F6'
    });
  };

  // Fechar modais
  const closeModals = () => {
    setShowCreateModal(false);
    setEditingCategory(null);
    setShowDeleteModal(null);
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6'
    });
    setSubmitting(false);
  };

  // Gerenciar mudanças no formulário
  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Salvar categoria (criar ou atualizar)
  const handleSaveCategory = async () => {
    if (!token || !formData.name.trim()) return;
    
    try {
      setSubmitting(true);
      
      if (editingCategory) {
        // Atualizar categoria existente
        await categoryService.updateCategory(editingCategory.id, formData, token);
      } else {
        // Criar nova categoria
        await categoryService.createCategory(formData, token);
      }
      
      // Recarregar categorias e fechar modal
      await reloadCategories();
      closeModals();
    } catch (err: any) {
      console.error('Erro ao salvar categoria:', err);
      setError(err.message || 'Erro ao salvar categoria');
    } finally {
      setSubmitting(false);
    }
  };

  // Excluir categoria
  const handleDeleteCategory = async (category: Category) => {
    if (!token) return;
    
    // Validação adicional: não permitir exclusão se houver posts associados
    if (category.postsCount > 0) {
      setError(`Não é possível excluir a categoria "${category.name}" pois ela possui ${category.postsCount} post(s) associado(s).`);
      return;
    }
    
    try {
      setDeletingCategories(prev => [...prev, category.id]);
      await categoryService.deleteCategory(category.id, token);
      
      // Recarregar categorias e fechar modal
      await reloadCategories();
      setShowDeleteModal(null);
      setSelectedCategories(prev => prev.filter(id => id !== category.id));
    } catch (err: any) {
      console.error('Erro ao excluir categoria:', err);
      setError(err.message || 'Erro ao excluir categoria');
    } finally {
      setDeletingCategories(prev => prev.filter(id => id !== category.id));
    }
  };

  // Filtrar categorias baseado na busca (fallback local)
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background-500 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-500" />
          <p className="text-neutral-600">Carregando...</p>
        </div>
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
              Categorias do Blog
            </h1>
            <p className="text-neutral-500">
              Gerencie as categorias para organizar os posts do blog.
            </p>
          </div>
          
          <button
            onClick={handleCreateCategory}
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Categoria</span>
          </button>
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-500" />
          <p className="text-neutral-600">Carregando categorias...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.id)}
              onSelect={handleSelectCategory}
              onEdit={openEditModal}
              onDelete={setShowDeleteModal}
              isDeleting={deletingCategories.includes(category.id)}
            />
          ))}
        </div>
      )}

      {!loading && filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Tag className="mx-auto h-12 w-12 text-neutral-400" />
          <h3 className="mt-2 text-sm font-medium text-neutral-900">
            Nenhuma categoria encontrada
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            {searchTerm 
              ? 'Tente ajustar os termos de busca.' 
              : 'Comece criando sua primeira categoria.'
            }
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={handleCreateCategory}
                className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Criar primeira categoria</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Create/Edit Modal */}
      <CategoryModal
        isOpen={showCreateModal || !!editingCategory}
        editingCategory={editingCategory}
        formData={formData}
        submitting={submitting}
        onClose={closeModals}
        onSave={handleSaveCategory}
        onFormDataChange={handleFormDataChange}
      />

             {/* Delete Confirmation Modal */}
       <CategoryDeleteModal
         category={showDeleteModal}
         isDeleting={deletingCategories.includes(showDeleteModal?.id || 0)}
         onClose={() => setShowDeleteModal(null)}
         onConfirm={() => showDeleteModal && handleDeleteCategory(showDeleteModal)}
       />

      {/* Paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCategories}
        onPageChange={setCurrentPage}
        itemName="categorias"
      />
    </div>
  );
};

export default BlogCategories;
