import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} rounded-full border-brand-accent/20 border-t-brand-accent animate-spin`}></div>
    </div>
  );
};

export default Spinner;
