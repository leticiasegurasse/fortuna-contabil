import { CheckCircle } from 'lucide-react';
import SectionDivider from './SectionDivider';

interface DocumentsRequiredProps {
  title?: string;
  subtitle: string;
  documents: string[];
  importantNote: string;
  className?: string;
  backgroundColor?: 'white' | 'background';
}

const DocumentsRequired = ({
  title = "Documentos Necessários",
  subtitle,
  documents,
  importantNote,
  className = "",
  backgroundColor = "white"
}: DocumentsRequiredProps) => {
  const bgClass = backgroundColor === 'white' ? 'bg-white' : 'bg-background-50';
  const cardBgClass = backgroundColor === 'white' ? 'bg-background-50' : 'bg-white';

  return (
    <section className={`py-20 ${bgClass} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-4">
            {title}
          </h2>
          <SectionDivider />
          <p className="text-xl text-neutral-500">
            {subtitle}
          </p>
        </div>
        
        <div className={`${cardBgClass} rounded-2xl shadow-lg p-8 border border-gray-100`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((document, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle size={20} className="text-accent-500 flex-shrink-0" />
                <span className="text-neutral-600">{document}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-accent-50 rounded-xl border border-accent-200">
            <p className="text-accent-800">
              <strong>Importante:</strong> {importantNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsRequired;
