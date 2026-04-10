import React from 'react';

const Card = ({ children, title, subtitle, footer, className = '', noPadding = false }) => {
  return (
    <div className={`glass-card overflow-hidden flex flex-col ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-brand-border/50">
          {title && <h3 className="text-lg font-semibold text-brand-primary">{title}</h3>}
          {subtitle && <p className="text-sm text-brand-secondary">{subtitle}</p>}
        </div>
      )}
      <div className={`flex-1 ${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>
      {footer && (
        <div className="px-6 py-3 border-t border-brand-border/50 bg-brand-surface/20">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
