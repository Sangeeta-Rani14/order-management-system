import React from 'react';

const Badge = ({ children, status = 'pending', className = '' }) => {
  const statusStyles = {
    pending: 'bg-status-pending/10 text-status-pending border-status-pending/20',
    progress: 'bg-status-progress/10 text-status-progress border-status-progress/20',
    completed: 'bg-status-completed/10 text-status-completed border-status-completed/20',
    cancelled: 'bg-status-cancelled/10 text-status-cancelled border-status-cancelled/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyles[status]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
