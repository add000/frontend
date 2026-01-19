'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/AuthProvider';

export default function WarehouseDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    todayMovements: 0
  });

  useEffect(() => {
    // ตรวจสอบสิทธิ์
    if (!user) {
      // ถ้าไม่มี user ให้ redirect ไป login พร้อมเก็บ path ปัจจุบัน
      const currentPath = window.location.pathname;
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    if (user.role_name !== 'warehouse') {
      // ถ้าบทบาทไม่ตรง ให้ redirect ไป dashboard ตามบทบาท
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
        console.log('Fetching warehouse stats...');
        // ตัวอย่างข้อมูล mock
        setStats({
          totalProducts: 150,
          lowStock: 12,
          outOfStock: 3,
          todayMovements: 25
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, [user, router]); // ต้องมี user และ router เป็น dependency

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
          <h2 className="mb-4">Warehouse Dashboard</h2>
          <p className="text-muted">ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname} (Warehouse)</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">สินค้าทั้งหมด</h5>
              <h3 className="text-primary">{stats.totalProducts}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">สต็อกต่ำ</h5>
              <h3 className="text-warning">{stats.lowStock}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-danger">
            <div className="card-body text-center">
              <h5 className="card-title text-danger">สต็อกหมด</h5>
              <h3 className="text-danger">{stats.outOfStock}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <h5 className="card-title text-info">การเคลื่อนไหววันนี้</h5>
              <h3 className="text-info">{stats.todayMovements}</h3>
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
              <button className="btn btn-primary btn-lg w-100" disabled>
                <i className="fas fa-plus me-2"></i>
                เพิ่มสินค้าใหม่
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-success btn-lg w-100" disabled>
                <i className="fas fa-arrow-up me-2"></i>
                นำเข้าสต็อก
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-warning btn-lg w-100" disabled>
                <i className="fas fa-arrow-down me-2"></i>
                นำออกสต็อก
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-info btn-lg w-100" disabled>
                <i className="fas fa-warehouse me-2"></i>
                ดูสต็อกทั้งหมด
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="row mt-4">
        <div className="col-12">
          <h4 className="mb-3">แจ้งเตือนสต็อก</h4>
          <div className="card">
            <div className="card-body">
              <p className="text-muted">ไม่มีสินค้าที่ต้องเติมสต็อกในขณะนี้</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}