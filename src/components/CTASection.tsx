import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '../config/routes';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  isExternalSecondary?: boolean;
  className?: string;
  variant?: 'default' | 'accent';
}

const CTASection = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  secondaryButtonLink,
  isExternalSecondary = true,
  className = "",
  variant = "default"
}: CTASectionProps) => {
  const getBackgroundClass = () => {
    if (variant === 'accent') {
      return 'bg-accent-500';
    }
    return 'bg-gradient-to-br from-secondary-500 to-secondary-600';
  };

  const getSecondaryButtonClass = () => {
    if (variant === 'accent') {
      return 'border-2 border-white text-white hover:bg-white hover:text-accent-500';
    }
    return 'bg-primary-500 text-secondary-500 hover:bg-primary-600';
  };

  const getPrimaryButtonClass = () => {
    if (variant === 'accent') {
      return 'bg-primary-500 text-secondary-500 hover:bg-primary-600';
    }
    return 'bg-accent-500 text-white hover:bg-accent-600';
  };

  return (
    <section className={`py-20 ${getBackgroundClass()} text-white relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary-400 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent-400 rounded-full translate-x-12 translate-y-12"></div>
      </div>

        <div className="flex justify-center mb-6">
         <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium">
           Comece Agora
         </div>
       </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
             to={ROUTES.CONTACT}
             className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl ${getPrimaryButtonClass()}`}
           >
             {primaryButtonText}
             <ArrowRight size={20} className="ml-2" />
           </Link>
          {isExternalSecondary ? (
            <a
              href={secondaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl ${getSecondaryButtonClass()}`}
            >
              {secondaryButtonText}
            </a>
          ) : (
            <Link
              to={secondaryButtonLink}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl ${getSecondaryButtonClass()}`}
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
