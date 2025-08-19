import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Heart } from 'lucide-react';
import { ROUTES } from '../config/routes';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Empresa */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/src/assets/images/logos/icone.svg" 
                alt="Fortuna Contábil" 
                className="h-8 w-8"
              />
              <h3 className="text-xl font-bold">Fortuna Contábil</h3>
            </div>
            <p className="text-neutral-200 text-sm leading-relaxed">
              Especialistas em contabilidade para MEI e pequenas empresas. 
              Atendimento humanizado e 100% online em todo o Brasil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Nossos Serviços</h4>
            <ul className="space-y-2 text-sm text-neutral-200">
              <li>
                <Link to={ROUTES.SERVICES} className="hover:text-white transition-colors">
                  Abertura de Empresas
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SERVICES} className="hover:text-white transition-colors">
                  Contabilidade MEI
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SERVICES} className="hover:text-white transition-colors">
                  Consultoria Contábil
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SERVICES} className="hover:text-white transition-colors">
                  Declaração de IR
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SERVICES} className="hover:text-white transition-colors">
                  Regularização
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-neutral-200">
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to={ROUTES.BLOG} className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CLIENT_AREA} className="hover:text-white transition-colors">
                  Área do Cliente
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-3 text-sm text-neutral-200">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-primary-400" />
                <span>(31) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-primary-400" />
                <span>contato@fortunacontabil.com.br</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-primary-400 mt-1" />
                <span>
                  Belo Horizonte - MG<br />
                  Atendimento em todo o Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-neutral-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-300">
              © {currentYear} Fortuna Contábil. Todos os direitos reservados.
            </p>
            <p className="text-sm text-neutral-300 flex items-center">
              Desenvolvido com <Heart size={14} className="mx-1 text-red-500" /> para o seu negócio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
