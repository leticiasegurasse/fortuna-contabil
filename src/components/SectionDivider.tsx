interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className = "" }: SectionDividerProps) => {
  return (
    <div className={`flex items-center justify-center mb-6 ${className}`}>
      <div className="w-6 h-1 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full"></div>
      <div className="mx-3 w-3 h-3 bg-accent-500 rounded-full"></div>
      <div className="w-6 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"></div>
    </div>
  );
};

export default SectionDivider;
