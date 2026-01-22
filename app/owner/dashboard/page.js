'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingPage from '../../components/LoadingPage';
import ProfileSection from '../../components/ProfileSection';

export default function OwnerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0
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

    // ✅ **ตรวจสอบสิทธิ์**
    if (!user) {
      const currentPath = window.location.pathname;
      console.log('No user, redirecting to login');
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    console.log('OwnerDashboard - User:', user);
    console.log('OwnerDashboard - User role:', user.role_name);

    // Clear timeout if user is found
    clearTimeout(authCheckTimeout);

    // ✅ **ดึงข้อมูลสถิติ**
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
            console.log('Fetching owner stats...');
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
          totalRevenue: 2500000,
          monthlyRevenue: 450000,
          totalOrders: 1250,
          totalCustomers: 320
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
            totalRevenue: 0,
            monthlyRevenue: 0,
            totalOrders: 0,
            totalCustomers: 0
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

  // ✅ **แสดง loading ถ้ายังไม่มี user**
  if (!user) {
    return <LoadingPage message="กำลังตรวจสอบสิทธิ์..." />;
  }

  /* -------------------- UI -------------------- */
  return (
    <ErrorBoundary>
      <div className="min-vh-100 bg-dark text-light">
        {/* Hero Section */}
        <div className="position-relative">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            backdropFilter: 'blur(2px)'
          }}></div>
          <div className="container py-5 position-relative">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="display-4 fw-bold mb-3">
                  <span className="text-success">Owner</span> Dashboard
                </h1>
                <p className="lead text-muted mb-0">
                  ยินดีต้อนรับคุณ <span className="text-info fw-semibold">{user?.firstname} {user?.lastname}</span>
                </p>
                <p className="text-muted">ดูภาพรวมธุรกิจและจัดการระบบ</p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="d-inline-flex align-items-center bg-success bg-opacity-10 rounded-3 px-3 py-2">
                  <div className="bg-success rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                  <span className="text-success fw-semibold">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          {/* -------------------- Stats Cards -------------------- */}
          <div className="row g-4 mb-5">
            <StatCard 
              title="รายได้ทั้งหมด" 
              value={`฿${stats.totalRevenue.toLocaleString()}`} 
              loading={statsLoading} 
              color="success" 
              icon="chart-line"
              trend="+18%"
            />
            <StatCard 
              title="รายได้เดือนนี้" 
              value={`฿${stats.monthlyRevenue.toLocaleString()}`} 
              loading={statsLoading} 
              color="primary" 
              icon="calendar-alt"
              trend="+12%"
            />
            <StatCard 
              title="ออเดอร์ทั้งหมด" 
              value={stats.totalOrders} 
              loading={statsLoading} 
              color="info" 
              icon="shopping-cart"
              trend="+25"
            />
            <StatCard 
              title="ลูกค้าทั้งหมด" 
              value={stats.totalCustomers} 
              loading={statsLoading} 
              color="warning" 
              icon="users"
              trend="+8%"
            />
          </div>

          {/* -------------------- Quick Actions -------------------- */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="h3 mb-4 text-white">
                <i className="fas fa-bolt text-warning me-2"></i>
                การจัดการด่วน
              </h2>
              <div className="row g-3">
                <QuickLink href="#" label="ดูรายงาน" icon="chart-bar" color="info" disabled />
                <QuickLink href="#" label="ส่งออกรายงาน" icon="download" color="success" disabled />
                <QuickLink href="#" label="ดูผู้ใช้ทั้งหมด" icon="users" color="primary" disabled />
                <QuickLink href="#" label="การตั้งค่า" icon="cog" color="warning" disabled />
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

          {/* -------------------- Business Overview -------------------- */}
          <div className="row mb-5">
            <div className="col-lg-6">
              <h2 className="h3 mb-4 text-white">
                <i className="fas fa-chart-pie text-primary me-2"></i>
                ภาพรวมธุรกิจ
              </h2>
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg">
                <div className="card-body text-center py-5">
                  <i className="fas fa-chart-line text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mb-0">ยังไม่มีข้อมูลภาพรวมธุรกิจ</p>
                  <small className="text-muted">ข้อมูลจะแสดงที่นี่เมื่อมีการใช้งานระบบ</small>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="h3 mb-4 text-white">
                <i className="fas fa-newspaper text-info me-2"></i>
                ข่าวสารและประกาศ
              </h2>
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg">
                <div className="card-body text-center py-5">
                  <i className="fas fa-bullhorn text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mb-0">ไม่มีข่าวสารและประกาศในขณะนี้</p>
                  <small className="text-muted">ประกาศจะแสดงที่นี่เมื่อมีการอัพเดท</small>
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
      <div className={`card bg-dark bg-opacity-50 border-0 shadow-lg h-100`}>
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
        <button className="btn btn-dark bg-opacity-50 border-0 shadow-lg w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none" disabled>
          <div className={`bg-${color} bg-opacity-10 rounded-4 p-3 mb-2`}>
            <i className={`fas fa-${icon} text-${color} fs-3`}></i>
          </div>
          <span className="text-white fw-semibold">{label}</span>
          <small className="text-muted">เร็ว ๆ นี้</small>
        </button>
      ) : (
        <a href={href} className="btn btn-dark bg-opacity-50 border-0 shadow-lg w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none">
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
