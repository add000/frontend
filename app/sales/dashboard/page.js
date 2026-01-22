'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingPage from '../../components/LoadingPage';
import ProfileSection from '../../components/ProfileSection';

export default function SalesDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    todaySales: 0,
    monthlySales: 0,
    totalCustomers: 0,
    pendingOrders: 0
  });
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    // ตรวจสอบสิทธิ์พร้อม timeout
    const authCheckTimeout = setTimeout(() => {
      if (!user) {
        console.log('Authentication check timeout - redirecting to login');
        router.replace('/login');
      }
    }, 30000); // 30 second timeout for auth check

    if (!user) {
      const currentPath = window.location.pathname;
      console.log('No user, redirecting to login');
      
      // Add timeout for redirect
      const redirectTimeout = setTimeout(() => {
        console.log('Redirect timeout - forcing navigation');
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }, 5000); // 5 second timeout for redirect
      
      try {
        router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
        clearTimeout(redirectTimeout); // Clear timeout if redirect succeeds
      } catch (error) {
        console.error('Router redirect failed:', error);
        // Timeout will handle fallback
      }
      return;
    }
    
    console.log('SalesDashboard - User:', user);
    console.log('SalesDashboard - User role:', user.role_name);

    // Clear timeout if user is found
    clearTimeout(authCheckTimeout);

    // ดึงข้อมูลสถิติ
    let isMounted = true;
    const fetchStats = async () => {
      setStatsLoading(true);
      
      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('การโหลดข้อมูลหมดเวลา (1 นาที)'));
        }, 60000); // 1 minute timeout
      });

      try {
        // Race between actual fetch and timeout
        await Promise.race([
          // TODO: ดึงข้อมูลสถิติจาก API
          new Promise(resolve => {
            console.log('Fetching sales stats...');
            // ตัวอย่างข้อมูล mock
            setTimeout(() => {
              if (!isMounted) return;
              resolve();
            }, 1000); // Simulate 1 second API call
          }),
          timeoutPromise
        ]);
        
        if (!isMounted) return;
        
        setStats({
          todaySales: 45200,
          monthlySales: 1250000,
          totalCustomers: 89,
          pendingOrders: 7
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        
        // Handle timeout error specifically
        if (err.message.includes('หมดเวลา')) {
          // Show error notification
          if (typeof window !== 'undefined' && window.Swal) {
            window.Swal.fire({
              icon: 'error',
              title: 'หมดเวลาการโหลดข้อมูล',
              text: 'ไม่สามารถโหลดข้อมูลสถิติได้ภายใน 1 นาที กรุณาลองใหม่',
              confirmButtonColor: '#374151',
              background: '#1f1f1f',
              color: '#fff',
            });
          }
          
          // Set error state or show fallback data
          setStats({
            todaySales: 0,
            monthlySales: 0,
            totalCustomers: 0,
            pendingOrders: 0
          });
        }
      } finally {
        if (isMounted) setStatsLoading(false);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [user, router]);

  // แสดง loading ถ้ายังไม่มี user
  if (!user) {
    return <LoadingPage message="กำลังตรวจสอบสิทธิ์..." />;
  }

  /* -------------------- UI -------------------- */
  return (
    <ErrorBoundary>
      <div className="min-vh-100 bg-dark text-light">
        {/* Hero Section */}
        <div className="position-relative overflow-hidden">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
            backdropFilter: 'blur(3px)'
          }}></div>
          
          {/* Animated Background Elements */}
          <div className="position-absolute top-0 start-0 w-100 h-100">
            <div className="position-absolute top-10 start-10 w-20 h-20 bg-warning bg-opacity-5 rounded-circle animate-pulse"></div>
            <div className="position-absolute top-20 end-10 w-32 h-32 bg-success bg-opacity-5 rounded-circle animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="position-absolute bottom-10 start-1/3 w-24 h-24 bg-info bg-opacity-5 rounded-circle animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="container py-5 position-relative">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="mb-3">
                  <span className="badge bg-warning bg-opacity-20 text-warning px-3 py-2 rounded-pill">
                    <i className="fas fa-chart-line me-2"></i>Sales Dashboard
                  </span>
                </div>
                <h1 className="display-3 fw-bold mb-4">
                  <span className="text-warning">Sales</span>
                  <span className="text-white"> Dashboard</span>
                </h1>
                <p className="lead text-light mb-3">
                  ยินดีต้อนรับคุณ <span className="text-info fw-semibold">{user?.firstname} {user?.lastname}</span>
                </p>
                <p className="text-light opacity-75 mb-4">จัดการการขายและดูสถิติยอดขาย</p>
                
                {/* Quick Stats */}
                <div className="row g-3 mb-4">
                  <div className="col-auto">
                    <div className="bg-warning bg-opacity-10 rounded-3 px-3 py-2 d-flex align-items-center gap-2">
                      <div className="bg-warning rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                      <span className="text-warning fw-semibold">Online</span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="bg-success bg-opacity-10 rounded-3 px-3 py-2">
                      <span className="text-success fw-semibold">
                        <i className="fas fa-shopping-cart me-2"></i>Sales Team
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="position-relative">
                  <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '150px', height: '150px' }}>
                    <i className="fas fa-chart-line text-warning" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                    <i className="fas fa-arrow-up text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          {/* -------------------- Stats Cards -------------------- */}
          <div className="row g-4 mb-5">
            <StatCard 
              title="ยอดขายวันนี้" 
              value={`฿${stats.todaySales.toLocaleString()}`} 
              loading={statsLoading} 
              color="success" 
              icon="chart-line"
              trend="+15%"
            />
            <StatCard 
              title="ยอดขายเดือนนี้" 
              value={`฿${stats.monthlySales.toLocaleString()}`} 
              loading={statsLoading} 
              color="primary" 
              icon="calendar-alt"
              trend="+22%"
            />
            <StatCard 
              title="ลูกค้าทั้งหมด" 
              value={stats.totalCustomers} 
              loading={statsLoading} 
              color="info" 
              icon="users"
              trend="+8%"
            />
            <StatCard 
              title="ออเดอร์รอดำเนินการ" 
              value={stats.pendingOrders} 
              loading={statsLoading} 
              color="warning" 
              icon="clock"
              trend="+3"
            />
          </div>

          {/* -------------------- Quick Actions -------------------- */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="h3 mb-0 text-white">
                  <i className="fas fa-bolt text-warning me-2"></i>
                  การทำงานด่วน
                </h2>
                <div className="bg-warning bg-opacity-10 rounded-2 px-3 py-1">
                  <span className="text-warning small fw-semibold">Quick Actions</span>
                </div>
              </div>
              <div className="row g-3">
                <QuickLink href="#" label="สร้างการขายใหม่" icon="plus" color="success" disabled />
                <QuickLink href="#" label="จัดการลูกค้า" icon="users" color="primary" disabled />
                <QuickLink href="#" label="ดูสินค้า" icon="box" color="info" disabled />
                <QuickLink href="#" label="รายงานการขาย" icon="chart-line" color="warning" disabled />
              </div>
            </div>
          </div>

          {/* -------------------- Profile Section -------------------- */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="h3 mb-4 text-white">
                <i className="fas fa-user-circle text-info me-2"></i>
                ข้อมูลผู้ใช้
              </h2>
              <ProfileSection />
            </div>
          </div>

          {/* -------------------- Recent Sales -------------------- */}
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="h3 mb-0 text-white">
                  <i className="fas fa-shopping-cart text-success me-2"></i>
                  การขายล่าสุด
                </h2>
                <div className="bg-success bg-opacity-10 rounded-2 px-3 py-1">
                  <span className="text-success small fw-semibold">Recent Activity</span>
                </div>
              </div>
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg">
                <div className="card-body text-center py-5">
                  <div className="position-relative d-inline-block mb-4">
                    <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                      <i className="fas fa-receipt text-success" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <div className="position-absolute top-0 end-0 bg-warning rounded-circle p-1" style={{ width: '30px', height: '30px' }}>
                      <i className="fas fa-clock text-white" style={{ fontSize: '12px' }}></i>
                    </div>
                  </div>
                  <h5 className="text-white mb-3">ยังไม่มีข้อมูลการขายล่าสุด</h5>
                  <p className="text-muted mb-0">การขายจะแสดงที่นี่เมื่อมีการทำรายการ</p>
                  <small className="text-muted">เริ่มต้นสร้างการขายใหม่เพื่อดูข้อมูลในส่วนนี้</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

/* ====================== Components ====================== */
function StatCard({ title, value, loading, color, icon, trend }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className={`card bg-dark bg-opacity-50 border-0 shadow-lg h-100 position-relative overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, rgba(var(--bs-${color}-rgb), 0.1) 0%, rgba(var(--bs-${color}-rgb), 0.05) 100%)`,
          border: `1px solid rgba(var(--bs-${color}-rgb), 0.2)`,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = `0 10px 25px rgba(var(--bs-${color}-rgb), 0.2)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="position-absolute top-0 end-0 w-20 h-20 bg-opacity-5 rounded-circle" 
          style={{ 
            marginTop: '-40px', 
            marginRight: '-40px',
            backgroundColor: `rgba(var(--bs-${color}-rgb), 0.1)`
          }}>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className={`bg-${color} bg-opacity-10 rounded-3 p-3`}>
              <i className={`fas fa-${icon} text-${color} fs-4`}></i>
            </div>
            {trend && (
              <span className={`badge bg-${trend.startsWith('+') ? 'success' : trend.startsWith('-') ? 'danger' : 'secondary'} bg-opacity-10 text-${trend.startsWith('+') ? 'success' : trend.startsWith('-') ? 'danger' : 'secondary'} px-2 py-1`}>
                <i className={`fas fa-arrow-${trend.startsWith('+') ? 'up' : trend.startsWith('-') ? 'down' : 'right'} me-1`}></i>
                {trend}
              </span>
            )}
          </div>
          <h5 className="text-muted mb-2">{title}</h5>
          {loading ? (
            <div className="spinner-border spinner-border-sm text-{color} me-2"></div>
          ) : (
            <h2 className={`text-${color} fw-bold mb-0`}>{value.toLocaleString()}</h2>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickLink({ href, label, icon, color, disabled = false }) {
  return (
    <div className="col-md-6 col-lg-3">
      {disabled ? (
        <button className="btn btn-dark bg-opacity-50 border-0 shadow-lg w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none position-relative overflow-hidden" disabled
          style={{
            background: `linear-gradient(135deg, rgba(var(--bs-${color}-rgb), 0.1) 0%, rgba(var(--bs-${color}-rgb), 0.05) 100%)`,
            border: `1px solid rgba(var(--bs-${color}-rgb), 0.2)`,
            transition: 'all 0.3s ease'
          }}
        >
          <div className="position-absolute top-0 end-0 w-20 h-20 bg-opacity-5 rounded-circle" 
            style={{ 
              marginTop: '-40px', 
              marginRight: '-40px',
              backgroundColor: `rgba(var(--bs-${color}-rgb), 0.1)`
            }}>
          </div>
          <div className={`bg-${color} bg-opacity-10 rounded-4 p-3 mb-2`}>
            <i className={`fas fa-${icon} text-${color} fs-3`}></i>
          </div>
          <span className="text-white fw-semibold">{label}</span>
          <small className="text-muted">เร็ว ๆ นี้</small>
        </button>
      ) : (
        <a href={href} className="btn btn-dark bg-opacity-50 border-0 shadow-lg w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none position-relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(var(--bs-${color}-rgb), 0.1) 0%, rgba(var(--bs-${color}-rgb), 0.05) 100%)`,
            border: `1px solid rgba(var(--bs-${color}-rgb), 0.2)`,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 10px 25px rgba(var(--bs-${color}-rgb), 0.2)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div className="position-absolute top-0 end-0 w-20 h-20 bg-opacity-5 rounded-circle" 
            style={{ 
              marginTop: '-40px', 
              marginRight: '-40px',
              backgroundColor: `rgba(var(--bs-${color}-rgb), 0.1)`
            }}>
          </div>
          <div className={`bg-${color} bg-opacity-10 rounded-4 p-3 mb-2`}>
            <i className={`fas fa-${icon} text-${color} fs-3`}></i>
          </div>
          <span className="text-white fw-semibold">{label}</span>
          <small className="text-muted">เข้าถึงได้</small>
        </a>
      )}
    </div>
  );
}