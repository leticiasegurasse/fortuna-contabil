import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Eye, 
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { postService } from '../services/postService';
import { ROUTES } from '../config/routes';
import type { Post } from '../types/blog';

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

  // Tempo de leitura estimado
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  // Compartilhar post
  const sharePost = (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;
    
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
              <span>{getReadingTime(post.content)} min de leitura</span>
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
              <div 
                className="text-neutral-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
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
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary-400 rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary-300 rounded-full translate-x-8 translate-y-8"></div>
              </div>
              
              <div className="relative">
                <h3 className="text-lg font-bold mb-4">
                  Fique por dentro!
                </h3>
                <p className="text-accent-100 mb-4">
                  Receba nossas novidades e dicas exclusivas no seu e-mail.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="w-full px-4 py-3 rounded-lg text-secondary-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary-500 text-secondary-500 py-3 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Inscrever-se
                  </button>
                </form>
              </div>
            </div>
            
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
