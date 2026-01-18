'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { apiFetch } from "../config/api";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------------- โหลด saved accounts ---------------- */
  useEffect(() => {
    const accounts = localStorage.getItem('savedAccounts');
    if (accounts) setSavedAccounts(JSON.parse(accounts));
  }, []);

  /* ---------------- handle form ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    return newErrors;
  };

  /* ---------------- LOGIN ---------------- */
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.token) {
        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        });
        return;
      }

      /* ================= สำคัญที่สุด ================= */
      // ✅ set COOKIE ให้ middleware เห็น
      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `role=${data.user.role_name}; path=/`;

      // (optional) เก็บ localStorage ไว้ใช้กับ UI
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (rememberMe) {
        const updatedAccounts = [
          ...savedAccounts.filter(a => a.username !== formData.username),
          formData,
        ];
        localStorage.setItem('savedAccounts', JSON.stringify(updatedAccounts));
        setSavedAccounts(updatedAccounts);
      }

      await Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        timer: 1500,
        showConfirmButton: false,
      });

      /* ---------------- redirect ---------------- */
      const redirectPath = searchParams.get('redirect');

      if (redirectPath && redirectPath.startsWith('/')) {
        router.replace(redirectPath);
      } else {
        // fallback ตาม role
        switch (data.user.role_name) {
          case 'admin':
            router.replace('/admin/dashboard');
            break;
          case 'sales':
            router.replace('/sales/dashboard');
            break;
          case 'warehouse':
            router.replace('/warehouse/dashboard');
            break;
          case 'owner':
            router.replace('/owner/dashboard');
            break;
          default:
            router.replace('/');
        }
      }

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.message || 'ระบบขัดข้อง',
      });
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <main className="position-relative" style={{ height: '100vh' }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
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

          <button type="submit" className="btn btn-primary w-100">
            เข้าสู่ระบบ
          </button>

          <Link href="/" className="btn btn-link w-100 mt-2">
            กลับหน้าหลัก
          </Link>
        </form>
      </div>
    </main>
  );
}
