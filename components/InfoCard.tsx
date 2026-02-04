import React from 'react';
import { AIAnalysisResult, CategoryType } from '../types';
import { 
  User, 
  Lightbulb, 
  MapPin, 
  Building2, 
  Calendar, 
  Cpu, 
  HelpCircle, 
  ExternalLink, 
  X,
  Copy,
  Check
} from 'lucide-react';

interface InfoCardProps {
  data: AIAnalysisResult | null;
  isLoading: boolean;
  onClose: () => void;
  style: React.CSSProperties;
}

const getCategoryIcon = (category: CategoryType) => {
  switch (category) {
    case CategoryType.PERSON: return <User className="w-4 h-4" />;
    case CategoryType.CONCEPT: return <Lightbulb className="w-4 h-4" />;
    case CategoryType.LOCATION: return <MapPin className="w-4 h-4" />;
    case CategoryType.ORGANIZATION: return <Building2 className="w-4 h-4" />;
    case CategoryType.EVENT: return <Calendar className="w-4 h-4" />;
    case CategoryType.TECHNOLOGY: return <Cpu className="w-4 h-4" />;
    default: return <HelpCircle className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: CategoryType) => {
  switch (category) {
    case CategoryType.PERSON: return 'bg-blue-100 text-blue-700';
    case CategoryType.CONCEPT: return 'bg-purple-100 text-purple-700';
    case CategoryType.LOCATION: return 'bg-emerald-100 text-emerald-700';
    case CategoryType.ORGANIZATION: return 'bg-orange-100 text-orange-700';
    case CategoryType.TECHNOLOGY: return 'bg-indigo-100 text-indigo-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const InfoCard: React.FC<InfoCardProps> = ({ data, isLoading, onClose, style }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (data) {
      const textToCopy = `${data.title}\n\n${data.summary.join('\n')}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      style={style}
      className="fixed z-50 w-[340px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden font-sans text-sm animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {/* Header Actions */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
         <button 
          onClick={handleCopy}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
        <button 
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isLoading ? (
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2 animate-pulse">
            <div className="h-3 w-full bg-gray-200 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : data ? (
        <>
          {/* Header */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase flex items-center gap-1.5 ${getCategoryColor(data.category)}`}>
                {getCategoryIcon(data.category)}
                {data.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{data.title}</h3>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              {data.summary.map((point, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            {data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {data.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Links */}
          {data.externalLinks.length > 0 && (
            <div className="bg-gray-50 p-3 flex flex-col gap-1 border-t border-gray-100">
              {data.externalLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1.5 rounded transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Read more on {link.title}
                </a>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
