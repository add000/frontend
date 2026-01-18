// Authentication and Permission utilities
// Re-export utilities from AuthProvider for backward compatibility
export { 
  getUserFromToken, 
  hasRole, 
  isAdmin, 
  hasPermission, 
  hasAnyPermission,
  useAuth 
} from './AuthProvider';

// ดึงข้อมูลสิทธิ์ของผู้ใช้จาก API
export const getUserPermissions = async (userId) => {
  try {
    const { apiFetch } = await import('./api');
    const response = await apiFetch(`/api/users/${userId}/permissions`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return [];
  }
};

// ตรวจสอบสิทธิ์และ redirect หากไม่มีสิทธิ์
export const requirePermission = (resource, action) => {
  return async (context) => {
    const user = getUserFromToken();
    
    if (!user) {
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return false;
    }
    
    // Admin มีสิทธิ์ทั้งหมด
    if (isAdmin(user)) {
      return true;
    }
    
    // ตรวจสอบสิทธิ์จาก API (หรือจาก cache ถ้ามี)
    try {
      const permissions = await getUserPermissions(user.id);
      if (!hasPermission(permissions, resource, action)) {
        // Redirect to unauthorized page
        if (typeof window !== 'undefined') {
          window.location.href = '/unauthorized';
        }
        return false;
      }
      return true;
    } catch (error) {
      console.error('Permission check failed:', error);
      return false;
    }
  };
};

// ตรวจสอบว่าเป็น admin และ redirect หากไม่ใช่
export const requireAdmin = () => {
  return () => {
    const user = getUserFromToken();
    
    if (!user || !isAdmin(user)) {
      if (typeof window !== 'undefined') {
        window.location.href = '/unauthorized';
      }
      return false;
    }
    
    return true;
  };
};


// Component สำหรับป้องกันการเข้าถึง (HOC)
export const withPermission = (WrappedComponent, resource, action) => {
  return (props) => {
    const { user, loading, checkPermission } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user || !checkPermission(resource, action)) {
      return (
        <div className="container text-center mt-5">
          <h3>ไม่มีสิทธิ์เข้าถึง</h3>
          <p>คุณไม่มีสิทธิ์ในการ {action} ทรัพยากร {resource}</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

// Component สำหรับ admin เท่านั้น
export const withAdmin = (WrappedComponent) => {
  return (props) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user || !isAdmin) {
      return (
        <div className="container text-center mt-5">
          <h3>ไม่มีสิทธิ์เข้าถึง</h3>
          <p>ต้องการสิทธิ์ผู้ดูแลระบบ</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
