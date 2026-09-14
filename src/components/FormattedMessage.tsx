import React from 'react';

interface FormattedMessageProps {
  content: string;
  className?: string;
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({ content, className = '' }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-list`} className="space-y-1 my-2 list-disc list-inside text-slate-800">
          {currentList.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineFormatted(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const renderInlineFormatted = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(`flush-${index}`);
      return;
    }

    // Heading 1 (# Heading)
    if (trimmed.startsWith('# ')) {
      flushList(`h1-${index}`);
      elements.push(
        <h3 key={index} className="text-base sm:text-lg font-bold text-slate-900 mt-4 mb-2 tracking-tight">
          {renderInlineFormatted(trimmed.slice(2))}
        </h3>
      );
      return;
    }

    // Heading 2 (## Heading)
    if (trimmed.startsWith('## ')) {
      flushList(`h2-${index}`);
      elements.push(
        <h4 key={index} className="text-sm sm:text-base font-bold text-slate-900 mt-3.5 mb-1.5 tracking-tight">
          {renderInlineFormatted(trimmed.slice(3))}
        </h4>
      );
      return;
    }

    // Heading 3 (### Heading)
    if (trimmed.startsWith('### ')) {
      flushList(`h3-${index}`);
      elements.push(
        <h5 key={index} className="text-xs sm:text-sm font-bold text-slate-900 mt-3 mb-1 tracking-tight">
          {renderInlineFormatted(trimmed.slice(4))}
        </h5>
      );
      return;
    }

    // Unordered List item (- or * or •)
    if (/^[-*•]\s+/.test(trimmed)) {
      const itemContent = trimmed.replace(/^[-*•]\s+/, '');
      currentList.push(itemContent);
      return;
    }

    // Ordered List item (1. 2.)
    if (/^\d+\.\s+/.test(trimmed)) {
      flushList(`flush-ol-${index}`);
      const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numberMatch) {
        elements.push(
          <div key={index} className="flex items-start gap-2 my-1 text-slate-800 leading-relaxed">
            <span className="font-bold text-[#0ea5e9] shrink-0 text-xs mt-0.5">{numberMatch[1]}.</span>
            <span>{renderInlineFormatted(numberMatch[2])}</span>
          </div>
        );
        return;
      }
    }

    // Regular paragraph
    flushList(`flush-p-${index}`);
    elements.push(
      <p key={index} className="my-1.5 leading-relaxed text-slate-800">
        {renderInlineFormatted(trimmed)}
      </p>
    );
  });

  flushList('flush-final');

  return <div className={`text-xs sm:text-sm space-y-1 ${className}`}>{elements}</div>;
};
