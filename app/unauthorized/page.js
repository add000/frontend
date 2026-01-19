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
      {/* Simple fallback content for SEO/non-JS users */}
      <div className="container mt-5" style={{ display: showModal ? 'none' : 'block' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-danger">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
                </div>
                <h2 className="text-danger mb-3">ไม่มีสิทธิ์เข้าถึง</h2>
                <p className="text-muted mb-4">
                  คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบหากต้องการขอสิทธิ์
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <button onClick={() => router.push('/dashboard')} className="btn btn-primary">
                    <i className="fas fa-home me-2"></i>
                    กลับหน้าหลัก
                  </button>
                  <button onClick={() => router.back()} className="btn btn-secondary">
                    <i className="fas fa-arrow-left me-2"></i>
                    ย้อนกลับ
                  </button>
                  <button onClick={() => router.push('/login')} className="btn btn-outline-primary">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    เข้าสู่ระบบใหม่
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
