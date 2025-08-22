import { ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  gradientColors: string;
}

interface FAQProps {
  title: string;
  subtitle: string;
  items: FAQItem[];
  className?: string;
}

const FAQ = ({ title, subtitle, items, className = "" }: FAQProps) => {
  return (
    <section className={`py-20 bg-gradient-to-br from-white to-background-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
            {title}
          </h2>
          <p className="text-xl text-neutral-500">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <details key={index} className="group bg-white rounded-2xl transition-all duration-300 border border-gray-200 overflow-hidden">
              <summary className="p-8 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <item.icon size={20} className={`${item.iconColor} mr-3 flex-shrink-0`} />
                  <h3 className="text-xl font-bold text-secondary-500">
                    {item.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full ${item.gradientColors} flex items-center justify-center group-open:rotate-180 transition-transform duration-300`}>
                    <ArrowRight size={16} className="text-primary-600" />
                  </div>
                </div>
              </summary>
              <div className="px-8 pb-8 pt-0">
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-neutral-500 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
