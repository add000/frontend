// Authentication and Permission utilities
import { createContext, useContext, useState, useEffect } from 'react';

// Auth context
const AuthContext = createContext();

// Helper functions
const getUserFromToken = () => {
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

const hasRole = (userRole, requiredRole) => {
  if (!userRole) return false;
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
};

const isAdmin = (user) => {
  return hasRole(user?.role_name, 'admin');
};

const hasPermission = (userPermissions, resource, action) => {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  
  return userPermissions.some(permission => 
    permission.resource === resource && permission.action === action
  );
};

const hasAnyPermission = (userPermissions, permissions) => {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  
  return permissions.some(({ resource, action }) => 
    hasPermission(userPermissions, resource, action)
  );
};

// Export helper functions
export { getUserFromToken, hasRole, isAdmin, hasPermission, hasAnyPermission };

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const getUserPermissions = async (userId) => {
    // Add timeout for permission fetching
    const permissionTimeout = setTimeout(() => {
      console.warn('Permission fetch timeout - returning empty permissions');
      return [];
    }, 5000); // 5 second timeout for permission fetch

    try {
      const { apiFetch } = await import('./api');
      const response = await Promise.race([
        apiFetch(`/api/users/${userId}/permissions`),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('การดึงข้อมูลสิทธิ์หมดเวลา (5 วินาที)')), 5000);
        })
      ]);
      
      clearTimeout(permissionTimeout);
      return await response.json();
    } catch (error) {
      console.error('Error fetching user permissions:', error);
      clearTimeout(permissionTimeout);
      return [];
    }
  };

  useEffect(() => {
    if (initialized) return; // ป้องกันการทำงานซ้ำ
    
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
    return permissions.some(permission => 
      permission.resource === resource && permission.action === action
    );
  };

  const checkAnyPermission = (perms) => {
    if (!user) return false;
    if (isAdmin(user)) return true;
    return perms.some(({ resource, action }) => 
      checkPermission(resource, action)
    );
  };

  const value = {
    user,
    permissions,
    loading,
    isAdmin: isAdmin(user),
    checkPermission,
    checkAnyPermission,
    setUser,
    setPermissions
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook สำหรับใช้ใน React components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
