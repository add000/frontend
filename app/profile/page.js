'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';
import { getDefaultRouteForRole } from '@/config/roleRoutes';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingPage from '../components/LoadingPage';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ✅ **ตรวจสอบสิทธิ์**
    if (!user) {
      const currentPath = window.location.pathname;
      console.log('No user, redirecting to login');
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    console.log('ProfilePage - User:', user);
    console.log('ProfilePage - User role:', user.role_name);
  }, [user, router]);

  // ✅ **แสดง loading ถ้ายังไม่มี user**
  if (!user) {
    return <LoadingPage message="กำลังตรวจสอบสิทธิ์..." />;
  }

  const dashboardRoute = getDefaultRouteForRole(user.role_name);

  const handleGoToDashboard = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.replace(dashboardRoute);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('/login');
  };

  /* -------------------- UI -------------------- */
  return (
    <ErrorBoundary>
      <div className="min-vh-100 bg-dark text-light">
        {/* Hero Section */}
        <div className="position-relative">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
            backdropFilter: 'blur(2px)'
          }}></div>
          <div className="container py-5 position-relative">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="display-4 fw-bold mb-3">
                  <span className="text-primary">Profile</span>
                </h1>
                <p className="lead text-muted mb-0">
                  ยินดีต้อนรับคุณ <span className="text-info fw-semibold">{user?.firstname} {user?.lastname}</span>
                </p>
                <p className="text-muted">จัดการข้อมูลส่วนตัวและเข้าถึงแดชบอร์ดของคุณ</p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="d-inline-flex align-items-center bg-success bg-opacity-10 rounded-3 px-3 py-2">
                  <div className="bg-success rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                  <span className="text-success fw-semibold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row g-4">
            {/* -------------------- User Info Card -------------------- */}
            <div className="col-lg-4">
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg">
                <div className="card-body text-center">
                  <div className="mb-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                      <i className="fas fa-user text-primary" style={{ fontSize: '3rem' }}></i>
                    </div>
                  </div>
                  <h4 className="text-white mb-1">{user?.firstname} {user?.lastname}</h4>
                  <p className="text-muted mb-2">@{user?.username}</p>
                  <div className="badge bg-primary bg-opacity-10 text-primary mb-3">
                    <i className="fas fa-shield-alt me-1"></i>
                    {user?.role_name}
                  </div>
                  <div className="text-muted small">
                    <i className="fas fa-envelope me-2"></i>
                    {user?.email || 'N/A'}
                  </div>
                  <div className="text-muted small">
                    <i className="fas fa-phone me-2"></i>
                    {user?.phone || 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------- Actions Card -------------------- */}
            <div className="col-lg-8">
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg h-100">
                <div className="card-body">
                  <h3 className="text-white mb-4">
                    <i className="fas fa-th-large text-warning me-2"></i>
                    การจัดการ
                  </h3>
                  
                  <div className="row g-3">
                    {/* Dashboard Access */}
                    <div className="col-md-6">
                      <button 
                        onClick={handleGoToDashboard}
                        disabled={isLoading}
                        className="btn btn-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4"
                      >
                        {isLoading ? (
                          <div className="spinner-border spinner-border-sm text-light mb-2"></div>
                        ) : (
                          <i className="fas fa-tachometer-alt mb-2" style={{ fontSize: '2rem' }}></i>
                        )}
                        <span className="fw-semibold">Dashboard</span>
                        <small className="text-white-50">เข้าถึงแดชบอร์ดของคุณ</small>
                      </button>
                    </div>

                    {/* Edit Profile */}
                    <div className="col-md-6">
                      <button className="btn btn-outline-light w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4" disabled>
                        <i className="fas fa-user-edit mb-2" style={{ fontSize: '2rem' }}></i>
                        <span className="fw-semibold">แก้ไขโปรไฟล์</span>
                        <small className="text-white-50">เร็ว ๆ นี้</small>
                      </button>
                    </div>

                    {/* Settings */}
                    <div className="col-md-6">
                      <button className="btn btn-outline-light w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4" disabled>
                        <i className="fas fa-cog mb-2" style={{ fontSize: '2rem' }}></i>
                        <span className="fw-semibold">ตั้งค่า</span>
                        <small className="text-white-50">เร็ว ๆ นี้</small>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="col-md-6">
                      <button 
                        onClick={handleLogout}
                        className="btn btn-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4"
                      >
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

          {/* -------------------- Quick Stats -------------------- */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg">
                <div className="card-body">
                  <h4 className="text-white mb-3">
                    <i className="fas fa-info-circle text-info me-2"></i>
                    ข้อมูลการเข้าถึง
                  </h4>
                  <div className="row text-center">
                    <div className="col-md-3">
                      <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                        <i className="fas fa-tachometer-alt text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                        <h6 className="text-white">Dashboard</h6>
                        <p className="text-muted small mb-0">จัดการข้อมูลหลัก</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="bg-success bg-opacity-10 rounded-3 p-3">
                        <i className="fas fa-chart-line text-success mb-2" style={{ fontSize: '1.5rem' }}></i>
                        <h6 className="text-white">รายงาน</h6>
                        <p className="text-muted small mb-0">ดูสถิติและข้อมูล</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                        <i className="fas fa-bell text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                        <h6 className="text-white">การแจ้งเตือน</h6>
                        <p className="text-muted small mb-0">ข้อมูลล่าสุด</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="bg-info bg-opacity-10 rounded-3 p-3">
                        <i className="fas fa-history text-info mb-2" style={{ fontSize: '1.5rem' }}></i>
                        <h6 className="text-white">ประวัติ</h6>
                        <p className="text-muted small mb-0">กิจกรรมล่าสุด</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
