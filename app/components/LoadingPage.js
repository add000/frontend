'use client';

export default function LoadingPage({ message = "กำลังโหลด..." }) {
  return (
    <div className="min-vh-100 bg-dark text-light d-flex flex-column justify-content-center align-items-center">
      {/* Background Animation */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(239, 68, 68, 0.1) 100%)',
          animation: 'gradient 8s ease infinite'
        }}></div>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
      </div>

      {/* Loading Content */}
      <div className="position-relative z-10 text-center">
        {/* Main Spinner */}
        <div className="mb-4">
          <div 
            className="spinner-border text-primary" 
            role="status"
            style={{ 
              width: '4rem', 
              height: '4rem',
              borderWidth: '0.3em'
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-4">
          <h2 className="fw-bold text-white mb-2">{message}</h2>
          <p className="text-muted mb-0">กรุณารอสักครู่</p>
        </div>

        {/* Loading Dots */}
        <div className="d-flex justify-content-center gap-2 mb-4">
          <div 
            className="bg-primary rounded-circle" 
            style={{ 
              width: '12px', 
              height: '12px',
              animation: 'bounce 1.4s ease-in-out infinite both'
            }}
          ></div>
          <div 
            className="bg-success rounded-circle" 
            style={{ 
              width: '12px', 
              height: '12px',
              animation: 'bounce 1.4s ease-in-out infinite both',
              animationDelay: '0.2s'
            }}
          ></div>
          <div 
            className="bg-warning rounded-circle" 
            style={{ 
              width: '12px', 
              height: '12px',
              animation: 'bounce 1.4s ease-in-out infinite both',
              animationDelay: '0.4s'
            }}
          ></div>
        </div>

        {/* Progress Bar */}
        <div className="w-100" style={{ maxWidth: '300px' }}>
          <div className="bg-dark bg-opacity-50 rounded-pill p-1">
            <div 
              className="bg-gradient bg-primary rounded-pill h-2 position-relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ef4444 100%)',
                animation: 'progress 2s ease-in-out infinite'
              }}
            >
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-20" style={{
                animation: 'shimmer 1.5s ease-in-out infinite'
              }}></div>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="mt-4">
          <small className="text-muted">
            <i className="fas fa-shield-alt me-2"></i>
            ระบบกำลังประมวลผล...
          </small>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
