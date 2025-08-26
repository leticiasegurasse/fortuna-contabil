import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { ROUTES } from '../../config/routes';

const NewBlogPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featured: false,
    status: 'draft'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de salvamento
    console.log('Salvando post:', formData);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to={ROUTES.ADMIN_BLOG}
            className="flex items-center space-x-2 text-neutral-500 hover:text-neutral-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar</span>
          </Link>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-secondary-500">
              Novo Post
            </h1>
            <p className="text-neutral-500">
              Crie um novo post para o blog da Fortuna Contábil
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
            >
              <Eye className="h-4 w-4" />
              <span>Visualizar</span>
            </button>
            
            <button
              type="submit"
              form="blog-form"
              className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Salvar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <label htmlFor="title" className="block text-sm font-medium text-secondary-500 mb-2">
                Título do Post
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite o título do post..."
                required
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <label htmlFor="excerpt" className="block text-sm font-medium text-secondary-500 mb-2">
                Resumo
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite um resumo do post..."
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <label htmlFor="content" className="block text-sm font-medium text-secondary-500 mb-2">
                Conteúdo
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={15}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite o conteúdo do post..."
                required
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-secondary-500 mb-4">
                Configurações
              </h3>
              
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-secondary-500 mb-2">
                    Categoria
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Abertura de Empresas">Abertura de Empresas</option>
                    <option value="Imposto de Renda">Imposto de Renda</option>
                    <option value="Consultoria">Consultoria</option>
                    <option value="Legislação">Legislação</option>
                    <option value="Dicas">Dicas</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-secondary-500 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-secondary-500">
                    Post em destaque
                  </label>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-secondary-500 mb-4">
                SEO
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="meta-title" className="block text-sm font-medium text-secondary-500 mb-2">
                    Meta Título
                  </label>
                  <input
                    type="text"
                    id="meta-title"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Título para SEO..."
                  />
                </div>

                <div>
                  <label htmlFor="meta-description" className="block text-sm font-medium text-secondary-500 mb-2">
                    Meta Descrição
                  </label>
                  <textarea
                    id="meta-description"
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Descrição para SEO..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewBlogPost;
