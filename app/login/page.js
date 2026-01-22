'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { apiFetch } from "../config/api";
import { getDefaultRouteForRole } from "../config/roleRoutes";
import LoadingPage from "../components/LoadingPage";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple requests
  const [failedAttempts, setFailedAttempts] = useState(0); // Track failed attempts
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = () => {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      
      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          console.log('Found user in localStorage:', user);
          console.log('User role:', user.role_name);
          
          // ✅ **Check for redirect parameter first**
          const urlParams = new URLSearchParams(window.location.search);
          const redirectParam = urlParams.get('redirect');
          
          if (redirectParam) {
            try {
              const redirectPath = decodeURIComponent(redirectParam);
              console.log('Redirecting to specified path:', redirectPath);
              router.replace(redirectPath);
              return;
            } catch (error) {
              console.error('Error decoding redirect path:', error);
            }
          }
          
          // ✅ **If no redirect parameter, go to admin dashboard**
          console.log('No redirect parameter, going to admin dashboard');
          router.replace('/admin/dashboard');
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuthAndRedirect();
  }, [router]);

  useEffect(() => {
    const accounts = localStorage.getItem('savedAccounts');
    if (accounts) {
      try {
        setSavedAccounts(JSON.parse(accounts));
      } catch (error) {
        console.error('Error parsing saved accounts:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Prevent multiple requests
    if (isSubmitting) {
      console.log('Request already in progress, ignoring duplicate request');
      return;
    }
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true); // Start request queue

    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Login API Response:', data);

      if (data.token && data.user) {
        // Reset failed attempts on success
        setFailedAttempts(0);
        
        // ✅ **เก็บใน localStorage**
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log('Login successful, user:', data.user);
        console.log('Role:', data.user.role_name);

        // ✅ **ตั้ง cookies สำหรับ middleware (สำรอง)**
        document.cookie = `token=${data.token}; path=/; max-age=86400`;
        document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=86400`;

        if (rememberMe) {
          const updatedAccounts = [...savedAccounts.filter(a => a.username !== formData.username), formData];
          localStorage.setItem('savedAccounts', JSON.stringify(updatedAccounts));
          setSavedAccounts(updatedAccounts);
        }

        await Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          timer: 1500,
          showConfirmButton: false,
          background: '#1f1f1f',
          color: '#fff',
          iconColor: '#4ade80',
          padding: '3em',
          customClass: { popup: 'rounded-5' },
        });

        // ✅ **FIX: อ่านและ decode redirect parameter**
        const urlParams = new URLSearchParams(window.location.search);
        const redirectParam = urlParams.get('redirect');
        // ✅ **Use role-based default route if no redirect parameter**
        const defaultRoute = getDefaultRouteForRole(data.user.role_name);
        let redirectPath = redirectParam ? decodeURIComponent(redirectParam) : defaultRoute;
        
        console.log('Default route for role:', defaultRoute);
        console.log('Final redirect path:', redirectPath);
        
        if (redirectParam) {
          try {
            // ✅ **Decode URL parameter ที่ถูก encode มา**
            redirectPath = decodeURIComponent(redirectParam);
            console.log('Decoded redirect path:', redirectPath);
            
            // ✅ **ตรวจสอบความปลอดภัย**
            const isSafeRedirect = (path) => {
              return path && 
                     path.startsWith('/') && 
                     !path.includes('//') && 
                     !path.includes('javascript:') &&
                     !path.includes('data:');
            };

            if (!isSafeRedirect(redirectPath)) {
              console.warn('Unsafe redirect path, using default route');
              redirectPath = defaultRoute;
            }
          } catch (error) {
            console.error('Error decoding redirect path:', error);
            redirectPath = defaultRoute;
          }
        }

        // ✅ **Redirect to final path with increased delay for database processing**
        console.log('Redirecting to:', redirectPath);
        
        // Increased delay for smooth data retrieval and database processing
        setTimeout(() => {
          router.replace(redirectPath);
        }, 1200); // Increased from immediate to 1200ms for smoother experience

      } else {
        throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Increment failed attempts
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      
      // Show warning after 3 failed attempts
      if (newFailedAttempts >= 3) {
        await Swal.fire({
          icon: 'warning',
          title: 'คำเตือน',
          text: 'การเข้าสู่ระบบล้มเหลวหลายครั้ง กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง',
          background: '#1f1f1f',
          color: '#fff',
          iconColor: '#f59e0b',
          padding: '3em',
          confirmButtonColor: '#374151',
          customClass: { popup: 'rounded-5', confirmButton: 'rounded-5' },
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: `ความพยายามในการเข้าสู่ระบบ (ครั้งที่ ${newFailedAttempts})`,
          background: '#1f1f1f',
          color: '#fff',
          iconColor: '#f87171',
          padding: '3em',
          confirmButtonColor: '#374151',
          customClass: { popup: 'rounded-5', confirmButton: 'rounded-5' },
        });
      }
    } finally {
      setIsSubmitting(false); // Reset request queue
    }
  };

  const handleDeleteAccount = (username) => {
    const updatedAccounts = savedAccounts.filter(acc => acc.username !== username);
    setSavedAccounts(updatedAccounts);
    localStorage.setItem('savedAccounts', JSON.stringify(updatedAccounts));

    if (formData.username === username) {
      setFormData({ username: '', password: '' });
    }
  };

  if (isLoading) {
    return <LoadingPage message="กำลังตรวจสอบสิทธิ์..." />;
  }

  return (
    <main className="position-relative" style={{ height: '100vh', backgroundImage: 'url(/p/g1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container" style={{ maxWidth: '400px', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
        <form onSubmit={handleLogin} className="border-none p-5 rounded-5" style={{ backdropFilter: 'blur(16px)', backgroundColor: 'rgba(255, 200, 190, 0.36)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)', margin: '2%' }}>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className={`form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none ${errors.username ? 'border-danger' : ''}`}
              id="username"
              name="username"
              placeholder="โปรดใส่ชื่อของคุณ"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none ${errors.password ? 'border-danger' : ''}`}
              id="password"
              name="password"
              placeholder="อย่าลืมใส่รหัสผ่านของคุณด้วยละ"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="quickLogin" className="form-label">Quick Login</label>
            <div className="d-flex align-items-center position-relative mb-3">
              <select
                id="quickLogin"
                className="form-control border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', paddingRight: '3.5rem' }}
                onChange={(e) => {
                  const acc = savedAccounts.find(a => a.username === e.target.value);
                  if (acc) setFormData(acc);
                  else setFormData({ ...formData, username: e.target.value });
                }}
                value={formData.username}
              >
                <option value="">เลือกบัญชีที่จำไว้</option>
                {savedAccounts.map((acc, idx) => (
                  <option key={idx} value={acc.username}>{acc.username}</option>
                ))}
              </select>
              
              {formData.username && savedAccounts.some(a => a.username === formData.username) && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm rounded-5 position-absolute"
                  style={{ right: '0.5rem', padding: '0.25rem 0.5rem' }}
                  onClick={() => handleDeleteAccount(formData.username)}
                >
                  ลบ
                </button>
              )}
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                จำฉันไว้
              </label>
            </div>
          </div>

          <div className="d-flex flex-column align-items-center gap-3">
            <button 
              type="submit" 
              className={`btn btn-outline-light w-100 py-2 ${isSubmitting ? 'disabled' : ''}`} 
              style={{ borderRadius: '25px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
            <Link href="/" className="btn btn-outline-light w-100 py-2" style={{ borderRadius: '25px' }}>
              ย้อนกลับ
            </Link>
          </div>

          <div className="d-flex justify-content-center gap-4 mt-4">
            <Link href="/forgot-password" className="text-decoration-none text-white">ลืมรหัสผ่าน?</Link>
            <Link href="/register" className="text-decoration-none text-white">สมัครสมาชิก</Link>
          </div>
        </form>
      </div>
    </main>
  );
}