'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usersAPI, rolesAPI } from '@/config/api';
import { useAuth } from '@/config/auth';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRoles: 0,
    activeUsers: 0,
    inactiveUsers: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
      return;
    }

    // ดึงข้อมูลสถิติ
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const [usersRes, rolesRes] = await Promise.all([
          usersAPI.getAll(),
          rolesAPI.getAll()
        ]);
        
        const users = await usersRes.json();
        const roles = await rolesRes.json();
        
        setStats({
          totalUsers: users.length,
          totalRoles: roles.length,
          activeUsers: users.filter(u => u.status === 'active').length,
          inactiveUsers: users.filter(u => u.status === 'inactive').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]); // ✅ ลบ router ออกจาก dependency

  // ✅ แสดง loading ระหว่างตรวจสอบสิทธิ์
  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">กำลังตรวจสอบสิทธิ์...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <div>ไม่มีสิทธิ์เข้าถึง</div>;
  }

  return (
    <ErrorBoundary>
      <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Admin Dashboard</h2>
          <p className="text-muted">ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">ผู้ใช้ทั้งหมด</h5>
              {statsLoading ? (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <h3 className="text-primary">{stats.totalUsers}</h3>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <h5 className="card-title text-success">ผู้ใช้ Active</h5>
              {statsLoading ? (
                <div className="spinner-border spinner-border-sm text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <h3 className="text-success">{stats.activeUsers}</h3>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">ผู้ใช้ Inactive</h5>
              {statsLoading ? (
                <div className="spinner-border spinner-border-sm text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <h3 className="text-warning">{stats.inactiveUsers}</h3>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <h5 className="card-title text-info">บทบาททั้งหมด</h5>
              {statsLoading ? (
                <div className="spinner-border spinner-border-sm text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <h3 className="text-info">{stats.totalRoles}</h3>
              )}
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
              <Link href="/admin/users" className="btn btn-primary btn-lg w-100">
                <i className="fas fa-users me-2"></i>
                จัดการผู้ใช้
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link href="/admin/roles" className="btn btn-success btn-lg w-100">
                <i className="fas fa-user-shield me-2"></i>
                จัดการบทบาท
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link href="/admin/roles/1/permissions" className="btn btn-warning btn-lg w-100">
                <i className="fas fa-key me-2"></i>
                จัดการสิทธิ์
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-info btn-lg w-100" disabled>
                <i className="fas fa-chart-bar me-2"></i>
                รายงาน (เร็วๆ นี้)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row mt-4">
        <div className="col-12">
          <h4 className="mb-3">กิจกรรมล่าสุด</h4>
          <div className="card">
            <div className="card-body">
              <p className="text-muted">ยังไม่มีข้อมูลกิจกรรมล่าสุด</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </ErrorBoundary>
  );
}
