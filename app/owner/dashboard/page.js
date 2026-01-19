'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';

export default function OwnerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    // ตรวจสอบสิทธิ์
    if (!user) {
      const currentPath = window.location.pathname;
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    if (user.role_name !== 'owner') {
      const roleRoutes = {
        'admin': '/admin/dashboard',
        'sales': '/sales/dashboard',
        'owner': '/owner/dashboard',
        'warehouse': '/warehouse/dashboard'
      };
      
      const targetRoute = roleRoutes[user.role_name] || '/';
      router.replace(targetRoute);
      return;
    }

    // ดึงข้อมูลสถิติจาก API
    const fetchStats = async () => {
      try {
        // TODO: ดึงข้อมูลสถิติจาก API
        console.log('Fetching owner stats...');
        // ตัวอย่างข้อมูล mock
        setStats({
          totalRevenue: 12500000,
          monthlyRevenue: 2500000,
          totalOrders: 1560,
          totalCustomers: 450
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
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

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Owner Dashboard</h2>
          <p className="text-muted">ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname} (Owner)</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <h5 className="card-title text-success">รายได้ทั้งหมด</h5>
              <h3 className="text-success">฿{stats.totalRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">รายได้เดือนนี้</h5>
              <h3 className="text-primary">฿{stats.monthlyRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <h5 className="card-title text-info">ออเดอร์ทั้งหมด</h5>
              <h3 className="text-info">{stats.totalOrders}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">ลูกค้าทั้งหมด</h5>
              <h3 className="text-warning">{stats.totalCustomers}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <h4 className="mb-3">การจัดการด่วน</h4>
          <div className="row">
            <div className="col-md-3 mb-3">
              <button className="btn btn-info btn-lg w-100" disabled>
                <i className="fas fa-chart-bar me-2"></i>
                ดูรายงาน
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-success btn-lg w-100" disabled>
                <i className="fas fa-download me-2"></i>
                ส่งออกรายงาน
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-primary btn-lg w-100" disabled>
                <i className="fas fa-users me-2"></i>
                ดูผู้ใช้ทั้งหมด
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-warning btn-lg w-100" disabled>
                <i className="fas fa-cog me-2"></i>
                การตั้งค่า
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Overview */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h4 className="mb-3">ภาพรวมธุรกิจ</h4>
          <div className="card">
            <div className="card-body">
              <p className="text-muted">ยังไม่มีข้อมูลภาพรวมธุรกิจ</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4 className="mb-3">ข่าวสารและประกาศ</h4>
          <div className="card">
            <div className="card-body">
              <p className="text-muted">ไม่มีข่าวสารและประกาศในขณะนี้</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}