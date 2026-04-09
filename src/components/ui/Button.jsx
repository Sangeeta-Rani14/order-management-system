import React, { useRef } from 'react';
import { gsap } from 'gsap';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false, 
  ...props 
}) => {
  const buttonRef = useRef(null);

  // Micro-interaction: Hover feedback using GSAP
  const onMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.in"
    });
  };

  // Micro-interaction: Click feedback
  const onMouseDown = () => {
    gsap.to(buttonRef.current, {
      scale: 0.96,
      duration: 0.1
    });
  };

  const onMouseUp = () => {
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 0.1
    });
  };

  // Design system variants aligned with document focus [cite: 68, 77]
  const variants = {
    primary: "bg-brand-gradient text-white shadow-lg hover:shadow-indigo-500/20",
    secondary: "bg-brand-surface text-slate-200 border border-brand-border hover:bg-slate-700",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    danger: "bg-status-cancelled/10 text-status-cancelled border border-status-cancelled/20 hover:bg-status-cancelled hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-tiny",
    md: "px-5 py-2.5 text-body",
    lg: "px-8 py-3.5 text-heading"
  };

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          {/* Loading state: Skeleton UI indicator [cite: 83, 84] */}
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Processing...</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;