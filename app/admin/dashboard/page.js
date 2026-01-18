'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usersAPI, rolesAPI } from '@/config/api';
import { useAuth } from '@/config/auth';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRoles: 0,
    activeUsers: 0,
    inactiveUsers: 0
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
      return;
    }

    // ดึงข้อมูลสถิติ
    const fetchStats = async () => {
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
      }
    };

    fetchStats();
  }, [isAdmin]); // เปลี่ยนจาก [isAdmin, router] เป็น [isAdmin] เท่านั้น

  if (!isAdmin) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0f0f0f' }}>
        <div className="text-center">
          <div
            className="spinner-border text-info mb-3"
            role="status"
            style={{ width: '4rem', height: '4rem' }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-light">กำลังโหลดข้อมูล...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: '#0f0f0f', backgroundImage: 'url(/p/p3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-4 text-white">Admin Dashboard</h2>
          <p className="text-light">ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-primary" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="card-body text-center">
              <h5 className="card-title text-primary">ผู้ใช้ทั้งหมด</h5>
              <h3 className="text-primary">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-success" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="card-body text-center">
              <h5 className="card-title text-success">ผู้ใช้ Active</h5>
              <h3 className="text-success">{stats.activeUsers}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-warning" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="card-body text-center">
              <h5 className="card-title text-warning">ผู้ใช้ Inactive</h5>
              <h3 className="text-warning">{stats.inactiveUsers}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-info" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="card-body text-center">
              <h5 className="card-title text-info">บทบาททั้งหมด</h5>
              <h3 className="text-info">{stats.totalRoles}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="card-body">
              <h5 className="card-title text-info">การจัดการผู้ใช้</h5>
              <p className="card-text text-light">จัดการข้อมูลผู้ใช้ในระบบ</p>
              <Link href="/admin/users" className="btn btn-primary rounded-5">
                <i className="fa fa-users me-2"></i>
                จัดการผู้ใช้
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="card-body">
              <h5 className="card-title text-warning">การจัดการบทบาท</h5>
              <p className="card-text text-light">จัดการบทบาทและสิทธิ์ในระบบ</p>
              <Link href="/admin/roles" className="btn btn-warning rounded-5">
                <i className="fa fa-shield-alt me-2"></i>
                จัดการบทบาท
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row mt-4">
        <div className="col-12">
          <h4 className="mb-3 text-white">กิจกรรมล่าสุด</h4>
          <div className="card" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="card-body">
              <p className="text-light">ยังไม่มีข้อมูลกิจกรรมล่าสุด</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
