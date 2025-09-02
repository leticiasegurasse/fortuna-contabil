import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag, Loader2 } from 'lucide-react';
import { postService } from '../services/postService';
import type { Post } from '../types/blog';

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage] = useState(1);

  const popularTags = [
    'MEI',
    'Abertura de Empresa',
    'Declaração Anual',
    'Imposto de Renda',
    'Finanças',
    'Regularização',
    'Consultoria',
    'Dicas'
  ];

  // Carregar posts e categorias
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Carregar posts publicados
        const postsResponse = await postService.getPosts(currentPage, 10, 'published');
        setPosts(postsResponse.data);
        
        // TODO: Implementar carregamento de categorias quando o serviço estiver disponível
        // const categoriesResponse = await categoryService.getCategories();
        // setCategories(categoriesResponse.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar posts. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-background-500 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-50/30 to-primary-50/20"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-100/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full text-accent-600 text-sm font-medium mb-6">
            Blog Fortuna Contábil
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-secondary-500 mb-6">
            Conteúdo{' '}
            <span className="text-accent-500">Exclusivo</span>
            {' '}para seu Negócio
          </h1>
          
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            Conteúdo exclusivo sobre contabilidade, empreendedorismo e gestão empresarial. 
            Fique por dentro das novidades e dicas para o seu negócio.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-background-100 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background-50 to-background-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar artigos..."
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white shadow-sm"
                    />
                  </div>
                  <select 
                    className="px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white shadow-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">Todas as categorias</option>
                    {/* TODO: Implementar quando o serviço de categorias estiver disponível */}
                  </select>
                </div>
              </div>

              {/* Blog Posts Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="mx-auto h-8 w-8 text-accent-500 animate-spin mb-4" />
                  <p className="text-neutral-600">Carregando posts...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-600">Nenhum post encontrado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-neutral-100">
                      <div className="h-48 bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
                        <div className="text-center text-neutral-500">
                          <Tag size={48} className="mx-auto mb-2 text-primary-500" />
                          <p>Imagem do artigo</p>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-neutral-500 mb-3">
                          <Calendar size={16} className="mr-1 text-accent-500" />
                          {formatDate(post.publishedAt || post.createdAt)}
                          <span className="mx-2">•</span>
                          <User size={16} className="mr-1 text-accent-500" />
                          {post.author?.username || 'Autor'}
                        </div>
                        
                        <h3 className="text-xl font-bold text-secondary-500 mb-3 hover:text-accent-600 transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-neutral-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags && post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag.id}
                                className="bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded-full font-medium"
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                          
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-accent-600 hover:text-accent-700 font-medium inline-flex items-center transition-colors"
                          >
                            Ler mais
                            <ArrowRight size={16} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-neutral-500 hover:text-neutral-700 disabled:opacity-50 transition-colors">
                    Anterior
                  </button>
                  <button className="px-3 py-2 bg-accent-500 text-white rounded-lg">1</button>
                  <button className="px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">2</button>
                  <button className="px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">3</button>
                  <button className="px-3 py-2 text-neutral-500 hover:text-neutral-700 transition-colors">
                    Próximo
                  </button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
                <h3 className="text-lg font-bold text-secondary-500 mb-4">
                  Categorias
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="#"
                      className="text-neutral-600 hover:text-accent-600 transition-colors flex items-center justify-between group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">Todas</span>
                      <span className="bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded-full font-medium">
                        {posts.length}
                      </span>
                    </Link>
                  </li>
                  {/* TODO: Implementar quando o serviço de categorias estiver disponível */}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
                <h3 className="text-lg font-bold text-secondary-500 mb-4">
                  Tags Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link
                      key={tag}
                      to="#"
                      className="bg-neutral-100 text-neutral-700 text-sm px-3 py-1 rounded-full hover:bg-accent-100 hover:text-accent-800 transition-all duration-300 hover:scale-105"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-xl p-6 relative overflow-hidden">
                {/* Background Pattern */}
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

              {/* Recent Posts */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
                <h3 className="text-lg font-bold text-secondary-500 mb-4">
                  Artigos Recentes
                </h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <article key={post.id} className="border-b border-neutral-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-secondary-500 mb-2 hover:text-accent-600 transition-colors">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                      <div className="flex items-center text-sm text-neutral-500">
                        <Calendar size={14} className="mr-1 text-accent-500" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary-400 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent-400 rounded-full translate-x-12 translate-y-12"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium">
              Comece Agora
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Precisa de ajuda com sua contabilidade?
          </h2>
          <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
            Nossa equipe está pronta para ajudar você a organizar as finanças 
            do seu negócio e crescer de forma sustentável.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contato"
              className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Solicitar Consultoria
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <a
              href="https://wa.me/5531990726579"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-500 text-secondary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
