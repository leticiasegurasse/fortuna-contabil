import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Tag, 
  Eye, 
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { postService } from '../services/postService';
import { ROUTES } from '../config/routes';
import type { Post } from '../types/blog';
import NewsletterSignup from '../components/NewsletterSignup';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  // Carregar post pelo slug
  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const postData = await postService.getPostBySlug(slug);
        setPost(postData);
        
        // Incrementar visualizações
        await postService.incrementViews(postData.id);
        
        // Carregar posts relacionados da mesma categoria
        if (postData.categoryId) {
          const related = await postService.getPosts(1, 3, 'published', postData.categoryId);
          setRelatedPosts(related.data.filter(p => p.id !== postData.id));
        }
      } catch (err) {
        console.error('Erro ao carregar post:', err);
        setError('Post não encontrado ou erro ao carregar.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Tempo de leitura estimado para blocos de conteúdo
  const getReadingTimeFromBlocks = (contentBlocks: any[]) => {
    if (!contentBlocks || contentBlocks.length === 0) {
      return 1;
    }
    
    const wordsPerMinute = 200;
    const totalContent = contentBlocks
      .map(block => block.content || '')
      .join(' ');
    const words = totalContent.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  // Renderizar blocos de conteúdo
  const renderContentBlocks = (contentBlocks: any[]) => {
    if (!contentBlocks || contentBlocks.length === 0) {
      return <p>Conteúdo não disponível</p>;
    }

    return contentBlocks
      .sort((a, b) => a.order - b.order)
      .map((block, index) => {
        switch (block.type) {
          case 'title':
            const titleLevel = block.metadata?.level || 1;
            const titleClass = `text-2xl font-bold text-secondary-500 mb-4 ${
              block.metadata?.alignment === 'center' ? 'text-center' :
              block.metadata?.alignment === 'right' ? 'text-right' : 'text-left'
            }`;
            
            if (titleLevel === 1) {
              return <h1 key={block.id || index} className={titleClass}>{block.content}</h1>;
            } else if (titleLevel === 2) {
              return <h2 key={block.id || index} className={titleClass}>{block.content}</h2>;
            } else if (titleLevel === 3) {
              return <h3 key={block.id || index} className={titleClass}>{block.content}</h3>;
            } else if (titleLevel === 4) {
              return <h4 key={block.id || index} className={titleClass}>{block.content}</h4>;
            } else if (titleLevel === 5) {
              return <h5 key={block.id || index} className={titleClass}>{block.content}</h5>;
            } else {
              return <h6 key={block.id || index} className={titleClass}>{block.content}</h6>;
            }

          case 'subtitle':
            const subtitleLevel = block.metadata?.level || 2;
            const subtitleClass = `text-xl font-semibold text-secondary-600 mb-3 mt-6 ${
              block.metadata?.alignment === 'center' ? 'text-center' :
              block.metadata?.alignment === 'right' ? 'text-right' : 'text-left'
            }`;
            
            if (subtitleLevel === 1) {
              return <h1 key={block.id || index} className={subtitleClass}>{block.content}</h1>;
            } else if (subtitleLevel === 2) {
              return <h2 key={block.id || index} className={subtitleClass}>{block.content}</h2>;
            } else if (subtitleLevel === 3) {
              return <h3 key={block.id || index} className={subtitleClass}>{block.content}</h3>;
            } else if (subtitleLevel === 4) {
              return <h4 key={block.id || index} className={subtitleClass}>{block.content}</h4>;
            } else if (subtitleLevel === 5) {
              return <h5 key={block.id || index} className={subtitleClass}>{block.content}</h5>;
            } else {
              return <h6 key={block.id || index} className={subtitleClass}>{block.content}</h6>;
            }

          case 'paragraph':
            return (
              <p key={block.id || index} className="mb-4 leading-relaxed text-justify">
                {block.content}
              </p>
            );

          case 'image':
            return (
              <div key={block.id || index} className="my-6">
                <img
                  src={block.content}
                  alt={block.metadata?.imageAlt || 'Imagem do post'}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                {block.metadata?.imageCaption && (
                  <p className="text-sm text-neutral-500 text-center mt-2 italic">
                    {block.metadata.imageCaption}
                  </p>
                )}
              </div>
            );

          case 'list':
            const ListTag = block.metadata?.listType === 'ordered' ? 'ol' : 'ul';
            const items = block.content.split('\n').filter((item: string) => item.trim());
            return (
              <ListTag key={block.id || index} className="mb-4 ml-6">
                {items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className="mb-2 flex items-start">
                    {block.metadata?.listType === 'ordered' ? (
                      <span className="mr-3 text-sm font-medium text-neutral-600 min-w-[20px]">
                        {itemIndex + 1}.
                      </span>
                    ) : (
                      <ArrowRight className="mr-3 text-primary-500" /> 
                    )}
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ListTag>
            );

          case 'quote':
            return (
              <blockquote key={block.id || index} className="border-l-4 border-primary-500 pl-4 py-2 my-6 bg-neutral-50 italic">
                <p className="text-lg mb-2">"{block.content}"</p>
                {block.metadata?.quoteAuthor && (
                  <p className="text-sm text-neutral-600">— {block.metadata.quoteAuthor}</p>
                )}
              </blockquote>
            );

          default:
            return <p key={block.id || index} className="mb-4">{block.content}</p>;
        }
      });
  };

  // Compartilhar post
  const sharePost = (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
    };
    
    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  // Copiar link
  const copyLink = async () => {
    if (!post) return;
    
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-secondary-500 mb-4">Post não encontrado</h1>
          <p className="text-neutral-600 mb-6">
            O post que você está procurando não foi encontrado ou pode ter sido removido.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-accent-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors"
            >
              Voltar
            </button>
            <Link
              to={ROUTES.BLOG}
              className="block w-full bg-neutral-200 text-neutral-700 px-6 py-3 rounded-lg font-medium hover:bg-neutral-300 transition-colors"
            >
              Ver todos os posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-100">
      {/* Header do Post */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-4">
            
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <Calendar size={16} />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              <span>•</span>
              <Clock size={16} />
              <span>{getReadingTimeFromBlocks(post.contentBlocks)} min de leitura</span>
            </div>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-secondary-500 leading-tight mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-neutral-600 leading-relaxed mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User size={20} className="text-accent-500" />
                <span className="text-neutral-700 font-medium">
                  {post.author?.username || 'Autor'}
                </span>
              </div>
              
              {post.category && (
                <div className="flex items-center space-x-2">
                  <Tag size={20} className="text-primary-500" />
                  <span className="text-neutral-700 font-medium">
                    {post.category.name}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Eye size={20} className="text-neutral-500" />
              <span className="text-neutral-600">{post.views} visualizações</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Conteúdo do Post */}
          <article className="lg:col-span-4">
            {/* Imagem do Post */}
            {post.image && (
              <div className="mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
            
            {/* Conteúdo do Post */}
            <div className="prose prose-lg max-w-none">
              <div className="text-neutral-700 leading-relaxed">
                {renderContentBlocks(post.contentBlocks)}
              </div>
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <h3 className="text-lg font-semibold text-secondary-500 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Botões de Compartilhamento */}
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <h3 className="text-lg font-semibold text-secondary-500 mb-4">Compartilhar:</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => sharePost('facebook')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={18} />
                  <span>Facebook</span>
                </button>
                
                <button
                  onClick={() => sharePost('twitter')}
                  className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Twitter size={18} />
                  <span>Twitter</span>
                </button>
                
                <button
                  onClick={() => sharePost('linkedin')}
                  className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </button>
                
                <button
                  onClick={() => sharePost('whatsapp')}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp</span>
                </button>
                
                <button
                  onClick={copyLink}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copied ? 'Copiado!' : 'Copiar link'}</span>
                </button>
              </div>
            </div>
          </article>
          
          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            {/* Posts Relacionados */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
                <h3 className="text-lg font-bold text-secondary-500 mb-4">
                  Posts Relacionados
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.id} className="border-b border-neutral-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-secondary-500 mb-2 hover:text-accent-600 transition-colors">
                        <Link to={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h4>
                      <div className="flex items-center text-sm text-neutral-500">
                        <Calendar size={14} className="mr-1 text-accent-500" />
                        {formatDate(relatedPost.publishedAt || relatedPost.createdAt)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
            
            {/* Newsletter */}
            <NewsletterSignup variant="accent" />
            
            {/* CTA */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-3">
                Precisa de ajuda?
              </h3>
              <p className="text-primary-100 mb-4">
                Nossa equipe está pronta para ajudar você com sua contabilidade.
              </p>
              <Link
                to={ROUTES.CONTACT}
                className="inline-block bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
              >
                Falar conosco
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
