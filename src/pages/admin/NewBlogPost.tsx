import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Upload, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { categoryService, postService, authService, tagService } from '../../services';
import type { Category, Tag, PostFormData } from '../../types/blog';
import { generateSlug } from '../../utils/slug';

const NewBlogPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    categoryId: '',
    status: 'draft',
    tagIds: []
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Buscar categorias e tags ao carregar a página
  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      setError('');
      
      const categories = await categoryService.getCategories();
      setCategories(categories);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setError('Erro ao carregar categorias. Verifique se o backend está rodando.');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      setTagsLoading(true);
      setError('');
      
      const tags = await tagService.getTags();
      setTags(tags);
    } catch (error) {
      console.error('Erro ao buscar tags:', error);
      setError('Erro ao carregar tags. Verifique se o backend está rodando.');
    } finally {
      setTagsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (tagId: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tagIds: checked 
        ? [...prev.tagIds, tagId]
        : prev.tagIds.filter(id => id !== tagId)
    }));
  };

  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione apenas arquivos de imagem (JPG, PNG, GIF, etc.)');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }

      setImageFile(file);
      setError('');

      // Comprimir e criar preview
      compressImage(file, 0.6, 600).then((compressedDataUrl) => {
        // Verificar tamanho após compressão
        const base64Size = Math.ceil((compressedDataUrl.length * 3) / 4);
        const sizeInMB = base64Size / (1024 * 1024);
        
        if (sizeInMB > 2) {
          setError('A imagem ainda está muito grande após compressão. Tente uma imagem menor.');
          return;
        }
        
        setImagePreview(compressedDataUrl);
        setFormData(prev => ({ ...prev, image: compressedDataUrl }));
      }).catch((error) => {
        console.error('Erro ao comprimir imagem:', error);
        // Fallback para preview sem compressão
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImagePreview(result);
          setFormData(prev => ({ ...prev, image: result }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Função para comprimir imagem
  const compressImage = (file: File, quality: number = 0.7, maxWidth: number = 800): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular novas dimensões mantendo proporção
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        // Configurar canvas
        canvas.width = width;
        canvas.height = height;

        // Desenhar imagem comprimida
        ctx?.drawImage(img, 0, 0, width, height);

        // Converter para base64 com qualidade reduzida
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImageToServer = async (_file: File): Promise<string> => {
    try {
      setUploadingImage(true);
      
      // Comprimir imagem para reduzir tamanho do payload
      const compressedImage = await compressImage(_file, 0.5, 400);
      
      // Simular upload para um serviço de hospedagem de imagens
      // Em produção, você pode usar: Cloudinary, AWS S3, Imgur API, etc.
      
      // Por enquanto, vamos simular um delay e retornar a URL base64 comprimida
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Em produção, aqui você faria o upload real:
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });
      // return response.json().url;
      
      // Para demonstração, retornamos a URL base64 comprimida
      return compressedImage;
    } catch (error) {
      console.error('Erro no upload:', error);
      throw new Error('Falha no upload da imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.title.trim()) {
      setError('Título é obrigatório');
      return;
    }

    if (!formData.content.trim()) {
      setError('Conteúdo é obrigatório');
      return;
    }

    if (!formData.categoryId) {
      setError('Categoria é obrigatória');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Verificar autenticação
      if (!authService.isAuthenticated()) {
        setError('Usuário não autenticado. Faça login novamente.');
        return;
      }

      // Obter token válido
      const token = await authService.getValidToken();
      if (!token) {
        setError('Token de autenticação inválido. Faça login novamente.');
        return;
      }

      // Se há uma imagem para upload, fazer o upload primeiro
      let finalImageUrl = formData.image.trim();
      
      if (imageFile) {
        try {
          finalImageUrl = await uploadImageToServer(imageFile);
        } catch (error) {
          setError('Erro ao fazer upload da imagem. Tente novamente.');
          return;
        }
      }

      // Preparar dados do post
      const postData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        image: finalImageUrl || '',
        categoryId: formData.categoryId,
        status: formData.status,
        tagIds: formData.tagIds
      };

      // Criar post
      await postService.createPost(postData, token);
      
      // Sucesso - redirecionar para a lista de posts
      navigate(ROUTES.ADMIN_BLOG);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      
      // Mensagens de erro mais específicas
      if (error instanceof Error) {
        if (error.message.includes('request entity too large') || error.message.includes('Payload Too Large')) {
          setError('A imagem é muito grande. Tente usar uma imagem menor ou comprimir antes do upload.');
        } else if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
          setError('Erro de conexão. Verifique se o backend está rodando.');
        } else {
          setError(`Erro: ${error.message}`);
        }
      } else {
        setError('Erro interno do servidor');
      }
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
              className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{loading ? 'Salvando...' : 'Salvar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <label htmlFor="title" className="block text-sm font-medium text-secondary-500 mb-2">
                Título do Post *
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
                maxLength={200}
              />
              <p className="mt-1 text-sm text-neutral-500">
                {formData.title.length}/200 caracteres
              </p>
            </div>

            {/* Image */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <label htmlFor="image" className="block text-sm font-medium text-secondary-500 mb-2">
                Imagem do Post
              </label>
              
              {/* Input de URL externa */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  URL da Imagem (opcional)
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://exemplo.com/imagem.jpg"
                  maxLength={500}
                />
              </div>

              {/* Separador */}
              <div className="flex items-center mb-3">
                <div className="flex-1 border-t border-neutral-300"></div>
                <span className="px-3 text-xs text-neutral-500">ou</span>
                <div className="flex-1 border-t border-neutral-300"></div>
              </div>

              {/* Upload de arquivo */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  Upload de Arquivo
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={uploadingImage}
                    className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingImage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    <span>{uploadingImage ? 'Fazendo Upload...' : 'Selecionar Imagem'}</span>
                  </button>
                  
                  {imageFile && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center space-x-2 px-3 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                      <span>Remover</span>
                    </button>
                  )}
                </div>
                
                {/* Input de arquivo oculto */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileSelect}
                  className="hidden"
                />
                
                {/* Informações do arquivo */}
                {imageFile && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-blue-700">
                      <ImageIcon className="h-4 w-4" />
                      <span className="font-medium">{imageFile.name}</span>
                      <span className="text-xs">({(imageFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview da imagem */}
              {(formData.image || imagePreview) && (
                <div className="mt-3">
                  <label className="block text-xs font-medium text-neutral-600 mb-2">
                    Preview da Imagem
                  </label>
                  <div className="relative">
                    <img 
                      src={imagePreview || formData.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border border-neutral-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {imageFile && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Novo Upload
                      </div>
                    )}
                  </div>
                </div>
              )}

                             {/* Dicas */}
               <div className="mt-3 text-xs text-neutral-500 space-y-1">
                 <p>• Formatos aceitos: JPG, PNG, GIF, WebP</p>
                 <p>• Tamanho máximo: 5MB (será comprimido)</p>
                 <p>• Resolução recomendada: 800x600px</p>
                 <p>• Imagens são comprimidas automaticamente</p>
                 <p>• Compressão: 60% qualidade, 600px largura</p>
                 <p>• Você pode usar URL externa ou fazer upload</p>
               </div>
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
              <p className="mt-1 text-sm text-neutral-500">
                Resumo opcional para exibição na listagem
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <label htmlFor="content" className="block text-sm font-medium text-secondary-500 mb-2">
                Conteúdo *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={15}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite o conteúdo completo do post..."
                required
              />
              <p className="mt-1 text-sm text-neutral-500">
                Conteúdo principal do post (obrigatório)
              </p>
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
                  <label htmlFor="categoryId" className="block text-sm font-medium text-secondary-500 mb-2">
                    Categoria *
                  </label>
                  {categoriesLoading ? (
                    <div className="flex items-center space-x-2 text-neutral-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Carregando categorias...</span>
                    </div>
                  ) : (
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
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
                    <option value="archived">Arquivado</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-secondary-500 mb-2">
                    Tags
                  </label>
                  {tagsLoading ? (
                    <div className="flex items-center space-x-2 text-neutral-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Carregando tags...</span>
                    </div>
                  ) : (
                    <div className="max-h-48 overflow-y-auto border border-neutral-300 rounded-lg p-3 space-y-2">
                      {tags.length === 0 ? (
                        <p className="text-sm text-neutral-500 text-center py-4">
                          Nenhuma tag disponível
                        </p>
                      ) : (
                        tags.map((tag) => (
                          <label key={tag.id} className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2 rounded">
                            <input
                              type="checkbox"
                              checked={formData.tagIds.includes(tag.id)}
                              onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                            />
                            <span className="text-sm text-neutral-700 flex items-center space-x-2">
                              {tag.name}
                            </span>
                          </label>
                        ))
                      )}
                    </div>
                  )}
                  <p className="mt-1 text-sm text-neutral-500">
                    Selecione as tags relevantes para o post
                  </p>
                </div>
              </div>
            </div>

            {/* Post Info */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-medium text-secondary-500 mb-4">
                Informações do Post
              </h3>
              
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Slug:</span>
                  <span className="font-mono bg-neutral-100 px-2 py-1 rounded text-xs">
                    {formData.title ? generateSlug(formData.title) : 'auto-gerado'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Autor:</span>
                  <span>Admin</span>
                </div>
                <div className="flex justify-between">
                  <span>Visualizações:</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span>Criado em:</span>
                  <span>{new Date().toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    formData.status === 'published' ? 'bg-green-100 text-green-800' :
                    formData.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {formData.status === 'published' ? 'Publicado' :
                     formData.status === 'draft' ? 'Rascunho' : 'Arquivado'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tags:</span>
                  <span className="text-xs">
                    {formData.tagIds.length > 0 
                      ? `${formData.tagIds.length} selecionada${formData.tagIds.length > 1 ? 's' : ''}`
                      : 'Nenhuma'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                💡 Dicas
              </h4>
                             <ul className="text-xs text-blue-700 space-y-1">
                 <li>• Título deve ter até 200 caracteres</li>
                 <li>• Imagem é opcional (URL ou upload)</li>
                 <li>• Upload aceita JPG, PNG, GIF até 5MB</li>
                 <li>• Resumo é opcional</li>
                 <li>• Conteúdo é obrigatório</li>
                 <li>• Slug é gerado automaticamente</li>
                 <li>• Tags ajudam na organização e SEO</li>
               </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewBlogPost;
