// Auto-refresh system for dashboard redirect errors
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAutoRefresh = (maxRetries = 3, retryDelay = 2000) => {
  const router = useRouter();
  const [retryCount, setRetryCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshAndRedirect = (fallbackRoute = '/dashboard') => {
    if (retryCount >= maxRetries) {
      console.log('Max retries reached, redirecting to fallback route');
      router.replace(fallbackRoute);
      return;
    }

    setIsRefreshing(true);
    setRetryCount(prev => prev + 1);

    // Clear any problematic data
    localStorage.removeItem('redirect_error');
    sessionStorage.removeItem('redirect_attempt');

    setTimeout(() => {
      window.location.reload();
    }, retryDelay);
  };

  const resetRetryCount = () => {
    setRetryCount(0);
    setIsRefreshing(false);
  };

  // Monitor for navigation errors
  useEffect(() => {
    const handleNavigationError = (event) => {
      console.error('Navigation error detected:', event);
      handleRefreshAndRedirect();
    };

    // Listen for navigation errors
    window.addEventListener('error', handleNavigationError);
    window.addEventListener('unhandledrejection', handleNavigationError);

    return () => {
      window.removeEventListener('error', handleNavigationError);
      window.removeEventListener('unhandledrejection', handleNavigationError);
    };
  }, []);

  return {
    retryCount,
    isRefreshing,
    handleRefreshAndRedirect,
    resetRetryCount
  };
};

// Error boundary component for catching render errors
export const NavigationErrorBoundary = ({ children, fallbackRoute = '/dashboard' }) => {
  const { handleRefreshAndRedirect } = useAutoRefresh();

  const handleError = (error, errorInfo) => {
    console.error('Navigation error boundary caught:', error, errorInfo);
    
    // Check if it's a navigation-related error
    if (error.message?.includes('Navigation') || 
        error.message?.includes('Route') || 
        error.message?.includes('redirect')) {
      handleRefreshAndRedirect(fallbackRoute);
    }
  };

  return (
    <div onError={handleError}>
      {children}
    </div>
  );
};
