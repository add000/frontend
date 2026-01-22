// ✅ **Role-based Default Routes Configuration**
export const roleDefaultRoutes = {
  'admin': '/admin/dashboard',
  'sales': '/sales/dashboard', 
  'owner': '/owner/dashboard',
  'warehouse': '/warehouse/dashboard'
};

// ✅ **Get default route for user role**
export const getDefaultRouteForRole = (role) => {
  // Add timeout for route resolution
  const routeTimeout = setTimeout(() => {
    console.warn('Route resolution timeout - using default');
    return '/admin/dashboard';
  }, 2000); // 2 second timeout for route resolution

  try {
    const route = roleDefaultRoutes[role] || '/admin/dashboard';
    clearTimeout(routeTimeout);
    return route;
  } catch (error) {
    console.error('Error in getDefaultRouteForRole:', error);
    clearTimeout(routeTimeout);
    return '/admin/dashboard';
  }
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
