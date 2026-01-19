'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UnauthorizedModal({ isOpen, onClose, message = "คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้" }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleGoHome = () => {
    handleClose();
    router.push('/dashboard');
  };

  const handleGoBack = () => {
    handleClose();
    router.back();
  };

  const handleRelogin = () => {
    handleClose();
    router.push('/login');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`modal-backdrop fade ${showModal ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1040,
          transition: 'opacity 0.3s ease',
          opacity: showModal ? 1 : 0
        }}
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div 
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) ${showModal ? 'scale(1)' : 'scale(0.9)'}`,
          transition: 'all 0.3s ease',
          zIndex: 1050,
          maxWidth: '500px',
          width: '90%'
        }}
      >
        <div className="modal-content bg-dark text-light border-0 shadow-lg" style={{
          background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          overflow: 'hidden'
        }}>
          {/* Modal Header */}
          <div className="modal-header border-0 pb-0">
            <div className="text-center w-100 mb-3">
              <div className="position-relative d-inline-block mb-3">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <div className="position-absolute top-0 end-0 bg-danger rounded-circle p-1" style={{ width: '25px', height: '25px' }}>
                  <i className="fas fa-times text-white" style={{ fontSize: '10px' }}></i>
                </div>
              </div>
              <h4 className="modal-title text-warning fw-bold mb-2">ไม่มีสิทธิ์เข้าถึง</h4>
              <div className="bg-warning bg-opacity-10 rounded-3 px-3 py-1 d-inline-block">
                <span className="text-warning small fw-semibold">Access Denied</span>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              onClick={handleClose}
              style={{ opacity: 0.8 }}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body text-center pt-0">
            <p className="text-light mb-4">{message}</p>
            <p className="text-muted small mb-4">
              กรุณาติดต่อผู้ดูแลระบบหากต้องการขอสิทธิ์ หรือกลับไปยังหน้าที่คุณมีสิทธิ์เข้าถึง
            </p>
            
            {/* Action Icons */}
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3 mb-2">
                    <i className="fas fa-home text-primary" style={{ fontSize: '1.5rem' }}></i>
                  </div>
                  <small className="text-muted">หน้าหลัก</small>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-secondary bg-opacity-10 rounded-3 p-3 mb-2">
                    <i className="fas fa-arrow-left text-secondary" style={{ fontSize: '1.5rem' }}></i>
                  </div>
                  <small className="text-muted">ย้อนกลับ</small>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-info bg-opacity-10 rounded-3 p-3 mb-2">
                    <i className="fas fa-sign-in-alt text-info" style={{ fontSize: '1.5rem' }}></i>
                  </div>
                  <small className="text-muted">เข้าสู่ระบบใหม่</small>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer border-0 justify-content-center gap-2">
            <button 
              onClick={handleGoHome}
              className="btn btn-primary px-4"
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
              onClick={handleGoBack}
              className="btn btn-secondary px-4"
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
              onClick={handleRelogin}
              className="btn btn-outline-info px-4"
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
        </div>
      </div>
    </>
  );
}
