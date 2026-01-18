// Authentication and Permission utilities
import { useState, useEffect } from 'react';

// ดึงข้อมูลผู้ใช้จาก token
export const getUserFromToken = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // แยกข้อมูลจาก JWT token (ไม่ต้อง verify ใน production)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

// ตรวจสอบว่าผู้ใช้มีบทบาทที่กำหนดหรือไม่
export const hasRole = (userRole, requiredRole) => {
  if (!userRole) return false;
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
};

// ตรวจสอบว่าเป็น admin หรือไม่
export const isAdmin = (user) => {
  return hasRole(user?.role_name, 'admin');
};

// ตรวจสอบสิทธิ์เฉพาะ (frontend version)
export const hasPermission = (userPermissions, resource, action) => {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  
  return userPermissions.some(permission => 
    permission.resource === resource && permission.action === action
  );
};

// ตรวจสอบสิทธิ์หลายรายการ
export const hasAnyPermission = (userPermissions, permissions) => {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  
  return permissions.some(({ resource, action }) => 
    hasPermission(userPermissions, resource, action)
  );
};

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

// Hook สำหรับใช้ใน React components
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return; // ✅ ป้องกันการทำงานซ้ำ
    
    const initAuth = async () => {
      try {
        const userData = getUserFromToken();
        if (userData) {
          setUser(userData);
          
          // ดึงข้อมูลสิทธิ์ถ้าไม่ใช่ admin (admin มีสิทธิ์ทั้งหมด)
          if (!isAdmin(userData)) {
            const userPermissions = await getUserPermissions(userData.id);
            setPermissions(userPermissions);
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, [initialized]);

  const checkPermission = (resource, action) => {
    if (!user) return false;
    if (isAdmin(user)) return true;
    return hasPermission(permissions, resource, action);
  };

  const checkAnyPermission = (perms) => {
    if (!user) return false;
    if (isAdmin(user)) return true;
    return hasAnyPermission(permissions, perms);
  };

  return {
    user,
    permissions,
    loading,
    isAdmin: isAdmin(user),
    checkPermission,
    checkAnyPermission
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
