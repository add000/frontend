'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/auth';

export function AuthGuard({ children, requiredRole = null, fallbackPath = '/login' }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Wait for auth to complete
    if (loading) return;

    let access = false;
    
    // Check if user exists
    if (!user) {
      router.replace(fallbackPath);
      return;
    }

    // Check role requirements
    if (requiredRole === 'admin') {
      access = isAdmin;
    } else if (requiredRole && user.role_name !== requiredRole) {
      access = false;
    } else {
      access = true;
    }

    if (!access) {
      router.replace(fallbackPath);
      return;
    }

    setHasAccess(access);
    setIsChecking(false);
  }, [loading, user, isAdmin, requiredRole, router, fallbackPath]);

  // Show loading only during initial check
  if (loading || isChecking) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2 text-muted">กำลังตรวจสอบสิทธิ์...</p>
      </div>
    );
  }

  // Don't render anything if redirecting
  if (!hasAccess) {
    return null;
  }

  return children;
}

export function AdminGuard({ children }) {
  return <AuthGuard requiredRole="admin">{children}</AuthGuard>;
}

export function RoleGuard({ role, children }) {
  return <AuthGuard requiredRole={role}>{children}</AuthGuard>;
}
