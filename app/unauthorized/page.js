'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UnauthorizedModal from '../components/UnauthorizedModal';

export default function Unauthorized() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    // Redirect to dashboard after modal closes
    setTimeout(() => {
      router.push('/dashboard');
    }, 300);
  };

  return (
    <>
      {/* Full Screen Unauthorized Page - Matching LoadingPage Style */}
      <div className="min-vh-100 bg-dark text-light d-flex flex-column justify-content-center align-items-center" style={{ display: showModal ? 'none' : 'flex' }}>
        {/* Background Animation - Same as LoadingPage */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(251, 146, 60, 0.1) 50%, rgba(245, 158, 11, 0.1) 100%)',
            animation: 'gradient 8s ease infinite'
          }}></div>
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
        </div>

        {/* Unauthorized Content */}
        <div className="position-relative z-10 text-center">
          {/* Warning Icon */}
          <div className="mb-4">
            <div className="position-relative d-inline-block">
              <div 
                className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: '120px', height: '120px' }}
              >
                <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
              </div>
              <div 
                className="position-absolute top-0 end-0 bg-danger rounded-circle p-2" 
                style={{ width: '40px', height: '40px' }}
              >
                <i className="fas fa-times text-white" style={{ fontSize: '16px' }}></i>
              </div>
            </div>
          </div>

          {/* Unauthorized Text */}
          <div className="mb-4">
            <h1 className="fw-bold text-warning mb-3">ไม่มีสิทธิ์เข้าถึง</h1>
            <p className="text-light mb-0">คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้</p>
            <p className="text-muted">กรุณาติดต่อผู้ดูแลระบบหากต้องการขอสิทธิ์</p>
          </div>

          {/* Warning Dots - Similar to Loading Dots */}
          <div className="d-flex justify-content-center gap-2 mb-4">
            <div 
              className="bg-warning rounded-circle" 
              style={{ 
                width: '12px', 
                height: '12px',
                animation: 'bounce 1.4s ease-in-out infinite both'
              }}
            ></div>
            <div 
              className="bg-danger rounded-circle" 
              style={{ 
                width: '12px', 
                height: '12px',
                animation: 'bounce 1.4s ease-in-out infinite both',
                animationDelay: '0.2s'
              }}
            ></div>
            <div 
              className="bg-secondary rounded-circle" 
              style={{ 
                width: '12px', 
                height: '12px',
                animation: 'bounce 1.4s ease-in-out infinite both',
                animationDelay: '0.4s'
              }}
            ></div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button 
              onClick={() => router.push('/dashboard')}
              className="btn btn-primary px-4 py-2"
              style={{
                borderRadius: '25px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className="fas fa-home me-2"></i>
              กลับหน้าหลัก
            </button>
            
            <button 
              onClick={() => router.back()}
              className="btn btn-secondary px-4 py-2"
              style={{
                borderRadius: '25px',
                background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.2) 0%, rgba(75, 85, 99, 0.2) 100%)',
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
              <i className="fas fa-arrow-left me-2"></i>
              ย้อนกลับ
            </button>
            
            <button 
              onClick={() => router.push('/login')}
              className="btn btn-outline-info px-4 py-2"
              style={{
                borderRadius: '25px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(6, 182, 212, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className="fas fa-sign-in-alt me-2"></i>
              เข้าสู่ระบบใหม่
            </button>
          </div>

          {/* Status Text */}
          <div className="mt-4">
            <small className="text-muted">
              <i className="fas fa-shield-alt me-2"></i>
              การเข้าถึงถูกปฏิเสธโดยระบบ
            </small>
          </div>
        </div>

        {/* Custom Styles - Same as LoadingPage */}
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
        `}</style>
      </div>

      {/* Modal */}
      <UnauthorizedModal 
        isOpen={showModal}
        onClose={handleCloseModal}
        message="คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบหากต้องการขอสิทธิ์"
      />
    </>
  );
}
