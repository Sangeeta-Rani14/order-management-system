import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4 w-full',
  };

  return (
    <div className={`animate-pulse bg-brand-border/40 ${variants[variant]} ${className}`}></div>
  );
};

export default Skeleton;
