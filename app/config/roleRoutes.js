// ✅ **Role-based Default Routes Configuration**
export const roleDefaultRoutes = {
  'admin': '/admin/dashboard',
  'sales': '/sales/dashboard', 
  'owner': '/owner/dashboard',
  'warehouse': '/warehouse/dashboard'
};

// ✅ **Get default route for user role**
export const getDefaultRouteForRole = (role) => {
  return roleDefaultRoutes[role] || '/admin/dashboard';
};

// ✅ **Check if route is a dashboard route (should redirect to default)**
export const isDashboardRoute = (pathname) => {
  return pathname === '/dashboard' || pathname === '/';
};

// ✅ **Check if user should be redirected to default route**
export const shouldRedirectToDefault = (pathname, userRole) => {
  // Only redirect from specific entry points
  const entryPoints = ['/', '/dashboard', '/login'];
  return entryPoints.includes(pathname) && userRole;
};
