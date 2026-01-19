// Full Page Notification Component
'use client';
import { useEffect, useState } from 'react';

export default function FullPageNotification({ 
  type = 'success', 
  title, 
  message, 
  duration = 3000, 
  onClose,
  showProgress = true 
}) {
  const [countdown, setCountdown] = useState(duration / 1000);
  const [progress, setProgress] = useState(100);

  const typeConfig = {
    success: {
      bg: 'from-green-900 to-green-700',
      icon: 'fas fa-check-circle',
      iconColor: 'text-green-400',
      progressColor: 'bg-green-500'
    },
    error: {
      bg: 'from-red-900 to-red-700',
      icon: 'fas fa-exclamation-circle',
      iconColor: 'text-red-400',
      progressColor: 'bg-red-500'
    },
    warning: {
      bg: 'from-yellow-900 to-yellow-700',
      icon: 'fas fa-exclamation-triangle',
      iconColor: 'text-yellow-400',
      progressColor: 'bg-yellow-500'
    },
    info: {
      bg: 'from-blue-900 to-blue-700',
      icon: 'fas fa-info-circle',
      iconColor: 'text-blue-400',
      progressColor: 'bg-blue-500'
    }
  };

  const config = typeConfig[type] || typeConfig.info;

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);
          if (onClose) onClose();
          return 0;
        }
        return prev - 0.1;
      });

      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        return Math.max(0, newProgress);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} opacity-30`}></div>
      
      <div className="relative z-10 max-w-md mx-auto p-8">
        <div className="bg-black bg-opacity-60 backdrop-blur-lg rounded-3xl p-8 border border-gray-700 shadow-2xl">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-4`}>
              <i className={`${config.icon} ${config.iconColor}`} style={{ fontSize: '3rem' }}></i>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            
            {/* Message */}
            <p className="text-gray-300 text-lg">{message}</p>
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Auto-close in {Math.ceil(countdown)}s</span>
                <button 
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Close now
                </button>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`${config.progressColor} h-2 rounded-full transition-all duration-100 ease-linear`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleClose}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for showing notifications
export const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (props) => {
    setNotification(props);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const NotificationComponent = notification ? (
    <FullPageNotification
      {...notification}
      onClose={hideNotification}
    />
  ) : null;

  return { showNotification, hideNotification, NotificationComponent };
};
