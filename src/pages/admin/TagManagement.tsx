import { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Tag,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Palette,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { tagService } from '../../services/tagService';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import type { Tag as TagType } from '../../types/blog';

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
  const [showModal, setShowModal] = useState(false);
  const [editingTag, setEditingTag] = useState<TagType | null>(null);
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
      
      const response = await tagService.getTags(
        currentPage,
        10, // 10 tags por página
        searchTerm || undefined,
        'postsCount' // Ordenar por número de posts
      );
      
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

  // Carregar tags quando mudar página
  useEffect(() => {
    if (isAuthenticated && token && currentPage > 1) {
      loadTags();
    }
  }, [currentPage, isAuthenticated, token]);

  // Função para recarregar tags (usada em callbacks)
  const reloadTags = useCallback(() => {
    if (isAuthenticated && token) {
      loadTags();
    }
  }, [isAuthenticated, token]);

  // Selecionar/deselecionar todas as tags
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTags(tags.map(tag => tag.id));
    } else {
      setSelectedTags([]);
    }
  };

  // Selecionar/deselecionar tag individual
  const handleSelectTag = (tagId: number, checked: boolean) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tagId]);
    } else {
      setSelectedTags(prev => prev.filter(id => id !== tagId));
    }
  };

  // Abrir modal para criar nova tag
  const handleCreateTag = () => {
    setEditingTag(null);
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6'
    });
    setShowModal(true);
  };

  // Abrir modal para editar tag
  const handleEditTag = (tag: TagType) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      description: tag.description || '',
      color: tag.color || '#3B82F6'
    });
    setShowModal(true);
  };

  // Fechar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTag(null);
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6'
    });
    setSubmitting(false);
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
      handleCloseModal();
    } catch (err: any) {
      console.error('Erro ao salvar tag:', err);
      setError(err.message || 'Erro ao salvar tag');
    } finally {
      setSubmitting(false);
    }
  };

  // Excluir tag
  const handleDeleteTag = async (tagId: number) => {
    if (!token || !confirm('Tem certeza que deseja excluir esta tag?')) return;
    
    try {
      setDeletingTags(prev => [...prev, tagId]);
      await tagService.deleteTag(tagId, token);
      
      // Recarregar tags
      await reloadTags();
      setSelectedTags(prev => prev.filter(id => id !== tagId));
    } catch (err: any) {
      console.error('Erro ao excluir tag:', err);
      setError(err.message || 'Erro ao excluir tag');
    } finally {
      setDeletingTags(prev => prev.filter(id => id !== tagId));
    }
  };

  // Excluir tags selecionadas
  const handleDeleteSelected = async () => {
    if (!token || selectedTags.length === 0) return;
    
    if (!confirm(`Tem certeza que deseja excluir ${selectedTags.length} tag(s)?`)) return;
    
    try {
      setDeletingTags(prev => [...prev, ...selectedTags]);
      
      for (const tagId of selectedTags) {
        await tagService.deleteTag(tagId, token);
      }
      
      // Recarregar tags e limpar seleção
      await reloadTags();
      setSelectedTags([]);
    } catch (err: any) {
      console.error('Erro ao excluir tags selecionadas:', err);
      setError(err.message || 'Erro ao excluir tags selecionadas');
    } finally {
      setDeletingTags([]);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciamento de Tags
          </h1>
          <p className="text-gray-600">
            Gerencie as tags do seu blog. Crie, edite e organize as tags para categorizar seus posts.
          </p>
        </div>

        {/* Barra de ações */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Busca */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              {/* Botão de exclusão em lote */}
              {selectedTags.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleDeleteSelected}
                  disabled={deletingTags.length > 0}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir ({selectedTags.length})
                </motion.button>
              )}

              {/* Botão de criar nova tag */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nova Tag
              </motion.button>
            </div>
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

        {/* Lista de tags */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Carregando tags...</p>
            </div>
          ) : tags.length === 0 ? (
            <div className="p-12 text-center">
              <Tag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-2">
                {searchTerm ? 'Nenhuma tag encontrada para sua busca.' : 'Nenhuma tag criada ainda.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleCreateTag}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Criar sua primeira tag
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Tabela */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedTags.length === tags.length && tags.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tag
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posts
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Criada em
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tags.map((tag: TagType) => (
                      <motion.tr
                        key={tag.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag.id)}
                            onChange={(e) => handleSelectTag(tag.id, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-3"
                              style={{ backgroundColor: tag.color }}
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                              <div className="text-sm text-gray-500">{tag.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {tag.description || 'Sem descrição'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="ml-2 text-sm text-gray-600">{tag.color}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <FileText className="h-4 w-4 mr-1" />
                            {tag.postsCount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(tag.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditTag(tag)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTag(tag.id)}
                              disabled={deletingTags.includes(tag.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded disabled:opacity-50"
                            >
                              {deletingTags.includes(tag.id) ? (
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
              {totalPages > 1 && (
                <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando {((currentPage - 1) * 10) + 1} a {Math.min(currentPage * 10, totalTags)} de {totalTags} tags
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-700">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de criação/edição */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingTag ? 'Editar Tag' : 'Nova Tag'}
              </h2>
              
              <form onSubmit={(e) => { e.preventDefault(); handleSaveTag(); }}>
                <div className="space-y-4">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome da tag"
                      required
                      maxLength={100}
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Descrição da tag (opcional)"
                      rows={3}
                    />
                  </div>

                  {/* Cor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cor
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="#3B82F6"
                        pattern="^#[0-9A-Fa-f]{6}$"
                      />
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !formData.name.trim()}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Tag className="h-4 w-4" />
                    )}
                    {editingTag ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagManagement;
