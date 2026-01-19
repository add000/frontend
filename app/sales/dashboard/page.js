'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';

export default function SalesDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    todaySales: 0,
    monthlySales: 0,
    totalCustomers: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    // ตรวจสอบสิทธิ์
    if (!user) {
      const currentPath = window.location.pathname;
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    if (user.role_name !== 'sales') {
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
        console.log('Fetching sales stats...');
        // ตัวอย่างข้อมูล mock
        setStats({
          todaySales: 45200,
          monthlySales: 1250000,
          totalCustomers: 89,
          pendingOrders: 7
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
          <h2 className="mb-4">Sales Dashboard</h2>
          <p className="text-muted">ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname} (Sales)</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <h5 className="card-title text-success">ยอดขายวันนี้</h5>
              <h3 className="text-success">฿{stats.todaySales.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">ยอดขายเดือนนี้</h5>
              <h3 className="text-primary">฿{stats.monthlySales.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <h5 className="card-title text-info">ลูกค้าทั้งหมด</h5>
              <h3 className="text-info">{stats.totalCustomers}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">ออเดอร์รอดำเนินการ</h5>
              <h3 className="text-warning">{stats.pendingOrders}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <h4 className="mb-3">การทำงานด่วน</h4>
          <div className="row">
            <div className="col-md-3 mb-3">
              <button className="btn btn-success btn-lg w-100" disabled>
                <i className="fas fa-plus me-2"></i>
                สร้างการขายใหม่
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-primary btn-lg w-100" disabled>
                <i className="fas fa-users me-2"></i>
                จัดการลูกค้า
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-info btn-lg w-100" disabled>
                <i className="fas fa-box me-2"></i>
                ดูสินค้า
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-warning btn-lg w-100" disabled>
                <i className="fas fa-chart-line me-2"></i>
                รายงานการขาย
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="row mt-4">
        <div className="col-12">
          <h4 className="mb-3">การขายล่าสุด</h4>
          <div className="card">
            <div className="card-body">
              <p className="text-muted">ยังไม่มีข้อมูลการขายล่าสุด</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}