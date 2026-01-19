'use client';

import { useEffect, useState } from 'react';

export default function EnhancedSweetAlert({ 
  show, 
  title, 
  message, 
  type = 'info', 
  confirmButtonText = 'ตกลง', 
  cancelButtonText = 'ยกเลิก',
  showCancelButton = false,
  onConfirm,
  onCancel,
  onClose 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [show]);

  const handleConfirm = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onConfirm?.();
      onClose?.();
    }, 300);
  };

  const handleCancel = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onCancel?.();
      onClose?.();
    }, 300);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
          borderColor: 'rgba(34, 197, 94, 0.3)',
          iconColor: 'success',
          icon: 'check-circle',
          buttonColor: 'success'
        };
      case 'error':
        return {
          bgColor: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          iconColor: 'danger',
          icon: 'exclamation-circle',
          buttonColor: 'danger'
        };
      case 'warning':
        return {
          bgColor: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
          borderColor: 'rgba(251, 146, 60, 0.3)',
          iconColor: 'warning',
          icon: 'exclamation-triangle',
          buttonColor: 'warning'
        };
      case 'question':
        return {
          bgColor: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          iconColor: 'info',
          icon: 'question-circle',
          buttonColor: 'primary'
        };
      default:
        return {
          bgColor: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderColor: 'rgba(6, 182, 212, 0.3)',
          iconColor: 'info',
          icon: 'info-circle',
          buttonColor: 'info'
        };
    }
  };

  const config = getAlertConfig();

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`modal-backdrop fade ${isAnimating ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1040,
          transition: 'opacity 0.3s ease',
          opacity: isAnimating ? 1 : 0
        }}
        onClick={handleClose}
      ></div>

      {/* Alert Modal */}
      <div 
        className={`modal fade ${isAnimating ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) ${isAnimating ? 'scale(1)' : 'scale(0.9)'}`,
          transition: 'all 0.3s ease',
          zIndex: 1050,
          maxWidth: '450px',
          width: '90%'
        }}
      >
        <div 
          className="modal-content bg-dark text-light border-0 shadow-lg"
          style={{
            background: config.bgColor,
            border: `1px solid ${config.borderColor}`,
            borderRadius: '15px',
            overflow: 'hidden'
          }}
        >
          {/* Alert Header */}
          <div className="modal-header border-0 text-center pb-3">
            <div className="position-relative d-inline-block mb-3">
              <div 
                className={`bg-${config.iconColor} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center`}
                style={{ width: '70px', height: '70px' }}
              >
                <i 
                  className={`fas fa-${config.icon} text-${config.iconColor}`}
                  style={{ fontSize: '2rem' }}
                ></i>
              </div>
              {type === 'success' && (
                <div 
                  className="position-absolute top-0 end-0 bg-success rounded-circle p-1" 
                  style={{ width: '20px', height: '20px' }}
                >
                  <i className="fas fa-check text-white" style={{ fontSize: '8px' }}></i>
                </div>
              )}
            </div>
            <h5 className="modal-title text-white fw-bold mb-2">{title}</h5>
          </div>

          {/* Alert Body */}
          <div className="modal-body text-center pt-0">
            <p className="text-light mb-0">{message}</p>
          </div>

          {/* Alert Footer */}
          <div className="modal-footer border-0 justify-content-center gap-2 pt-2">
            {showCancelButton && (
              <button
                onClick={handleCancel}
                className="btn btn-outline-secondary px-4"
                style={{
                  borderRadius: '25px',
                  background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(75, 85, 99, 0.1) 100%)',
                  border: '1px solid rgba(107, 114, 128, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(107, 114, 128, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className="fas fa-times me-2"></i>
                {cancelButtonText}
              </button>
            )}
            
            <button
              onClick={handleConfirm}
              className={`btn btn-${config.buttonColor} px-4`}
              style={{
                borderRadius: '25px',
                background: config.bgColor,
                border: `1px solid ${config.borderColor}`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 5px 15px ${config.borderColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className={`fas fa-${type === 'question' ? 'check' : 'check'} me-2`}></i>
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Utility function for easy usage
export const showEnhancedAlert = (options) => {
  // This is a simplified version - in a real app, you might want to use a state management solution
  return new Promise((resolve) => {
    const alertContainer = document.createElement('div');
    alertContainer.id = 'enhanced-alert-container';
    document.body.appendChild(alertContainer);

    const handleClose = () => {
      document.body.removeChild(alertContainer);
    };

    // For now, just resolve immediately
    // In a real implementation, you'd need to integrate this with React properly
    resolve(true);
  });
};
