import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { ROUTES } from '../config/routes';
import SectionDivider from './SectionDivider';

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

interface ServicesSectionProps {
  title: string;
  subtitle: string;
  services: ServiceItem[];
  buttonText?: string;
  className?: string;
  backgroundColor?: 'white' | 'background';
}

const ServicesSection = ({
  title,
  subtitle,
  services,
  buttonText = "Solicitar Serviço",
  className = "",
  backgroundColor = "white"
}: ServicesSectionProps) => {
  const bgClass = backgroundColor === 'white' ? 'bg-white' : 'bg-background-50';

  return (
    <section className={`py-20 ${bgClass} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
            {title}
          </h2>
          <SectionDivider />
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-secondary-500 mb-3">
                  {service.title}
                </h3>
                <p className="text-accent-600 font-medium mb-6">
                  {service.description}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-neutral-500">
                    <CheckCircle size={20} className="text-accent-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={ROUTES.CONTACT}
                className="w-full bg-accent-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-accent-600 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center shadow-lg"
              >
                {buttonText}
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
