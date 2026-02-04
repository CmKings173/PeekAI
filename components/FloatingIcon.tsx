import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingIconProps {
  onClick: () => void;
  style: React.CSSProperties;
  isVisible: boolean;
}

export const FloatingIcon: React.FC<FloatingIconProps> = ({ onClick, style, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent text deselection
        onClick();
      }}
      style={style}
      className="fixed z-50 flex items-center justify-center w-8 h-8 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 hover:scale-110 transition-all duration-200 animate-in fade-in zoom-in cursor-pointer border border-white/20"
      aria-label="Analyze with AI"
    >
      <Sparkles className="w-4 h-4 text-yellow-300" />
    </button>
  );
};
