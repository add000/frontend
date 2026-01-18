'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/config/auth';

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
    if (!user || user.role_name !== 'sales') {
      router.replace('/login');
      return;
    }

    // TODO: ดึงข้อมูลสถิติจาก API
    // const fetchStats = async () => { ... };
  }, []); // ใช้ [] แทน [user, router]

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
