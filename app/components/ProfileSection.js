'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';

export default function ProfileSection() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('/login');
  };

  return (
    <div className="row g-4">
      {/* -------------------- User Info Card -------------------- */}
      <div className="col-lg-4">
        <div className="card bg-dark bg-opacity-50 border-0 shadow-lg h-100">
          <div className="card-body text-center">
            <div className="mb-4">
              <div className="position-relative d-inline-block">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                  <i className="fas fa-user text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1" style={{ width: '30px', height: '30px' }}>
                  <i className="fas fa-check text-white" style={{ fontSize: '12px' }}></i>
                </div>
              </div>
            </div>
            <h4 className="text-white mb-2">{user?.firstname} {user?.lastname}</h4>
            <p className="text-muted mb-3">@{user?.username}</p>
            <div className="badge bg-primary bg-opacity-20 text-primary mb-4 px-3 py-2">
              <i className="fas fa-shield-alt me-2"></i>
              {user?.role_name}
            </div>
            
            <div className="text-start">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-info bg-opacity-10 rounded-2 p-2 me-3">
                  <i className="fas fa-envelope text-info"></i>
                </div>
                <div>
                  <small className="text-muted d-block">อีเมล</small>
                  <span className="text-white">{user?.email || 'N/A'}</span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 rounded-2 p-2 me-3">
                  <i className="fas fa-phone text-success"></i>
                </div>
                <div>
                  <small className="text-muted d-block">เบอร์โทร</small>
                  <span className="text-white">{user?.phone || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Actions Card -------------------- */}
      <div className="col-lg-8">
        <div className="card bg-dark bg-opacity-50 border-0 shadow-lg h-100">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 className="text-white mb-0">
                <i className="fas fa-th-large text-warning me-2"></i>
                การจัดการ
              </h3>
              <div className="bg-warning bg-opacity-10 rounded-2 px-3 py-1">
                <span className="text-warning small fw-semibold">Quick Actions</span>
              </div>
            </div>
            
            <div className="row g-3">
              {/* Admin Users - แสดงเฉพาะ admin */}
              {user?.role_name === 'admin' && (
                <div className="col-md-6">
                  <a 
                    href="/admin/users"
                    className="btn btn-outline-light w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4 position-relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="position-absolute top-0 end-0 w-20 h-20 bg-success bg-opacity-5 rounded-circle" style={{ marginTop: '-40px', marginRight: '-40px' }}></div>
                    <i className="fas fa-users mb-2" style={{ fontSize: '2rem' }}></i>
                    <span className="fw-semibold">จัดการผู้ใช้</span>
                    <small className="text-white-50">จัดการข้อมูลผู้ใช้ทั้งหมด</small>
                  </a>
                </div>
              )}

              {/* Edit Profile */}
              <div className="col-md-6">
                <button className="btn btn-outline-light w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4 position-relative overflow-hidden" disabled
                  style={{
                    background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
                    border: '1px solid rgba(251, 146, 60, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="position-absolute top-0 end-0 w-20 h-20 bg-warning bg-opacity-5 rounded-circle" style={{ marginTop: '-40px', marginRight: '-40px' }}></div>
                  <i className="fas fa-user-edit mb-2" style={{ fontSize: '2rem' }}></i>
                  <span className="fw-semibold">แก้ไขโปรไฟล์</span>
                  <small className="text-white-50">เร็ว ๆ นี้</small>
                </button>
              </div>

              {/* Settings */}
              <div className="col-md-6">
                <button className="btn btn-outline-light w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4 position-relative overflow-hidden" disabled
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="position-absolute top-0 end-0 w-20 h-20 bg-purple bg-opacity-5 rounded-circle" style={{ marginTop: '-40px', marginRight: '-40px' }}></div>
                  <i className="fas fa-cog mb-2" style={{ fontSize: '2rem' }}></i>
                  <span className="fw-semibold">ตั้งค่า</span>
                  <small className="text-white-50">เร็ว ๆ นี้</small>
                </button>
              </div>

              {/* Logout */}
              <div className="col-md-6">
                <button 
                  onClick={handleLogout}
                  className="btn btn-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4 position-relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(239, 68, 68, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="position-absolute top-0 end-0 w-20 h-20 bg-danger bg-opacity-5 rounded-circle" style={{ marginTop: '-40px', marginRight: '-40px' }}></div>
                  <i className="fas fa-sign-out-alt mb-2" style={{ fontSize: '2rem' }}></i>
                  <span className="fw-semibold">ออกจากระบบ</span>
                  <small className="text-white-50">ออกจากระบบ</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
