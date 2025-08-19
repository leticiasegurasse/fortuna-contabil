import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: '1',
      title: 'Como abrir um MEI em 2024: Guia Completo',
      excerpt: 'Descubra o passo a passo para abrir seu MEI de forma rápida e segura. Incluímos todas as mudanças da legislação de 2024.',
      author: 'Júnior - Fortuna Contábil',
      publishedAt: '2024-01-15',
      image: '/src/assets/images/blog/mei-guide.jpg',
      tags: ['MEI', 'Abertura de Empresa', 'Guia'],
      category: 'Abertura de Empresas'
    },
    {
      id: '2',
      title: 'MEI vs ME: Qual escolher para seu negócio?',
      excerpt: 'Entenda as diferenças entre MEI e ME, incluindo faturamento, obrigações fiscais e vantagens de cada tipo de empresa.',
      author: 'Júnior - Fortuna Contábil',
      publishedAt: '2024-01-10',
      image: '/src/assets/images/blog/mei-vs-me.jpg',
      tags: ['MEI', 'ME', 'Comparativo'],
      category: 'Consultoria'
    },
    {
      id: '3',
      title: 'Declaração do MEI 2024: Tudo que você precisa saber',
      excerpt: 'Guia completo sobre a declaração anual do MEI, prazos, obrigações e como fazer corretamente.',
      author: 'Júnior - Fortuna Contábil',
      publishedAt: '2024-01-05',
      image: '/src/assets/images/blog/declaracao-mei.jpg',
      tags: ['MEI', 'Declaração Anual', 'Obrigações'],
      category: 'Declarações'
    },
    {
      id: '4',
      title: '5 dicas para organizar as finanças da sua empresa',
      excerpt: 'Aprenda técnicas práticas para manter suas finanças organizadas e tomar melhores decisões para o seu negócio.',
      author: 'Júnior - Fortuna Contábil',
      publishedAt: '2023-12-28',
      image: '/src/assets/images/blog/financas-empresa.jpg',
      tags: ['Finanças', 'Organização', 'Dicas'],
      category: 'Consultoria'
    },
    {
      id: '5',
      title: 'Imposto de Renda 2024: Principais mudanças',
      excerpt: 'Confira as principais alterações na declaração do IR 2024 e como elas podem afetar sua empresa.',
      author: 'Júnior - Fortuna Contábil',
      publishedAt: '2023-12-20',
      image: '/src/assets/images/blog/ir-2024.jpg',
      tags: ['Imposto de Renda', '2024', 'Mudanças'],
      category: 'Declarações'
    },
    {
      id: '6',
      title: 'Como regularizar uma empresa em situação irregular',
      excerpt: 'Passo a passo para regularizar sua empresa e evitar problemas com a Receita Federal.',
      author: 'Júnior - Fortuna Contábil',
      publishedAt: '2023-12-15',
      image: '/src/assets/images/blog/regularizacao.jpg',
      tags: ['Regularização', 'Receita Federal', 'Problemas'],
      category: 'Regularização'
    }
  ];

  const categories = [
    'Todos',
    'Abertura de Empresas',
    'Consultoria',
    'Declarações',
    'Regularização',
    'Dicas'
  ];

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
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Blog Fortuna Contábil
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Conteúdo exclusivo sobre contabilidade, empreendedorismo e gestão empresarial. 
            Fique por dentro das novidades e dicas para o seu negócio.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar artigos..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Tag size={48} className="mx-auto mb-2" />
                        <p>Imagem do artigo</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar size={16} className="mr-1" />
                        {formatDate(post.publishedAt)}
                        <span className="mx-2">•</span>
                        <User size={16} className="mr-1" />
                        {post.author}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                        >
                          Ler mais
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
                    Anterior
                  </button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">2</button>
                  <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">3</button>
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                    Próximo
                  </button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Categorias
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        to="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-between"
                      >
                        <span>{category}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {blogPosts.filter(post => category === 'Todos' || post.category === category).length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Tags Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link
                      key={tag}
                      to="#"
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-blue-600 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">
                  Fique por dentro!
                </h3>
                <p className="text-blue-100 mb-4">
                  Receba nossas novidades e dicas exclusivas no seu e-mail.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-blue-900 py-3 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                  >
                    Inscrever-se
                  </button>
                </form>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Artigos Recentes
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <article key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(post.publishedAt)}
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Precisa de ajuda com sua contabilidade?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Nossa equipe está pronta para ajudar você a organizar as finanças 
            do seu negócio e crescer de forma sustentável.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contato"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Solicitar Consultoria
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center"
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
