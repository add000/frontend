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
    
    // ✅ **Check if user should be redirected to their dashboard instead**
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get('redirect');
    
    if (!redirectParam) {
      // If no specific redirect, check if user should go to their dashboard instead
      const defaultRoute = getDefaultRouteForRole(user.role_name);
      console.log('No redirect parameter, checking if should redirect to dashboard:', defaultRoute);
      
      // Only redirect if user came from login or general paths
      const referrer = document.referrer;
      const shouldRedirectToDashboard = !referrer || referrer.includes('/login') || referrer.includes('/dashboard') || referrer.includes('/');
      
      if (shouldRedirectToDashboard && defaultRoute !== '/profile') {
        console.log('Redirecting to role-specific dashboard:', defaultRoute);
        router.replace(defaultRoute);
        return;
      }
    }
  }, [user, router]);

  // ✅ **แสดง loading ถ้ายังไม่มี user**
  if (!user) {
    return <LoadingPage message="กำลังตรวจสอบสิทธิ์..." />;
  }

  const dashboardRoute = getDefaultRouteForRole(user.role_name);

  const handleGoToDashboard = () => {
    setIsLoading(true);
    
    // Get user role and determine appropriate dashboard
    const userRole = user?.role_name;
    let dashboardPath = '/dashboard'; // default fallback
    
    // Role-based dashboard routing (referencing Laravel permission patterns)
    switch (userRole) {
      case 'admin':
        dashboardPath = '/admin/dashboard';
        break;
      case 'owner':
        dashboardPath = '/owner/dashboard';
        break;
      case 'sales':
        dashboardPath = '/sales/dashboard';
        break;
      case 'warehouse':
        dashboardPath = '/warehouse/dashboard';
        break;
      default:
        dashboardPath = '/dashboard';
    }
    
    // Show loading feedback
    console.log(`Redirecting ${userRole} to: ${dashboardPath}`);
    
    setTimeout(() => {
      // Navigate to role-specific dashboard
      router.replace(dashboardPath);
      
      // Add page reload after navigation to ensure fresh data
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 800); // Slightly longer delay for better UX
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
        <div className="position-relative overflow-hidden">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
            backdropFilter: 'blur(3px)'
          }}></div>
          
          {/* Animated Background Elements */}
          <div className="position-absolute top-0 start-0 w-100 h-100">
            <div className="position-absolute top-10 start-10 w-20 h-20 bg-primary bg-opacity-5 rounded-circle animate-pulse"></div>
            <div className="position-absolute top-20 end-10 w-32 h-32 bg-purple bg-opacity-5 rounded-circle animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="position-absolute bottom-10 start-1/3 w-24 h-24 bg-info bg-opacity-5 rounded-circle animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="container py-5 position-relative">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="mb-3">
                  <span className="badge bg-primary bg-opacity-20 text-primary px-3 py-2 rounded-pill">
                    <i className="fas fa-user-circle me-2"></i>โปรไฟล์ผู้ใช้
                  </span>
                </div>
                <h1 className="display-3 fw-bold mb-4">
                  <span className="text-primary">Profile</span>
                  <span className="text-white"> Dashboard</span>
                </h1>
                <p className="lead text-light mb-3">
                  ยินดีต้อนรับคุณ <span className="text-info fw-semibold">{user?.firstname} {user?.lastname}</span>
                </p>
                <p className="text-light opacity-75 mb-4">จัดการข้อมูลส่วนตัวและเข้าถึงแดชบอร์ดของคุณ</p>
                
                {/* Quick Stats */}
                <div className="row g-3 mb-4">
                  <div className="col-auto">
                    <div className="bg-success bg-opacity-10 rounded-3 px-3 py-2 d-flex align-items-center gap-2">
                      <div className="bg-success rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                      <span className="text-success fw-semibold">Verified</span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="bg-primary bg-opacity-10 rounded-3 px-3 py-2">
                      <span className="text-primary fw-semibold">
                        <i className="fas fa-shield-alt me-2"></i>{user?.role_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="position-relative">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '150px', height: '150px' }}>
                    <i className="fas fa-user text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                    <i className="fas fa-check text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
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
                    {/* Dashboard Access */}
                    <div className="col-md-6">
                      <button 
                        onClick={handleGoToDashboard}
                        disabled={isLoading}
                        className="btn btn-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none p-4 position-relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div className="position-absolute top-0 end-0 w-20 h-20 bg-primary bg-opacity-5 rounded-circle" style={{ marginTop: '-40px', marginRight: '-40px' }}></div>
                        {isLoading ? (
                          <>
                            <div className="spinner-border spinner-border-sm text-light mb-2"></div>
                            <span className="fw-semibold">กำลังไปยังแดชบอร์ด...</span>
                            <small className="text-white-50">กรุณารอสักครู่</small>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-tachometer-alt mb-2" style={{ fontSize: '2rem' }}></i>
                            <span className="fw-semibold">Dashboard</span>
                            <small className="text-white-50">{user?.role_name === 'admin' ? 'แดชบอร์ดผู้ดูแลระบบ' : 
                              user?.role_name === 'owner' ? 'แดชบอร์ดเจ้าของ' :
                              user?.role_name === 'sales' ? 'แดชบอร์ดการขาย' :
                              user?.role_name === 'warehouse' ? 'แดชบอร์ดคลังสินค้า' :
                              'เข้าถึงแดชบอร์ดของคุณ'}</small>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Admin Users - แสดงเฉพาะ admin */}
                    {user?.role_name === 'admin' && (
                      <div className="col-md-6">
                        <Link 
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
                        </Link>
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
