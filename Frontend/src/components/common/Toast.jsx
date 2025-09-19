import React, { useEffect } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose,
  position = 'top-right' 
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      icon: Check,
      bgColor: 'bg-green-500',
      textColor: 'text-white'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-white'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    }
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 slide-in`}
      role="alert"
    >
      <div 
        className={`
          ${config.bgColor} ${config.textColor} 
          px-4 py-3 rounded-lg shadow-lg 
          flex items-center gap-3 min-w-64 max-w-sm
        `}
      >
        <Icon size={20} className="flex-shrink-0" />
        <span className="flex-1 font-medium">{message}</span>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-75 transition-opacity focus-ring rounded"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};