import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Tag,
  MoreVertical,
  X,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../config/routes';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  postsCount: number;
  createdAt: string;
}

const BlogCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Category | null>(null);

  // Dados mockados para demonstração
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Abertura de Empresas',
      slug: 'abertura-empresas',
      description: 'Artigos sobre abertura e formalização de empresas',
      color: '#3B82F6',
      postsCount: 12,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Imposto de Renda',
      slug: 'imposto-renda',
      description: 'Dicas e orientações sobre declaração de IR',
      color: '#10B981',
      postsCount: 8,
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      name: 'Consultoria',
      slug: 'consultoria',
      description: 'Serviços de consultoria contábil e empresarial',
      color: '#F59E0B',
      postsCount: 5,
      createdAt: '2024-01-08'
    },
    {
      id: 4,
      name: 'Legislação',
      slug: 'legislacao',
      description: 'Atualizações e mudanças na legislação',
      color: '#EF4444',
      postsCount: 15,
      createdAt: '2024-01-05'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCreateCategory = () => {
    if (!formData.name.trim()) return;

    const newCategory: Category = {
      id: Date.now(),
      name: formData.name.trim(),
      slug: generateSlug(formData.name),
      description: formData.description.trim(),
      color: formData.color,
      postsCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCategories(prev => [...prev, newCategory]);
    setFormData({ name: '', description: '', color: '#3B82F6' });
    setShowCreateModal(false);
  };

  const handleEditCategory = () => {
    if (!editingCategory || !formData.name.trim()) return;

    const updatedCategory: Category = {
      ...editingCategory,
      name: formData.name.trim(),
      slug: generateSlug(formData.name),
      description: formData.description.trim(),
      color: formData.color
    };

    setCategories(prev => 
      prev.map(cat => cat.id === editingCategory.id ? updatedCategory : cat)
    );
    
    setFormData({ name: '', description: '', color: '#3B82F6' });
    setEditingCategory(null);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategories(prev => prev.filter(cat => cat.id !== category.id));
    setShowDeleteModal(null);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color
    });
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setEditingCategory(null);
    setShowDeleteModal(null);
    setFormData({ name: '', description: '', color: '#3B82F6' });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link
                to={ROUTES.ADMIN_BLOG}
                className="flex items-center space-x-2 text-neutral-500 hover:text-neutral-700"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar ao Blog</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-secondary-500">
              Categorias do Blog
            </h1>
            <p className="text-neutral-500">
              Gerencie as categorias para organizar os posts do blog.
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Categoria</span>
          </button>
        </div>
      </div>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleSelectCategory(category.id)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
              
              <div className="relative">
                <button className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-neutral-600 mb-3">
                {category.description}
              </p>
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Slug: {category.slug}</span>
                <span>{category.postsCount} posts</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <span className="text-xs text-neutral-500">
                Criada em {new Date(category.createdAt).toLocaleDateString('pt-BR')}
              </span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowDeleteModal(category)}
                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
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
                onClick={() => setShowCreateModal(true)}
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
      <AnimatePresence>
        {(showCreateModal || editingCategory) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="fixed inset-0 bg-neutral-900/50" onClick={closeModals} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h3 className="text-lg font-semibold text-secondary-500">
                  {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                </h3>
                <button
                  onClick={closeModals}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-500 mb-2">
                    Nome da Categoria
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Digite o nome da categoria..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-500 mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Digite uma descrição..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-500 mb-2">
                    Cor
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-12 h-10 border border-neutral-300 rounded-lg cursor-pointer"
                    />
                    <span className="text-sm text-neutral-600">
                      {formData.color}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={editingCategory ? handleEditCategory : handleCreateCategory}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    {editingCategory ? 'Salvar' : 'Criar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="fixed inset-0 bg-neutral-900/50" onClick={() => setShowDeleteModal(null)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-500">
                      Excluir Categoria
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Esta ação não pode ser desfeita.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-neutral-700 mb-6">
                  Tem certeza que deseja excluir a categoria <strong>"{showDeleteModal.name}"</strong>? 
                  {showDeleteModal.postsCount > 0 && (
                    <span className="block mt-2 text-red-600">
                      ⚠️ Esta categoria possui {showDeleteModal.postsCount} post(s) associado(s).
                    </span>
                  )}
                </p>

                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(null)}
                    className="px-4 py-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(showDeleteModal)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogCategories;
