import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Briefcase, MessageCircle, User, Phone, Book } from 'lucide-react';
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
    { name: 'Home', href: ROUTES.HOME, icon: Home },
    { name: 'Sobre', href: ROUTES.ABOUT, icon: Users },
    { name: 'Serviços', href: ROUTES.SERVICES, icon: Briefcase },
    { name: 'Blog', href: ROUTES.BLOG, icon: Book },
    { name: 'Contato', href: ROUTES.CONTACT, icon: MessageCircle },
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
            {/*<Link
              to={ROUTES.CLIENT_AREA}
              className="text-sm font-medium text-secondary-500 hover:text-primary-500 transition-colors"
            >
              Área do Cliente
            </Link>*/}
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
            className="lg:hidden p-3 rounded-xl text-secondary-500 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-gradient-to-b from-background-500 to-background-400 border-t border-neutral-200 shadow-lg">
              {/* Navigation Items */}
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                      isActive(item.href)
                        ? 'text-primary-500 bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 shadow-sm'
                        : 'text-secondary-500 hover:text-primary-500 hover:bg-background-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* Divider */}
              <div className="border-t border-neutral-200 my-4"></div>
              
              {/* Additional Links */}
              <div className="space-y-2">
                <Link
                  to={ROUTES.CLIENT_AREA}
                  className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-secondary-500 hover:text-primary-500 hover:bg-background-200 rounded-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} className="flex-shrink-0" />
                  <span>Área do Cliente</span>
                </Link>
              </div>
              
              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  to={ROUTES.CONTACT}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-4 rounded-xl text-base font-semibold text-center hover:from-accent-600 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone size={20} />
                  <span>Fale com um Contador</span>
                </Link>
              </div>
              
              {/* Contact Info */}
              <div className="pt-4 px-4 py-3 bg-primary-50 rounded-xl border border-primary-200">
                <div className="text-sm text-secondary-500 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-primary-500" />
                    <span>(31) 99072-6579</span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    Atendimento: Segunda a Sexta, 8h às 18h
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
