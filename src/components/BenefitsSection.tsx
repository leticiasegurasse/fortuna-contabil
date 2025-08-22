import SectionDivider from './SectionDivider';

interface Benefit {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  title: string;
  subtitle: string;
  benefits: Benefit[];
  className?: string;
}

const BenefitsSection = ({
  title,
  subtitle,
  benefits,
  className = ""
}: BenefitsSectionProps) => {
  return (
    <section className={`py-20 bg-background-50 ${className}`}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon size={40} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-500 mb-3">
                {benefit.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
