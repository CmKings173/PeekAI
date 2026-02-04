import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FloatingIcon } from './FloatingIcon';
import { InfoCard } from './InfoCard';
import { analyzeText } from '../services/geminiService';
import { AIAnalysisResult, HighlightCoordinates } from '../types';

export const ExtensionController: React.FC = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Coordinates for the UI elements
  const [coords, setCoords] = useState<HighlightCoordinates | null>(null);
  
  // Data
  const [selectedText, setSelectedText] = useState('');
  const [cardData, setCardData] = useState<AIAnalysisResult | null>(null);

  // Cache to prevent re-fetching the same term
  const cacheRef = useRef<Map<string, AIAnalysisResult>>(new Map());

  // Handle selection logic
  const handleSelection = useCallback(() => {
    // If card is open, don't interfere with new selections unless explicit close
    if (showCard) return;

    const selection = window.getSelection();

    if (!selection || selection.isCollapsed) {
      setShowIcon(false);
      return;
    }

    const text = selection.toString().trim();
    if (text.length === 0) {
      setShowIcon(false);
      return;
    }

    // Get position
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // Calculate position: Just below the end of the highlight
    setCoords({
      x: rect.left + (rect.width / 2),
      y: rect.bottom,
      width: rect.width,
      height: rect.height
    });
    
    setSelectedText(text);
    setShowIcon(true);
  }, [showCard]);

  // Listen for selection changes
  useEffect(() => {
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    
    // Also listen for scroll to hide/update icon if needed, 
    // but for simplicity in demo we might just leave it or let it scroll with page if absolute
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, [handleSelection]);

  // Handle Icon Click
  const handleIconClick = async () => {
    setShowIcon(false);
    setShowCard(true);
    setIsLoading(true);

    try {
      // Check cache
      if (cacheRef.current.has(selectedText)) {
        setCardData(cacheRef.current.get(selectedText)!);
        setIsLoading(false);
        return;
      }

      // Context extraction (grab some surrounding text)
      // In a real extension, we would traverse the DOM nodes up/down
      const selection = window.getSelection();
      let context = "";
      if (selection && selection.anchorNode && selection.anchorNode.parentElement) {
        context = selection.anchorNode.parentElement.textContent || "";
      }

      const result = await analyzeText(selectedText, context.substring(0, 500)); // Limit context length
      
      cacheRef.current.set(selectedText, result);
      setCardData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setCardData(null);
    window.getSelection()?.removeAllRanges();
  };

  if (!coords) return null;

  // Render using Portals? 
  // In a real extension, this would be injected. 
  // Here we just render absolute overlays.
  
  return (
    <>
      <FloatingIcon 
        isVisible={showIcon}
        onClick={handleIconClick}
        style={{
          left: coords.x - 16, // Center the 32px icon
          top: coords.y + 8 + window.scrollY, // Add scrollY for absolute positioning
        }}
      />
      
      {showCard && (
        <InfoCard 
          data={cardData}
          isLoading={isLoading}
          onClose={handleCloseCard}
          style={{
            left: Math.min(window.innerWidth - 360, Math.max(20, coords.x - 170)), // Keep within viewport
            top: coords.y + 12 + window.scrollY,
          }}
        />
      )}
    </>
  );
};
