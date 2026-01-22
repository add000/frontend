// Authentication and Permission utilities
import { createContext, useContext, useState, useEffect } from 'react';

// Auth context
const AuthContext = createContext();

// Helper functions
const getUserFromToken = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    // ✅ **Try localStorage first (primary source after login)**
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      console.log('AuthProvider - Found user in localStorage:', user);
      return user;
    }
    
    // ✅ **Fallback to JWT token parsing**
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('AuthProvider - No token found in localStorage');
      return null;
    }
    
    console.log('AuthProvider - Parsing JWT token:', token);
    
    // แยกข้อมูลจาก JWT token (ไม่ต้อง verify ใน production)
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('AuthProvider - Invalid JWT format');
      return null;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    console.log('AuthProvider - Parsed JWT payload:', payload);
    return payload;
  } catch (error) {
    console.error('AuthProvider - Error parsing token/user:', error);
    // Clear corrupted data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    const initAuth = async () => {
      try {
        console.log('AuthProvider - Initializing auth...');
        const userData = getUserFromToken();
        if (userData) {
          console.log('AuthProvider - Setting user:', userData);
          setUser(userData);
          
          // ดึงข้อมูลสิทธิ์ถ้าไม่ใช่ admin (admin มีสิทธิ์ทั้งหมด)
          if (!isAdmin(userData)) {
            console.log('AuthProvider - Fetching permissions for user:', userData.id);
            const userPermissions = await getUserPermissions(userData.id);
            setPermissions(userPermissions);
          } else {
            console.log('AuthProvider - User is admin, skipping permission fetch');
          }
        } else {
          console.log('AuthProvider - No user data found');
        }
      } catch (error) {
        console.error('AuthProvider - Auth initialization failed:', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();

    // ✅ **Listen for storage changes (cross-tab sync)**
    const handleStorageChange = (e) => {
      console.log('AuthProvider - Storage changed:', e.key);
      if (e.key === 'user' || e.key === 'token') {
        console.log('AuthProvider - User data changed, re-initializing...');
        setInitialized(false); // Reset to allow re-initialization
        setTimeout(initAuth, 100); // Small delay to ensure storage is updated
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Remove initialized dependency to allow re-initialization

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
