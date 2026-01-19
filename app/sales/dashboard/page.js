'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

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
    // ตรวจสอบสิทธิ์
    if (!user) {
      const currentPath = window.location.pathname;
      console.log('No user, redirecting to login');
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    console.log('SalesDashboard - User:', user);
    console.log('SalesDashboard - User role:', user.role_name);
    
    if (user.role_name !== 'sales') {
      console.log('Non-sales user, redirecting to home page');
      router.replace('/');
      return;
    }

    // ดึงข้อมูลสถิติ
    let isMounted = true;
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        // TODO: ดึงข้อมูลสถิติจาก API
        console.log('Fetching sales stats...');
        // ตัวอย่างข้อมูล mock
        if (!isMounted) return;
        
        setStats({
          todaySales: 45200,
          monthlySales: 1250000,
          totalCustomers: 89,
          pendingOrders: 7
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
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
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">กำลังโหลด...</span>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <ErrorBoundary>
      <div className="min-vh-100 bg-dark text-light">
        {/* Hero Section */}
        <div className="position-relative">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
            backdropFilter: 'blur(2px)'
          }}></div>
          <div className="container py-5 position-relative">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="display-4 fw-bold mb-3">
                  <span className="text-warning">Sales</span> Dashboard
                </h1>
                <p className="lead text-muted mb-0">
                  ยินดีต้อนรับคุณ <span className="text-info fw-semibold">{user?.firstname} {user?.lastname}</span>
                </p>
                <p className="text-muted">จัดการการขายและดูสถิติยอดขาย</p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="d-inline-flex align-items-center bg-warning bg-opacity-10 rounded-3 px-3 py-2">
                  <div className="bg-warning rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                  <span className="text-warning fw-semibold">Online</span>
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
              <h2 className="h3 mb-4 text-white">
                <i className="fas fa-bolt text-warning me-2"></i>
                การทำงานด่วน
              </h2>
              <div className="row g-3">
                <QuickLink href="#" label="สร้างการขายใหม่" icon="plus" color="success" disabled />
                <QuickLink href="#" label="จัดการลูกค้า" icon="users" color="primary" disabled />
                <QuickLink href="#" label="ดูสินค้า" icon="box" color="info" disabled />
                <QuickLink href="#" label="รายงานการขาย" icon="chart-line" color="warning" disabled />
              </div>
            </div>
          </div>

          {/* -------------------- Recent Sales -------------------- */}
          <div className="row">
            <div className="col-12">
              <h2 className="h3 mb-4 text-white">
                <i className="fas fa-shopping-cart text-success me-2"></i>
                การขายล่าสุด
              </h2>
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg">
                <div className="card-body text-center py-5">
                  <i className="fas fa-receipt text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mb-0">ยังไม่มีข้อมูลการขายล่าสุด</p>
                  <small className="text-muted">การขายจะแสดงที่นี่เมื่อมีการทำรายการ</small>
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