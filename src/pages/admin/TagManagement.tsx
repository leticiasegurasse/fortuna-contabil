import { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Tag,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { tagService } from '../../services/tagService';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import type { Tag as TagType } from '../../types/blog';
import Pagination from '../../components/Pagination';
import TagCard from '../../components/TagCard';
import TagModal from '../../components/TagModal';
import TagDeleteModal from '../../components/TagDeleteModal';

const TagManagement = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTags, setTotalTags] = useState(0);
  const [deletingTags, setDeletingTags] = useState<number[]>([]);
  
  // Estados para modal de criação/edição
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTag, setEditingTag] = useState<TagType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<TagType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });
  const [submitting, setSubmitting] = useState(false);

    // Carregar tags do banco de dados
  const loadTags = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fazendo requisição para página:', currentPage);
      
      const response = await tagService.getTags(
        currentPage,
        9, // 9 tags por página
        searchTerm || undefined,
        'postsCount' // Ordenar por número de posts
      );
      
      console.log('Resposta recebida:', response);
      
      setTags(response.data);
      setTotalTags(response.pagination.total);
      setTotalPages(response.pagination.pages);
    } catch (err) {
      console.error('Erro ao carregar tags:', err);
      setError('Erro ao carregar tags. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar tags quando autenticado
  useEffect(() => {
    if (isAuthenticated && token) {
      loadTags();
    }
  }, [isAuthenticated, token]);

  // Função de busca com debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset para primeira página ao mudar busca
      loadTags();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset para primeira página quando necessário
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Carregar tags quando mudar página
  useEffect(() => {
    if (isAuthenticated && token) {
      console.log('Carregando tags para página:', currentPage);
      loadTags();
    }
  }, [currentPage, isAuthenticated, token]);

  // Função para recarregar tags (usada em callbacks)
  const reloadTags = useCallback(() => {
    if (isAuthenticated && token) {
      loadTags();
    }
  }, [isAuthenticated, token]);

  // Selecionar/deselecionar tag individual
  const handleSelectTag = (tagId: number) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Abrir modal para criar nova tag
  const handleCreateTag = () => {
    setEditingTag(null);
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6'
    });
    setShowCreateModal(true);
  };

  // Abrir modal para editar tag
  const openEditModal = (tag: TagType) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      description: tag.description || '',
      color: tag.color || '#3B82F6'
    });
  };

  // Fechar modais
  const closeModals = () => {
    setShowCreateModal(false);
    setEditingTag(null);
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

  // Salvar tag (criar ou atualizar)
  const handleSaveTag = async () => {
    if (!token || !formData.name.trim()) return;
    
    try {
      setSubmitting(true);
      
      if (editingTag) {
        // Atualizar tag existente
        await tagService.updateTag(editingTag.id, formData, token);
      } else {
        // Criar nova tag
        await tagService.createTag(formData, token);
      }
      
      // Recarregar tags e fechar modal
      await reloadTags();
      closeModals();
    } catch (err: any) {
      console.error('Erro ao salvar tag:', err);
      setError(err.message || 'Erro ao salvar tag');
    } finally {
      setSubmitting(false);
    }
  };

  // Excluir tag
  const handleDeleteTag = async (tag: TagType) => {
    if (!token) return;
    
    // Validação adicional: não permitir exclusão se houver posts associados
    if (tag.postsCount > 0) {
      setError(`Não é possível excluir a tag "${tag.name}" pois ela possui ${tag.postsCount} post(s) associado(s).`);
      return;
    }
    
    try {
      setDeletingTags(prev => [...prev, tag.id]);
      await tagService.deleteTag(tag.id, token);
      
      // Recarregar tags e fechar modal
      await reloadTags();
      setShowDeleteModal(null);
      setSelectedTags(prev => prev.filter(id => id !== tag.id));
    } catch (err: any) {
      console.error('Erro ao excluir tag:', err);
      setError(err.message || 'Erro ao excluir tag');
    } finally {
      setDeletingTags(prev => prev.filter(id => id !== tag.id));
    }
  };

  // Filtrar tags baseado na busca
  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchTerm.toLowerCase())
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
              Tags do Blog
            </h1>
            <p className="text-neutral-500">
              Gerencie as tags para organizar e categorizar os posts do blog.
            </p>
          </div>
          
          <button
            onClick={handleCreateTag}
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Tag</span>
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
            placeholder="Buscar tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tags Grid */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-500" />
          <p className="text-neutral-600">Carregando tags...</p>
        </div>
      ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredTags.map((tag) => (
             <TagCard
               key={tag.id}
               tag={tag}
               isSelected={selectedTags.includes(tag.id)}
               onSelect={handleSelectTag}
               onEdit={openEditModal}
               onDelete={setShowDeleteModal}
               isDeleting={deletingTags.includes(tag.id)}
             />
           ))}
         </div>
      )}

      {!loading && filteredTags.length === 0 && (
        <div className="text-center py-12">
          <Tag className="mx-auto h-12 w-12 text-neutral-400" />
          <h3 className="mt-2 text-sm font-medium text-neutral-900">
            Nenhuma tag encontrada
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            {searchTerm 
              ? 'Tente ajustar os termos de busca.' 
              : 'Comece criando sua primeira tag.'
            }
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={handleCreateTag}
                className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Criar primeira tag</span>
              </button>
            </div>
          )}
        </div>
      )}

             {/* Create/Edit Modal */}
       <TagModal
         isOpen={showCreateModal || !!editingTag}
         editingTag={editingTag}
         formData={formData}
         submitting={submitting}
         onClose={closeModals}
         onSave={handleSaveTag}
         onFormDataChange={handleFormDataChange}
       />

             {/* Delete Confirmation Modal */}
       <TagDeleteModal
         tag={showDeleteModal}
         isDeleting={deletingTags.includes(showDeleteModal?.id || 0)}
         onClose={() => setShowDeleteModal(null)}
         onConfirm={() => showDeleteModal && handleDeleteTag(showDeleteModal)}
       />

      {/* Paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalTags}
        onPageChange={setCurrentPage}
        itemName="tags"
      />
    </div>
  );
};

export default TagManagement;
