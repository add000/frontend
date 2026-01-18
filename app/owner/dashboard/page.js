'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/config/auth';
import { RoleGuard } from '../../components/AuthGuard';

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    // TODO: ดึงข้อมูลสถิติจาก API
    // const fetchStats = async () => { ... };
  }, []);

  return (
    <RoleGuard role="owner">
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
    </RoleGuard>
  );
}
