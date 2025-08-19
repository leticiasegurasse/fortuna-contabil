import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { ROUTES } from '../config/routes';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida. 
          Verifique o endereço ou navegue pelas opções abaixo.
        </p>
        
        <div className="space-y-4">
          <Link
            to={ROUTES.HOME}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
          >
            <Home size={20} className="mr-2" />
            Voltar ao Início
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar à Página Anterior
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Ou navegue pelas páginas principais:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              to={ROUTES.ABOUT}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Sobre
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to={ROUTES.SERVICES}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Serviços
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to={ROUTES.BLOG}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Blog
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to={ROUTES.CONTACT}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
