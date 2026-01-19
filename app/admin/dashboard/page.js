'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usersAPI, rolesAPI } from '@/config/api';
import { useAuth } from '@/config/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingPage from '../../components/LoadingPage';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRoles: 0,
    activeUsers: 0,
    inactiveUsers: 0,
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
    
    console.log('AdminDashboard - User:', user);
    console.log('AdminDashboard - User role:', user.role_name);

    // ✅ **ดึงข้อมูลสถิติ**
    let isMounted = true;
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const [usersRes, rolesRes] = await Promise.all([
          usersAPI.getAll(),
          rolesAPI.getAll(),
        ]);

        const users = await usersRes.json();
        const roles = await rolesRes.json();

        if (!isMounted) return;

        setStats({
          totalUsers: users.length,
          totalRoles: roles.length,
          activeUsers: users.filter(u => u.status === 'active').length,
          inactiveUsers: users.filter(u => u.status === 'inactive').length,
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
    return <LoadingPage message="กำลังตรวจสอบสิทธิ์..." />;
  }

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
                  <span className="text-primary">Admin</span> Dashboard
                </h1>
                <p className="lead text-muted mb-0">
                  ยินดีต้อนรับคุณ <span className="text-info fw-semibold">{user?.firstname} {user?.lastname}</span>
                </p>
                <p className="text-muted">จัดการระบบและดูภาพรวมของธุรกิจ</p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="d-inline-flex align-items-center bg-primary bg-opacity-10 rounded-3 px-3 py-2">
                  <div className="bg-primary rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                  <span className="text-primary fw-semibold">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          {/* -------------------- Stats Cards -------------------- */}
          <div className="row g-4 mb-5">
            <StatCard 
              title="ผู้ใช้ทั้งหมด" 
              value={stats.totalUsers} 
              loading={statsLoading} 
              color="primary" 
              icon="users"
              trend="+12%"
            />
            <StatCard 
              title="ผู้ใช้ Active" 
              value={stats.activeUsers} 
              loading={statsLoading} 
              color="success" 
              icon="user-check"
              trend="+8%"
            />
            <StatCard 
              title="ผู้ใช้ Inactive" 
              value={stats.inactiveUsers} 
              loading={statsLoading} 
              color="warning" 
              icon="user-times"
              trend="-3%"
            />
            <StatCard 
              title="บทบาททั้งหมด" 
              value={stats.totalRoles} 
              loading={statsLoading} 
              color="info" 
              icon="user-shield"
              trend="+2"
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
                <QuickLink href="/admin/users" label="จัดการผู้ใช้" icon="users" color="primary" />
                <QuickLink href="/admin/roles" label="จัดการบทบาท" icon="user-shield" color="success" />
                <QuickLink href="/admin/roles/1/permissions" label="จัดการสิทธิ์" icon="key" color="warning" />
                <QuickLink href="#" label="รายงาน" icon="chart-bar" color="info" disabled />
              </div>
            </div>
          </div>

          {/* -------------------- Recent Activity -------------------- */}
          <div className="row">
            <div className="col-12">
              <h2 className="h3 mb-4 text-white">
                <i className="fas fa-clock text-info me-2"></i>
                กิจกรรมล่าสุด
              </h2>
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg">
                <div className="card-body text-center py-5">
                  <i className="fas fa-history text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mb-0">ยังไม่มีข้อมูลกิจกรรมล่าสุด</p>
                  <small className="text-muted">กิจกรรมจะแสดงที่นี่เมื่อมีการใช้งานระบบ</small>
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