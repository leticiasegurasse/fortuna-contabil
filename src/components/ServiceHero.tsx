import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import { ROUTES } from '../config/routes';
import sobreNosImg from '../assets/images/sobre_nos.jpg';

interface ServiceHeroProps {
  breadcrumb: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  features: string[];
}

const ServiceHero = ({
  breadcrumb,
  title,
  titleHighlight,
  description,
  primaryButtonText,
  secondaryButtonText = "WhatsApp",
  features
}: ServiceHeroProps) => {
  return (
    <section className="relative py-20 h-[80vh] text-white flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sobreNosImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600/90 via-accent-700/85 to-accent-800/90"></div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-2 text-accent-200 text-sm">
              <Link to={ROUTES.SERVICES} className="hover:text-white transition-colors">
                Serviços
              </Link>
              <span>/</span>
              <span>{breadcrumb}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              {title}{' '}
              <span className="text-primary-400">{titleHighlight}</span>
            </h1>
            <p className="text-xl text-accent-100 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={ROUTES.CONTACT}
                className="bg-primary-500 text-secondary-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg"
              >
                {primaryButtonText}
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <a
                href="https://wa.me/5531990726579"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-accent-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
              >
                <MessageCircle size={20} className="mr-2" />
                {secondaryButtonText}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Por que escolher a Fortuna?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle size={24} className="text-primary-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
