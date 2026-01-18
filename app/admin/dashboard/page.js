'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usersAPI, rolesAPI } from '@/config/api';
import { useAuth } from '@/config/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function AdminDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRoles: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });

  const [statsLoading, setStatsLoading] = useState(false);

  /* -------------------- Fetch Dashboard Stats -------------------- */
  useEffect(() => {
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
  }, []);

  /* -------------------- UI -------------------- */
  return (
    <ErrorBoundary>
      <div className="container mt-4">
        <h2 className="mb-2">Admin Dashboard</h2>
        <p className="text-muted">
          ยินดีต้อนรับคุณ {user?.firstname} {user?.lastname}
        </p>

        {/* -------------------- Stats Cards -------------------- */}
        <div className="row mb-4">
          <StatCard title="ผู้ใช้ทั้งหมด" value={stats.totalUsers} loading={statsLoading} color="primary" />
          <StatCard title="ผู้ใช้ Active" value={stats.activeUsers} loading={statsLoading} color="success" />
          <StatCard title="ผู้ใช้ Inactive" value={stats.inactiveUsers} loading={statsLoading} color="warning" />
          <StatCard title="บทบาททั้งหมด" value={stats.totalRoles} loading={statsLoading} color="info" />
        </div>

        {/* -------------------- Quick Actions -------------------- */}
        <h4 className="mb-3">การจัดการด่วน</h4>
        <div className="row">
          <QuickLink href="/admin/users" label="จัดการผู้ใช้" icon="users" color="primary" />
          <QuickLink href="/admin/roles" label="จัดการบทบาท" icon="user-shield" color="success" />
          <QuickLink href="/admin/roles/1/permissions" label="จัดการสิทธิ์" icon="key" color="warning" />
          <div className="col-md-3 mb-3">
            <button className="btn btn-info btn-lg w-100" disabled>
              <i className="fas fa-chart-bar me-2" />
              รายงาน (เร็ว ๆ นี้)
            </button>
          </div>
        </div>

        {/* -------------------- Recent Activity -------------------- */}
        <div className="mt-4">
          <h4 className="mb-3">กิจกรรมล่าสุด</h4>
          <div className="card">
            <div className="card-body text-muted">
              ยังไม่มีข้อมูลกิจกรรมล่าสุด
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

function QuickLink({ href, label, icon, color }) {
  return (
    <div className="col-md-3 mb-3">
      <Link href={href} className={`btn btn-${color} btn-lg w-100`}>
        <i className={`fas fa-${icon} me-2`} />
        {label}
      </Link>
    </div>
  );
}
