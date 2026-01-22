import { NextResponse } from 'next/server';

// ✅ **Role-based Default Routes Configuration**
const roleDefaultRoutes = {
  'admin': '/admin/dashboard',
  'sales': '/sales/dashboard',
  'owner': '/owner/dashboard',
  'warehouse': '/warehouse/dashboard'
};

// ✅ **Get default route for user role**
const getDefaultRouteForRole = (role) => {
  return roleDefaultRoutes[role] || '/admin/dashboard';
};

// ✅ **Check if user should be redirected to default route**
const shouldRedirectToDefault = (pathname, userRole) => {
  // Only redirect from specific entry points (like Laravel discussion suggested)
  const entryPoints = ['/', '/dashboard'];
  // Don't redirect if user is already going to a specific dashboard
  const exemptRoutes = ['/admin/dashboard', '/owner/dashboard', '/sales/dashboard', '/warehouse/dashboard'];
  return entryPoints.includes(pathname) && userRole && !exemptRoutes.includes(pathname);
};

// ✅ **Debug function to get user from request**
const getUserFromRequest = (request) => {
  try {
    // ตรวจสอบ cookies ทั้งหมด
    console.log('=== MIDDLEWARE DEBUG ===');
    console.log('Request URL:', request.url);
    const allCookies = request.cookies.getAll();
    console.log('All cookies in request:', allCookies);
    
    // ✅ **ลองดึง user จาก cookies ก่อน**
    const userCookie = request.cookies.get('user')?.value;
    console.log('User cookie raw value:', userCookie);
    
    if (userCookie) {
      try {
        const decodedUser = decodeURIComponent(userCookie);
        const user = JSON.parse(decodedUser);
        console.log('Parsed user from cookie:', user);
        console.log('User role from cookie:', user.role_name);
        return user;
      } catch (parseError) {
        console.error('Error parsing user cookie:', parseError);
      }
    }
    
    // ✅ **ถ้าไม่มี user cookie ให้ลองดึงจาก token**
    const token = request.cookies.get('token')?.value;
    console.log('Token cookie exists:', !!token);
    
    if (!token) {
      console.log('No token found in cookies');
      return null;
    }
    
    // ✅ **สำหรับ JWT token**
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log('User from JWT payload:', payload);
        return payload;
      }
    } catch (tokenError) {
      console.error('Error parsing JWT token:', tokenError);
    }
    
    console.log('No user data found in cookies or token');
    return null;
  } catch (error) {
    console.error('Error in getUserFromRequest:', error);
    return null;
  }
};

// ✅ **Helper function to check if user has required role**
const hasRole = (user, requiredRole) => {
  if (!user || !user.role_name) {
    console.log('No user or role_name in hasRole check');
    return false;
  }
  
  console.log('Checking role:', user.role_name, 'against:', requiredRole);
  
  if (Array.isArray(requiredRole)) {
    const result = requiredRole.includes(user.role_name);
    console.log('Array check result:', result);
    return result;
  }
  
  const result = user.role_name === requiredRole;
  console.log('Single role check result:', result);
  return result;
};

// ✅ **Routes that don't require authentication**
const publicRoutes = ['/login', '/register', '/', '/unauthorized'];

// ✅ **Routes that require specific roles**
const roleBasedRoutes = {
  '/admin/dashboard': 'admin',
  '/admin/users': 'admin',
  '/admin/roles': 'admin',
  '/owner/dashboard': 'owner',
  '/sales/dashboard': 'sales',
  '/warehouse/dashboard': 'warehouse',
};

// ✅ **Admin routes (all routes under /admin)**
const adminRoutes = ['/admin'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  console.log('\n=== MIDDLEWARE EXECUTION ===');
  console.log('Pathname:', pathname);
  
  // ✅ **Skip middleware for static files and API routes**
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    console.log('Skipping middleware for:', pathname);
    return NextResponse.next();
  }

  // ✅ **Check if route is public or needs loading**
  if (publicRoutes.includes(pathname)) {
    console.log('Public route, allowing access:', pathname);
    return NextResponse.next();
  }

  // ✅ **Special handling for /profile - redirect to appropriate dashboard**
  if (pathname === '/profile') {
    const user = getUserFromRequest(request);
    if (!user) {
      console.log('No user found for profile, redirecting to login');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', encodeURIComponent('/admin/dashboard'));
      return NextResponse.redirect(loginUrl);
    }
    console.log('User authenticated for profile, redirecting to dashboard');
    const userRole = user.role_name;
    const defaultRoute = getDefaultRouteForRole(userRole);
    const dashboardUrl = new URL(defaultRoute, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // ✅ **Get user from request**
  const user = getUserFromRequest(request);
  
  // ✅ **If no user and route is not public, redirect to login**
  if (!user) {
    console.log('No user found, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    // ✅ **Encode pathname ก่อนส่งไปยัง login**
    const encodedPath = encodeURIComponent(pathname);
    loginUrl.searchParams.set('redirect', encodedPath);
    console.log('Redirecting to login with redirect=', encodedPath);
    return NextResponse.redirect(loginUrl);
  }

  console.log('User authenticated:', user.username);
  console.log('User role:', user.role_name);

  // ✅ **Role-based redirection from entry points (like Laravel discussion)**
  if (shouldRedirectToDefault(pathname, user.role_name)) {
    const defaultRoute = getDefaultRouteForRole(user.role_name);
    console.log(`Redirecting from ${pathname} to default route: ${defaultRoute}`);
    const redirectUrl = new URL(defaultRoute, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ **Check admin routes**
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute && user.role_name !== 'admin') {
    console.log('Non-admin trying to access admin route, redirecting to unauthorized');
    const unauthorizedUrl = new URL('/unauthorized', request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // ✅ **Check role-based routes**
  const requiredRole = roleBasedRoutes[pathname];
  if (requiredRole && !hasRole(user, requiredRole)) {
    console.log(`User doesn't have required role: ${requiredRole}, redirecting to unauthorized`);
    const unauthorizedUrl = new URL('/unauthorized', request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // ✅ **Add user info to headers for client-side use**
  const response = NextResponse.next();
  response.headers.set('x-user-role', user.role_name || '');
  response.headers.set('x-user-id', user.id || '');
  
  console.log('Access granted to:', pathname);
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};