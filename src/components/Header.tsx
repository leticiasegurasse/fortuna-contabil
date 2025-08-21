import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '../config/routes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: ROUTES.HOME },
    { name: 'Sobre', href: ROUTES.ABOUT },
    { name: 'Serviços', href: ROUTES.SERVICES },
    { name: 'Blog', href: ROUTES.BLOG },
    { name: 'Contato', href: ROUTES.CONTACT },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background-500 shadow-lg' : 'bg-background-500/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <img 
              src="/logo-preta.png" 
              alt="Fortuna Contábil" 
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-secondary-500 hover:text-primary-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to={ROUTES.CLIENT_AREA}
              className="text-sm font-medium text-secondary-500 hover:text-primary-500 transition-colors"
            >
              Área do Cliente
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="bg-accent-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors"
            >
              Fale com um Contador
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-secondary-500 hover:text-primary-500 hover:bg-background-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background-500 border-t border-neutral-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-secondary-500 hover:text-primary-500 hover:bg-background-200'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  to={ROUTES.CLIENT_AREA}
                  className="block px-3 py-2 text-base font-medium text-secondary-500 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Área do Cliente
                </Link>
                <Link
                  to={ROUTES.CONTACT}
                  className="block mx-3 bg-accent-500 text-white px-4 py-2 rounded-lg text-base font-medium text-center hover:bg-accent-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fale Conosco
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
