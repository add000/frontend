import { NextResponse } from 'next/server';

// Helper function to get user from token and cookies
const getUserFromRequest = (request) => {
  try {
    // ลองดึง user จาก cookies ก่อน (ข้อมูล user ที่เก็บไว้ตอน login)
    const userCookie = request.cookies.get('user')?.value;
    if (userCookie) {
      return JSON.parse(userCookie);
    }
    
    // ถ้าไม่มีใน cookie ลองดึงจาก token
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    
    // สำหรับ JWT token (ถ้าใช้ JWT)
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        return payload;
      }
    } catch (tokenError) {
      console.error('Error parsing token:', tokenError);
      return null;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Helper function to check if user has required role
const hasRole = (user, requiredRole) => {
  if (!user || !user.role_name) return false;
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role_name);
  }
  return user.role_name === requiredRole;
};

// Routes that don't require authentication
const publicRoutes = ['/login', '/register', '/', '/unauthorized'];

// Routes that require specific roles
const roleBasedRoutes = {
  '/admin/dashboard': 'admin',
  '/admin/users': 'admin',
  '/admin/roles': 'admin',
  '/owner/dashboard': 'owner',
  '/sales/dashboard': 'sales',
  '/warehouse/dashboard': 'warehouse',
};

// Admin routes (all routes under /admin)
const adminRoutes = ['/admin'];

// Dashboard routes that need auth
const dashboardRoutes = ['/admin/dashboard', '/owner/dashboard', '/sales/dashboard', '/warehouse/dashboard'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get user from request
  const user = getUserFromRequest(request);
  
  // If no user and route is not public, redirect to login
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute && user.role_name !== 'admin') {
    const unauthorizedUrl = new URL('/unauthorized', request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Check role-based routes
  const requiredRole = roleBasedRoutes[pathname];
  if (requiredRole && !hasRole(user, requiredRole)) {
    const unauthorizedUrl = new URL('/unauthorized', request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Add user info to headers for client-side use
  const response = NextResponse.next();
  response.headers.set('x-user-role', user.role_name || '');
  response.headers.set('x-user-id', user.id || '');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};