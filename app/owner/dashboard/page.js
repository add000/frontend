'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

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
    // ✅ **ตรวจสอบสิทธิ์**
    if (!user) {
      const currentPath = window.location.pathname;
      console.log('No user, redirecting to login');
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    console.log('OwnerDashboard - User:', user);
    console.log('OwnerDashboard - User role:', user.role_name);
    
    if (user.role_name !== 'owner') {
      console.log('Non-owner user, redirecting to appropriate dashboard');
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

    // ✅ **ดึงข้อมูลสถิติ**
    let isMounted = true;
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        // TODO: ดึงข้อมูลสถิติจาก API
        console.log('Fetching owner stats...');
        // ตัวอย่างข้อมูล mock
        if (!isMounted) return;
        
        setStats({
          totalRevenue: 2500000,
          monthlyRevenue: 450000,
          totalOrders: 1250,
          totalCustomers: 320
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

  // ✅ **แสดง loading ถ้ายังไม่มี user**
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
        <h2 className="mb-2">Owner Dashboard</h2>
        <p className="text-muted">
          ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname}
        </p>

        {/* -------------------- Stats Cards -------------------- */}
        <div className="row mb-4">
          <StatCard title="รายได้ทั้งหมด" value={`฿${stats.totalRevenue.toLocaleString()}`} loading={statsLoading} color="success" />
          <StatCard title="รายได้เดือนนี้" value={`฿${stats.monthlyRevenue.toLocaleString()}`} loading={statsLoading} color="primary" />
          <StatCard title="ออเดอร์ทั้งหมด" value={stats.totalOrders} loading={statsLoading} color="info" />
          <StatCard title="ลูกค้าทั้งหมด" value={stats.totalCustomers} loading={statsLoading} color="warning" />
        </div>

        {/* -------------------- Quick Actions -------------------- */}
        <h4 className="mb-3">การจัดการด่วน</h4>
        <div className="row">
          <QuickLink href="#" label="ดูรายงาน" icon="chart-bar" color="info" disabled />
          <QuickLink href="#" label="ส่งออกรายงาน" icon="download" color="success" disabled />
          <QuickLink href="#" label="ดูผู้ใช้ทั้งหมด" icon="users" color="primary" disabled />
          <QuickLink href="#" label="การตั้งค่า" icon="cog" color="warning" disabled />
        </div>

        {/* -------------------- Business Overview -------------------- */}
        <div className="mt-4">
          <h4 className="mb-3">ภาพรวมธุรกิจ</h4>
          <div className="card">
            <div className="card-body text-muted">
              ยังไม่มีข้อมูลภาพรวมธุรกิจ
            </div>
          </div>
        </div>

        {/* -------------------- News & Announcements -------------------- */}
        <div className="mt-4">
          <h4 className="mb-3">ข่าวสารและประกาศ</h4>
          <div className="card">
            <div className="card-body text-muted">
              ไม่มีข่าวสารและประกาศในขณะนี้
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
