'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

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
    // ตรวจสอบสิทธิ์
    if (!user) {
      const currentPath = window.location.pathname;
      console.log('No user, redirecting to login');
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    console.log('WarehouseDashboard - User:', user);
    console.log('WarehouseDashboard - User role:', user.role_name);
    
    if (user.role_name !== 'warehouse') {
      console.log('Non-warehouse user, redirecting to appropriate dashboard');
      const roleRoutes = {
        'admin': '/admin/dashboard',
        'sales': '/sales/dashboard',
        'owner': '/owner/dashboard',
        'warehouse': '/warehouse/dashboard'
      };
      
      const targetRoute = roleRoutes[user.role_name] || '/';
      console.log('Redirecting to:', targetRoute);
      router.replace(targetRoute);
      return;
    }

    // ดึงข้อมูลสถิติ
    let isMounted = true;
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        // TODO: ดึงข้อมูลสถิติจาก API
        console.log('Fetching warehouse stats...');
        // ตัวอย่างข้อมูล mock
        if (!isMounted) return;
        
        setStats({
          totalProducts: 150,
          lowStock: 12,
          outOfStock: 3,
          todayMovements: 25
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
      <div className="container mt-4">
        <h2 className="mb-2">Warehouse Dashboard</h2>
        <p className="text-muted">
          ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname}
        </p>

        {/* -------------------- Stats Cards -------------------- */}
        <div className="row mb-4">
          <StatCard title="สินค้าทั้งหมด" value={stats.totalProducts} loading={statsLoading} color="primary" />
          <StatCard title="สต็อกต่ำ" value={stats.lowStock} loading={statsLoading} color="warning" />
          <StatCard title="สต็อกหมด" value={stats.outOfStock} loading={statsLoading} color="danger" />
          <StatCard title="การเคลื่อนไหววันนี้" value={stats.todayMovements} loading={statsLoading} color="info" />
        </div>

        {/* -------------------- Quick Actions -------------------- */}
        <h4 className="mb-3">การจัดการด่วน</h4>
        <div className="row">
          <QuickLink href="#" label="เพิ่มสินค้าใหม่" icon="plus" color="primary" disabled />
          <QuickLink href="#" label="นำเข้าสต็อก" icon="arrow-up" color="success" disabled />
          <QuickLink href="#" label="นำออกสต็อก" icon="arrow-down" color="warning" disabled />
          <QuickLink href="#" label="ดูสต็อกทั้งหมด" icon="warehouse" color="info" disabled />
        </div>

        {/* -------------------- Stock Alerts -------------------- */}
        <div className="mt-4">
          <h4 className="mb-3">แจ้งเตือนสต็อก</h4>
          <div className="card">
            <div className="card-body text-muted">
              ไม่มีสินค้าที่ต้องเติมสต็อกในขณะนี้
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

/* ====================== Components ====================== */
function StatCard({ title, value, loading, color }) {
  return (
    <div className="col-md-3 mb-3">
      <div className={`card border-${color}`}>
        <div className="card-body text-center">
          <h5 className={`text-${color}`}>{title}</h5>
          {loading ? (
            <div className={`spinner-border spinner-border-sm text-${color}`} />
          ) : (
            <h3 className={`text-${color}`}>{value}</h3>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickLink({ href, label, icon, color, disabled = false }) {
  return (
    <div className="col-md-3 mb-3">
      {disabled ? (
        <button className={`btn btn-${color} btn-lg w-100`} disabled>
          <i className={`fas fa-${icon} me-2`} />
          {label}
        </button>
      ) : (
        <a href={href} className={`btn btn-${color} btn-lg w-100`}>
          <i className={`fas fa-${icon} me-2`} />
          {label}
        </a>
      )}
    </div>
  );
}