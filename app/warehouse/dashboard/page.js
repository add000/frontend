'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingPage from '../../components/LoadingPage';
import ProfileSection from '../../components/ProfileSection';

export default function WarehouseDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    todayMovements: 0
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

    // ตรวจสอบสิทธิ์
    if (!user) {
      const currentPath = window.location.pathname;
      console.log('No user, redirecting to login');
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    console.log('WarehouseDashboard - User:', user);
    console.log('WarehouseDashboard - User role:', user.role_name);

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
            console.log('Fetching warehouse stats...');
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
          totalProducts: 150,
          lowStock: 12,
          outOfStock: 3,
          todayMovements: 25
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
            totalProducts: 0,
            lowStock: 0,
            outOfStock: 0,
            todayMovements: 0
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
        <div className="position-relative">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
            backdropFilter: 'blur(2px)'
          }}></div>
          <div className="container py-5 position-relative">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="display-4 fw-bold mb-3">
                  <span className="text-info">Warehouse</span> Dashboard
                </h1>
                <p className="lead text-muted mb-0">
                  ยินดีต้อนรับคุณ <span className="text-info fw-semibold">{user?.firstname} {user?.lastname}</span>
                </p>
                <p className="text-muted">จัดการสินค้าและควบคุมสต็อก</p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="d-inline-flex align-items-center bg-info bg-opacity-10 rounded-3 px-3 py-2">
                  <div className="bg-info rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                  <span className="text-info fw-semibold">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          {/* -------------------- Stats Cards -------------------- */}
          <div className="row g-4 mb-5">
            <StatCard 
              title="สินค้าทั้งหมด" 
              value={stats.totalProducts} 
              loading={statsLoading} 
              color="primary" 
              icon="box"
              trend="+5%"
            />
            <StatCard 
              title="สต็อกต่ำ" 
              value={stats.lowStock} 
              loading={statsLoading} 
              color="warning" 
              icon="exclamation-triangle"
              trend="+2"
            />
            <StatCard 
              title="สต็อกหมด" 
              value={stats.outOfStock} 
              loading={statsLoading} 
              color="danger" 
              icon="times-circle"
              trend="-1"
            />
            <StatCard 
              title="การเคลื่อนไหววันนี้" 
              value={stats.todayMovements} 
              loading={statsLoading} 
              color="info" 
              icon="exchange-alt"
              trend="+18%"
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
                <QuickLink href="#" label="เพิ่มสินค้าใหม่" icon="plus" color="primary" disabled />
                <QuickLink href="#" label="นำเข้าสต็อก" icon="arrow-up" color="success" disabled />
                <QuickLink href="#" label="นำออกสต็อก" icon="arrow-down" color="warning" disabled />
                <QuickLink href="#" label="ดูสต็อกทั้งหมด" icon="warehouse" color="info" disabled />
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

          {/* -------------------- Stock Alerts -------------------- */}
          <div className="row">
            <div className="col-12">
              <h2 className="h3 mb-4 text-white">
                <i className="fas fa-bell text-danger me-2"></i>
                แจ้งเตือนสต็อก
              </h2>
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg">
                <div className="card-body text-center py-5">
                  <i className="fas fa-check-circle text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mb-0">ไม่มีสินค้าที่ต้องเติมสต็อกในขณะนี้</p>
                  <small className="text-muted">สินค้าที่ใกล้หมดจะแสดงที่นี่เมื่อมีการแจ้งเตือน</small>
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