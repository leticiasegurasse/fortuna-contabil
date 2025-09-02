import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Loader2, 
  X, 
  Image as ImageIcon,
  Plus,
  GripVertical,
  Type,
  FileText,
  Image,
  List,
  Quote,
  Settings,
  Trash2
} from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { categoryService, postService, authService, tagService } from '../../services';
import uploadService from '../../services/uploadService';
import type { Category, Tag, PostFormData, ContentBlock, Post } from '../../types/blog';
import { generateSlug } from '../../utils/slug';

const EditBlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0');
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    excerpt: '',
    contentBlocks: [],
    image: '',
    categoryId: '',
    status: 'draft',
    tagIds: []
  });

  const [originalPost, setOriginalPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [blockSelectorMode, setBlockSelectorMode] = useState<'add' | 'change'>('add');
  const [blockSelectorContext, setBlockSelectorContext] = useState<{ blockId?: string; afterOrder?: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Buscar post, categorias e tags ao carregar a página
  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchCategories();
      fetchTags();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      setInitialLoading(true);
      setError('');
      
      const post = await postService.getPostById(postId);
      setOriginalPost(post);
      
      // Converter o post para o formato do formulário
      setFormData({
        title: post.title,
        excerpt: post.excerpt || '',
        contentBlocks: post.contentBlocks || [],
        image: post.image || '',
        categoryId: post.categoryId?.toString() || '',
        status: post.status,
        tagIds: post.tags?.map(tag => tag.id) || []
      });
      
      if (post.image) {
        setImagePreview(post.image);
      }
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      setError('Erro ao carregar post. Verifique se o ID é válido.');
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      setError('');
      
      const response = await categoryService.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setError('Erro ao carregar categorias. Verifique se o backend está rodando.');
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      setTagsLoading(true);
      setError('');
      
      const response = await tagService.getTags();
      setTags(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar tags:', error);
      setTags([]);
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

  // Funções para gerenciar blocos de conteúdo
  const addContentBlock = (type: ContentBlock['type'], afterOrder?: number) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: '',
      order: afterOrder ? afterOrder + 1 : formData.contentBlocks.length + 1,
      metadata: getDefaultMetadata(type)
    };

    let newBlocks: ContentBlock[];
    
    if (afterOrder) {
      // Inserir após o bloco especificado
      newBlocks = formData.contentBlocks.map(block => 
        block.order > afterOrder ? { ...block, order: block.order + 1 } : block
      );
      newBlocks.push(newBlock);
    } else {
      // Adicionar ao final
      newBlocks = [...formData.contentBlocks, newBlock];
    }

    // Reordenar todos os blocos
    newBlocks = newBlocks.map((block, index) => ({ ...block, order: index + 1 }));

    setFormData(prev => ({
      ...prev,
      contentBlocks: newBlocks
    }));

    setShowBlockSelector(false);
    setEditingBlock(newBlock);
  };

  // Função para alterar o tipo de um bloco existente
  const changeBlockType = (blockId: string, newType: ContentBlock['type']) => {
    setFormData(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.map(block =>
        block.id === blockId 
          ? { 
              ...block, 
              type: newType, 
              content: '', // Limpar conteúdo ao mudar tipo
              metadata: getDefaultMetadata(newType) // Resetar metadados
            }
          : block
      )
    }));

    setShowBlockSelector(false);
    // Manter o bloco em modo de edição para o usuário preencher o novo conteúdo
    const updatedBlock = formData.contentBlocks.find(b => b.id === blockId);
    if (updatedBlock) {
      setEditingBlock({ ...updatedBlock, type: newType, content: '', metadata: getDefaultMetadata(newType) });
    }
  };

  const getDefaultMetadata = (type: ContentBlock['type']) => {
    switch (type) {
      case 'title':
        return { level: 1, alignment: 'left' as const };
      case 'subtitle':
        return { level: 2, alignment: 'left' as const };
      case 'image':
        return { imageAlt: '', imageCaption: '', alignment: 'center' as const };
      case 'list':
        return { listType: 'unordered' as const, alignment: 'left' as const };
      case 'quote':
        return { quoteAuthor: '', alignment: 'center' as const };
      default:
        return {};
    }
  };

  const updateContentBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setFormData(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    }));
  };

  const removeContentBlock = (blockId: string) => {
    setFormData(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks
        .filter(block => block.id !== blockId)
        .map((block, index) => ({ ...block, order: index + 1 }))
    }));
  };

  const moveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    setFormData(prev => {
      const blocks = [...prev.contentBlocks];
      const currentIndex = blocks.findIndex(block => block.id === blockId);
      
      if (direction === 'up' && currentIndex > 0) {
        [blocks[currentIndex], blocks[currentIndex - 1]] = [blocks[currentIndex - 1], blocks[currentIndex]];
      } else if (direction === 'down' && currentIndex < blocks.length - 1) {
        [blocks[currentIndex], blocks[currentIndex + 1]] = [blocks[currentIndex + 1], blocks[currentIndex]];
      }

      // Reordenar
      blocks.forEach((block, index) => {
        block.order = index + 1;
      });

      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar arquivo usando o serviço
      const validation = uploadService.validateImageFile(file);
      if (!validation.isValid) {
        setError(validation.error || 'Arquivo inválido');
        return;
      }

      setImageFile(file);
      setError('');

      // Criar preview usando o serviço de compressão
      uploadService.compressImage(file, 0.85, 800).then((compressedBlob) => {
        const url = URL.createObjectURL(compressedBlob);
        setImagePreview(url);
        setFormData(prev => ({ ...prev, image: url }));
      }).catch((error) => {
        console.error('Erro ao comprimir imagem:', error);
        // Fallback: criar preview sem compressão
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

  // Função compressImage removida - agora usa uploadService.compressImage

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

  const uploadImageToServer = async (file: File): Promise<string> => {
    try {
      setUploadingImage(true);
      
      // Validar arquivo
      const validation = uploadService.validateImageFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error || 'Arquivo inválido');
      }

      // Comprimir imagem antes do upload
      const compressedBlob = await uploadService.compressImage(file, 0.8, 800);
      
      // Converter blob para File
      const compressedFile = new File([compressedBlob], file.name, {
        type: 'image/jpeg',
        lastModified: Date.now()
      });

      // Fazer upload para o servidor
      const token = await authService.getValidToken();
      if (!token) {
        throw new Error('Token de autenticação inválido');
      }

      const response = await uploadService.uploadImage(compressedFile, token);
      
      // Retornar URL da imagem
      if (response.data?.filename) {
        return uploadService.getImageUrl(response.data.filename);
      } else {
        throw new Error('Nome do arquivo não recebido do servidor');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      throw new Error(error instanceof Error ? error.message : 'Falha no upload da imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Título é obrigatório');
      return;
    }

    if (formData.contentBlocks.length === 0) {
      setError('Pelo menos um bloco de conteúdo é obrigatório');
      return;
    }

    // Validar se todos os blocos têm conteúdo
    const emptyBlocks = formData.contentBlocks.filter(block => !block.content.trim());
    if (emptyBlocks.length > 0) {
      setError('Todos os blocos de conteúdo devem ter conteúdo');
      return;
    }

    // Validar se blocos de imagem têm texto alternativo
    const imageBlocksWithoutAlt = formData.contentBlocks.filter(
      block => block.type === 'image' && (!block.metadata?.imageAlt || !block.metadata.imageAlt.trim())
    );
    if (imageBlocksWithoutAlt.length > 0) {
      setError('Todas as imagens devem ter texto alternativo para acessibilidade');
      return;
    }

    if (!formData.categoryId) {
      setError('Categoria é obrigatória');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (!authService.isAuthenticated()) {
        setError('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const token = await authService.getValidToken();
      if (!token) {
        setError('Token de autenticação inválido. Faça login novamente.');
        return;
      }

      let finalImageUrl = formData.image.trim();
      
      if (imageFile) {
        try {
          finalImageUrl = await uploadImageToServer(imageFile);
        } catch (error) {
          setError('Erro ao fazer upload da imagem. Tente novamente.');
          return;
        }
      }

      const postData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        contentBlocks: formData.contentBlocks,
        image: finalImageUrl || '',
        categoryId: formData.categoryId,
        status: formData.status,
        tagIds: formData.tagIds
      };

      await postService.updatePost(postId, postData, token);
      navigate(ROUTES.ADMIN_BLOG);
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      
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

  const renderBlockContent = (block: ContentBlock) => {
    switch (block.type) {
      case 'title':
      case 'subtitle':
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <select
                value={block.metadata?.level || 1}
                onChange={(e) => updateContentBlock(block.id, {
                  metadata: { ...block.metadata, level: parseInt(e.target.value) }
                })}
                className="px-2 py-1 border border-neutral-300 rounded text-sm"
              >
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
                <option value={4}>H4</option>
                <option value={5}>H5</option>
                <option value={6}>H6</option>
              </select>
              <select
                value={block.metadata?.alignment || 'left'}
                onChange={(e) => updateContentBlock(block.id, {
                  metadata: { ...block.metadata, alignment: e.target.value as 'left' | 'center' | 'right' }
                })}
                className="px-2 py-1 border border-neutral-300 rounded text-sm"
              >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
              </select>
            </div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder={`Digite o ${block.type === 'title' ? 'título' : 'subtítulo'}...`}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg font-semibold"
            />
          </div>
        );

      case 'paragraph':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
            placeholder="Digite o conteúdo do parágrafo..."
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        );

      case 'image':
        return (
          <div className="space-y-3">
            {/* URL da Imagem */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                URL da Imagem
              </label>
              <input
                type="url"
                value={block.content}
                onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Separador */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-neutral-300"></div>
              <span className="px-3 text-xs text-neutral-500">ou</span>
              <div className="flex-1 border-t border-neutral-300"></div>
            </div>

            {/* Upload de Arquivo */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Upload de Arquivo
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={async () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        try {
                          // Validar arquivo
                          const validation = uploadService.validateImageFile(file);
                          if (!validation.isValid) {
                            setError(validation.error || 'Arquivo inválido');
                            return;
                          }

                          // Comprimir imagem
                          const compressedBlob = await uploadService.compressImage(file, 0.85, 800);
                          const compressedFile = new File([compressedBlob], file.name, { type: file.type });

                          // Fazer upload para o servidor
                          const token = await authService.getValidToken();
                          if (!token) {
                            throw new Error('Token de autenticação inválido');
                          }
                          const response = await uploadService.uploadImage(compressedFile, token);
                          
                          // Atualizar o content block com a URL da imagem
                          if (response.data?.filename) {
                            const imageUrl = uploadService.getImageUrl(response.data.filename);
                            updateContentBlock(block.id, { content: imageUrl });
                          } else {
                            throw new Error('Nome do arquivo não recebido do servidor');
                          }
                          
                          setError('');
                        } catch (error) {
                          console.error('Erro ao fazer upload da imagem:', error);
                          setError('Erro ao fazer upload da imagem. Tente novamente.');
                        }
                      }
                    };
                    input.click();
                  }}
                  className="flex items-center space-x-2 px-3 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>Selecionar Imagem</span>
                </button>
                
                {block.content && block.content.startsWith('data:image') && (
                  <button
                    type="button"
                    onClick={() => updateContentBlock(block.id, { content: '' })}
                    className="flex items-center space-x-2 px-3 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Remover</span>
                  </button>
                )}
              </div>
            </div>

            {/* Texto Alternativo */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Texto Alternativo *
              </label>
              <input
                type="text"
                value={block.metadata?.imageAlt || ''}
                onChange={(e) => updateContentBlock(block.id, {
                  metadata: { ...block.metadata, imageAlt: e.target.value }
                })}
                placeholder="Descreva a imagem para acessibilidade..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-xs text-neutral-500">
                Obrigatório para acessibilidade
              </p>
            </div>

            {/* Legenda */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Legenda (opcional)
              </label>
              <input
                type="text"
                value={block.metadata?.imageCaption || ''}
                onChange={(e) => updateContentBlock(block.id, {
                  metadata: { ...block.metadata, imageCaption: e.target.value }
                })}
                placeholder="Legenda que aparecerá abaixo da imagem..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Preview da Imagem */}
            {block.content && (
              <div className="mt-3">
                <label className="block text-xs font-medium text-neutral-600 mb-2">
                  Preview da Imagem
                </label>
                <div className="relative">
                  <img 
                    src={block.content} 
                    alt={block.metadata?.imageAlt || 'Preview'} 
                    className="w-full h-32 object-cover rounded-lg border border-neutral-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {block.content.startsWith('data:image') && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Upload Local
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dicas */}
            <div className="text-xs text-neutral-500 space-y-1">
              <p>• Formatos aceitos: JPG, PNG, GIF, WebP</p>
              <p>• Tamanho máximo: 5MB (será comprimido automaticamente)</p>
                             <p>• Resolução recomendada: 1000x750px</p>
              <p>• Texto alternativo é obrigatório para acessibilidade</p>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <select
                value={block.metadata?.listType || 'unordered'}
                onChange={(e) => updateContentBlock(block.id, {
                  metadata: { ...block.metadata, listType: e.target.value as 'ordered' | 'unordered' }
                })}
                className="px-2 py-1 border border-neutral-300 rounded text-sm"
              >
                <option value="unordered">Lista não ordenada</option>
                <option value="ordered">Lista ordenada</option>
              </select>
            </div>
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Digite os itens da lista, um por linha..."
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="text-xs text-neutral-500">
              Digite um item por linha para criar a lista
            </p>
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-3">
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Digite a citação..."
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="text"
              value={block.metadata?.quoteAuthor || ''}
              onChange={(e) => updateContentBlock(block.id, {
                metadata: { ...block.metadata, quoteAuthor: e.target.value }
              })}
              placeholder="Autor da citação (opcional)..."
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getBlockIcon = (type: ContentBlock['type']) => {
    switch (type) {
      case 'title':
        return <Type className="h-4 w-4" />;
      case 'subtitle':
        return <Type className="h-4 w-4" />;
      case 'paragraph':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'list':
        return <List className="h-4 w-4" />;
      case 'quote':
        return <Quote className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getBlockTypeName = (type: ContentBlock['type']) => {
    switch (type) {
      case 'title':
        return 'Título';
      case 'subtitle':
        return 'Subtítulo';
      case 'paragraph':
        return 'Parágrafo';
      case 'image':
        return 'Imagem';
      case 'list':
        return 'Lista';
      case 'quote':
        return 'Citação';
      default:
        return 'Bloco';
    }
  };

  // Loading inicial
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-neutral-600">Carregando post...</p>
        </div>
      </div>
    );
  }

  // Post não encontrado
  if (!originalPost) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Post não encontrado</h1>
        <p className="text-neutral-600 mb-6">O post que você está tentando editar não existe ou foi removido.</p>
        <Link
          to={ROUTES.ADMIN_BLOG}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para o Blog</span>
        </Link>
      </div>
    );
  }

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
              Editar Post: {originalPost.title}
            </h1>
            <p className="text-neutral-500">
              Edite o post usando blocos de conteúdo estruturado
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
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
              <span>{loading ? 'Salvando...' : 'Salvar Alterações'}</span>
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
                Imagem Principal do Post
              </label>
              
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

              <div className="flex items-center mb-3">
                <div className="flex-1 border-t border-neutral-300"></div>
                <span className="px-3 text-xs text-neutral-500">ou</span>
                <div className="flex-1 border-t border-neutral-300"></div>
              </div>

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
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileSelect}
                  className="hidden"
                />
                
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

            {/* Content Blocks */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-secondary-500">
                  Blocos de Conteúdo *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setBlockSelectorMode('add');
                    setBlockSelectorContext(null);
                    setShowBlockSelector(true);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Bloco</span>
                </button>
              </div>

              {/* Block Selector Modal */}
              {showBlockSelector && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-medium text-secondary-500 mb-4">
                      {blockSelectorMode === 'add' ? 'Escolha o tipo de bloco' : 'Alterar tipo de bloco'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (blockSelectorMode === 'add') {
                            addContentBlock('title', blockSelectorContext?.afterOrder);
                          } else if (blockSelectorContext?.blockId) {
                            changeBlockType(blockSelectorContext.blockId, 'title');
                          }
                        }}
                        className="flex flex-col items-center p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <Type className="h-6 w-6 text-primary-500 mb-2" />
                        <span className="text-sm font-medium">Título</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (blockSelectorMode === 'add') {
                            addContentBlock('subtitle', blockSelectorContext?.afterOrder);
                          } else if (blockSelectorContext?.blockId) {
                            changeBlockType(blockSelectorContext.blockId, 'subtitle');
                          }
                        }}
                        className="flex flex-col items-center p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <Type className="h-6 w-6 text-primary-500 mb-2" />
                        <span className="text-sm font-medium">Subtítulo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (blockSelectorMode === 'add') {
                            addContentBlock('paragraph', blockSelectorContext?.afterOrder);
                          } else if (blockSelectorContext?.blockId) {
                            changeBlockType(blockSelectorContext.blockId, 'paragraph');
                          }
                        }}
                        className="flex flex-col items-center p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <FileText className="h-6 w-6 text-primary-500 mb-2" />
                        <span className="text-sm font-medium">Parágrafo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (blockSelectorMode === 'add') {
                            addContentBlock('image', blockSelectorContext?.afterOrder);
                          } else if (blockSelectorContext?.blockId) {
                            changeBlockType(blockSelectorContext.blockId, 'image');
                          }
                        }}
                        className="flex flex-col items-center p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <Image className="h-6 w-6 text-primary-500 mb-2" />
                        <span className="text-sm font-medium">Imagem</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (blockSelectorMode === 'add') {
                            addContentBlock('list', blockSelectorContext?.afterOrder);
                          } else if (blockSelectorContext?.blockId) {
                            changeBlockType(blockSelectorContext.blockId, 'list');
                          }
                        }}
                        className="flex flex-col items-center p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <List className="h-6 w-6 text-primary-500 mb-2" />
                        <span className="text-sm font-medium">Lista</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (blockSelectorMode === 'add') {
                            addContentBlock('quote', blockSelectorContext?.afterOrder);
                          } else if (blockSelectorContext?.blockId) {
                            changeBlockType(blockSelectorContext.blockId, 'quote');
                          }
                        }}
                        className="flex flex-col items-center p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <Quote className="h-6 w-6 text-primary-500 mb-2" />
                        <span className="text-sm font-medium">Citação</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowBlockSelector(false)}
                      className="w-full mt-4 px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Content Blocks List */}
              <div className="space-y-4">
                {formData.contentBlocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="border border-neutral-200 rounded-lg p-4 bg-neutral-50"
                  >
                    {/* Block Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="h-4 w-4 text-neutral-400" />
                        <div className="flex items-center space-x-2">
                          {getBlockIcon(block.type)}
                          <span className="text-sm font-medium text-neutral-700">
                            {getBlockTypeName(block.type)} {block.order}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Alterar Tipo de Bloco */}
                        <button
                          type="button"
                          onClick={() => {
                            setBlockSelectorMode('change');
                            setBlockSelectorContext({ blockId: block.id });
                            setShowBlockSelector(true);
                          }}
                          className="p-1 text-neutral-500 hover:text-neutral-700"
                          title="Alterar tipo de bloco"
                        >
                          <Type className="h-4 w-4" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setEditingBlock(editingBlock?.id === block.id ? null : block)}
                          className="p-1 text-neutral-500 hover:text-neutral-700"
                          title="Editar bloco"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                        
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => moveContentBlock(block.id, 'up')}
                            className="p-1 text-neutral-500 hover:text-neutral-700"
                            title="Mover para cima"
                          >
                            ↑
                          </button>
                        )}
                        
                        {index < formData.contentBlocks.length - 1 && (
                          <button
                            type="button"
                            onClick={() => moveContentBlock(block.id, 'down')}
                            className="p-1 text-neutral-500 hover:text-neutral-700"
                            title="Mover para baixo"
                          >
                            ↓
                          </button>
                        )}
                        
                        <button
                          type="button"
                          onClick={() => removeContentBlock(block.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Remover bloco"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Block Content */}
                    {editingBlock?.id === block.id ? (
                      <div className="space-y-3">
                        {renderBlockContent(block)}
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setEditingBlock(null)}
                            className="px-3 py-1 text-sm border border-neutral-300 rounded text-neutral-700 hover:bg-neutral-50"
                          >
                            Concluir
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-[40px] flex items-center">
                        {block.content ? (
                          <div className="text-sm text-neutral-600">
                            {block.type === 'image' ? (
                              <div className="flex items-center space-x-2">
                                <span>🖼️</span>
                                {block.content.startsWith('data:image') ? (
                                  <span className="text-blue-600">Imagem local carregada</span>
                                ) : (
                                  <span className="text-green-600">{block.content.substring(0, 50)}{block.content.length > 50 ? '...' : ''}</span>
                                )}
                              </div>
                            ) : (
                              <span>{block.content.substring(0, 100)}{block.content.length > 100 ? '...' : ''}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-neutral-400 italic">Clique em editar para adicionar conteúdo</span>
                        )}
                      </div>
                    )}

                    {/* Add Block After */}
                    <div className="mt-3 pt-3 border-t border-neutral-200">
                      <button
                        type="button"
                        onClick={() => {
                          setBlockSelectorMode('add');
                          setBlockSelectorContext({ afterOrder: block.order });
                          setShowBlockSelector(true);
                        }}
                        className="text-xs text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        + Adicionar bloco após este
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {formData.contentBlocks.length === 0 && (
                <div className="text-center py-8 text-neutral-500">
                  <p>Nenhum bloco de conteúdo adicionado</p>
                  <p className="text-sm">Clique em "Adicionar Bloco" para começar</p>
                </div>
              )}
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
                            <span className="text-sm text-neutral-700">
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
                  <span>ID:</span>
                  <span className="font-mono bg-neutral-100 px-2 py-1 rounded text-xs">
                    {postId}
                  </span>
                </div>
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
                  <span>Blocos:</span>
                  <span>{formData.contentBlocks.length}</span>
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
                <div className="flex justify-between">
                  <span>Criado em:</span>
                  <span className="text-xs">
                    {originalPost.createdAt ? new Date(originalPost.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Atualizado em:</span>
                  <span className="text-xs">
                    {originalPost.updatedAt ? new Date(originalPost.updatedAt).toLocaleDateString('pt-BR') : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                💡 Dicas sobre Blocos
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Use títulos para estruturar o conteúdo</li>
                <li>• Parágrafos para texto corrido</li>
                <li>• Imagens com alt text para acessibilidade</li>
                <li>• Listas para organizar informações</li>
                <li>• Citações para destacar frases importantes</li>
                <li>• Reordene blocos arrastando ou usando ↑↓</li>
                <li>• Pelo menos um bloco é obrigatório</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPost;
