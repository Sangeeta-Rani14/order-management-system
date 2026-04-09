import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-brand-surface border border-brand-border rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border/30">
          <h3 className="text-xl font-bold text-white font-['Outfit']">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {footer && (
          <div className="px-6 py-4 border-t border-brand-border/30 bg-brand-surface/20 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
