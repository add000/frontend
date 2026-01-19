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
      console.log('Non-sales user, redirecting to appropriate dashboard');
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
      <div className="container mt-4">
        <h2 className="mb-2">Sales Dashboard</h2>
        <p className="text-muted">
          ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname}
        </p>

        {/* -------------------- Stats Cards -------------------- */}
        <div className="row mb-4">
          <StatCard title="ยอดขายวันนี้" value={`฿${stats.todaySales.toLocaleString()}`} loading={statsLoading} color="success" />
          <StatCard title="ยอดขายเดือนนี้" value={`฿${stats.monthlySales.toLocaleString()}`} loading={statsLoading} color="primary" />
          <StatCard title="ลูกค้าทั้งหมด" value={stats.totalCustomers} loading={statsLoading} color="info" />
          <StatCard title="ออเดอร์รอดำเนินการ" value={stats.pendingOrders} loading={statsLoading} color="warning" />
        </div>

        {/* -------------------- Quick Actions -------------------- */}
        <h4 className="mb-3">การทำงานด่วน</h4>
        <div className="row">
          <QuickLink href="#" label="สร้างการขายใหม่" icon="plus" color="success" disabled />
          <QuickLink href="#" label="จัดการลูกค้า" icon="users" color="primary" disabled />
          <QuickLink href="#" label="ดูสินค้า" icon="box" color="info" disabled />
          <QuickLink href="#" label="รายงานการขาย" icon="chart-line" color="warning" disabled />
        </div>

        {/* -------------------- Recent Sales -------------------- */}
        <div className="mt-4">
          <h4 className="mb-3">การขายล่าสุด</h4>
          <div className="card">
            <div className="card-body text-muted">
              ยังไม่มีข้อมูลการขายล่าสุด
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