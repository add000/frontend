'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { apiFetch } from "../config/api";
import LoadingPage from "../components/LoadingPage";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  /* ================================
   🔹 ตรวจว่า login อยู่แล้วหรือไม่
   (แค่ปิด loading ไม่ redirect)
  ================================= */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      setIsLoading(false);
    } else {
      // login อยู่แล้ว → แค่ซ่อน loading
      setIsLoading(false);
    }
  }, []);

  /* ================================
   🔹 โหลด Quick Login
  ================================= */
  useEffect(() => {
    const accounts = localStorage.getItem('savedAccounts');
    if (accounts) {
      try {
        setSavedAccounts(JSON.parse(accounts));
      } catch {
        console.error('Invalid savedAccounts');
      }
    }
  }, []);

  /* ================================
   🔹 Handlers
  ================================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    return newErrors;
  };

  /* ================================
   🔹 LOGIN
  ================================= */
  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('เข้าสู่ระบบไม่สำเร็จ');

      const data = await res.json();

      if (!data.token || !data.user) {
        throw new Error('ข้อมูลจากเซิร์ฟเวอร์ไม่ถูกต้อง');
      }

      /* 🔹 เก็บ auth */
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      document.cookie = `token=${data.token}; path=/; max-age=86400`;
      document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=86400`;

      /* 🔹 Remember Me */
      if (rememberMe) {
        const updated = [
          ...savedAccounts.filter(a => a.username !== formData.username),
          formData,
        ];
        localStorage.setItem('savedAccounts', JSON.stringify(updated));
        setSavedAccounts(updated);
      }

      await Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        timer: 1200,
        showConfirmButton: false,
        background: '#1f1f1f',
        color: '#fff',
        iconColor: '#4ade80',
        padding: '3em',
        customClass: { popup: 'rounded-5' },
      });

      /* ================================
         🔹 Redirect (ตัวเดียว ไม่ซ้ำ)
      ================================= */
      const params = new URLSearchParams(window.location.search);
      const redirectParam = params.get('redirect');

      let redirectPath = '/';

      if (redirectParam) {
        try {
          const decoded = decodeURIComponent(redirectParam);

          const isSafe =
            decoded.startsWith('/') &&
            !decoded.includes('//') &&
            !decoded.includes('javascript:') &&
            !decoded.includes('data:');

          redirectPath = isSafe ? decoded : '/';
        } catch {
          redirectPath = '/';
        }
      }

      router.replace(redirectPath);

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        text: err.message,
        background: '#1f1f1f',
        color: '#fff',
        iconColor: '#f87171',
        padding: '3em',
        confirmButtonColor: '#374151',
        customClass: { popup: 'rounded-5', confirmButton: 'rounded-5' },
      });
    }
  };

  /* ================================
   🔹 Quick Login delete
  ================================= */
  const handleDeleteAccount = (username) => {
    const updated = savedAccounts.filter(acc => acc.username !== username);
    setSavedAccounts(updated);
    localStorage.setItem('savedAccounts', JSON.stringify(updated));

    if (formData.username === username) {
      setFormData({ username: '', password: '' });
    }
  };

  if (isLoading) {
    return <LoadingPage message="กำลังโหลด..." />;
  }

  /* ================================
   🔹 UI
  ================================= */
  return (
    <main
      className="position-relative"
      style={{
        height: '100vh',
        backgroundImage: 'url(/p/g1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '400px',
          padding: '20px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}
      >
        <form
          onSubmit={handleLogin}
          className="p-5 rounded-5"
          style={{
            backdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(255, 200, 190, 0.36)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}
        >

          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-control rounded-5 ${errors.username ? 'border-danger' : ''}`}
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control rounded-5 ${errors.password ? 'border-danger' : ''}`}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          {/* Quick Login */}
          <div className="mb-3">
            <select
              className="form-control rounded-5"
              value={formData.username}
              onChange={(e) => {
                const acc = savedAccounts.find(a => a.username === e.target.value);
                setFormData(acc || { username: e.target.value, password: '' });
              }}
            >
              <option value="">Quick Login</option>
              {savedAccounts.map((a, i) => (
                <option key={i} value={a.username}>{a.username}</option>
              ))}
            </select>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label">จำฉันไว้</label>
          </div>

          <button className="btn btn-outline-light w-100 rounded-5">
            เข้าสู่ระบบ
          </button>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link href="/forgot-password">ลืมรหัสผ่าน?</Link>
            <Link href="/register">สมัครสมาชิก</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
