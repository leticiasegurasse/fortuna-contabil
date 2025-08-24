import SectionDivider from './SectionDivider';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ProcessStepsProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  className?: string;
  backgroundColor?: 'white' | 'background';
  columns?: 4 | 5;
}

const ProcessSteps = ({
  title,
  subtitle,
  steps,
  className = "",
  backgroundColor = "white",
  columns = 4
}: ProcessStepsProps) => {
  const bgClass = backgroundColor === 'white' ? 'bg-white' : 'bg-background-50';
  const gridCols = columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4';

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
        
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8`}>
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-secondary-500 mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
