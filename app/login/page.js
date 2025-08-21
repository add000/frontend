'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/admin/users');
    else setIsLoading(false);

    const accounts = localStorage.getItem('savedAccounts');
    if (accounts) setSavedAccounts(JSON.parse(accounts));
  }, [router]);

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
    if (e.preventDefault) e.preventDefault(); // รองรับการเรียกจากปุ่ม dropdown
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);

        if (rememberMe) {
          const updatedAccounts = [...savedAccounts.filter(a => a.username !== formData.username), formData];
          localStorage.setItem('savedAccounts', JSON.stringify(updatedAccounts));
          setSavedAccounts(updatedAccounts);
        }

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          timer: 2000,
          showConfirmButton: false,
          background: '#1f1f1f',
          color: '#fff',
          iconColor: '#4ade80',
          padding: '6em',
          customClass: { popup: 'rounded-5' },
          backdrop: `rgba(0,0,0,0.7) left top no-repeat`
        }).then(() => router.push('/admin/users'));

      } else {
        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
          background: '#1f1f1f',
          color: '#fff',
          iconColor: '#f87171',
          padding: '6em',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
          customClass: { popup: 'rounded-5', confirmButton: 'rounded-5' },
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.message,
        background: '#1f1f1f',
        color: '#fff',
        iconColor: '#f87171',
        padding: '6em',
        confirmButtonColor: '#374151',
        customClass: { popup: 'rounded-5', confirmButton: 'rounded-5' },
      });
    }
  };

  if (isLoading) {
    return (
      <main className="position-relative d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundImage: 'url(/p/g1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">กำลังตรวจสอบ...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="position-relative" style={{ height: '100vh', backgroundImage: 'url(/p/g1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container" style={{ maxWidth: '400px', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
        <form onSubmit={handleLogin} className="border-none p-5 rounded-5" style={{ backdropFilter: 'blur(16px)', backgroundColor: 'rgba(255, 200, 190, 0.36)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)' }}>

          {/* Username */}
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
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

          {/* Password */}
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
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          {/* Quick Login Dropdown */}
          {savedAccounts.length > 0 && (
            <div className="mb-3">
              <label htmlFor="quickLogin" className="form-label">Quick Login</label>
              <div className="d-flex">
                {/* Remember me */}
                <div className="mb-3 form-check position-absolute" style={{ zIndex: 3, marginLeft: '14.2rem', marginTop: '0.05rem' }}>
                  <input
                    type="checkbox"
                    className="form-check-input rounded-5"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '2em', height: '2em', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  />
                </div>
                <div className="mb-3 form-check position-absolute" style={{ zIndex: 2, marginLeft: '13.28rem', marginTop: '0.6rem' }}>
                  <i className="fas fa-user" />
                </div>

                <select
                  id="quickLogin"
                  className="form-control border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
                  style={{ zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                  onChange={(e) => {
                    const acc = savedAccounts.find(a => a.username === e.target.value);
                    if (acc) setFormData(acc);
                  }}
                  value={formData.username}
                >
                  <option value="">เลือกชื่อผู้ใช้</option>
                  {savedAccounts.map((acc, idx) => (
                    <option key={idx} value={acc.username}>{acc.username}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex flex-column align-items-center gap-2">
            <button type="submit" className="btn btn-outline-light w-100" style={{ borderRadius: '25px' }}>
              เข้าสู่ระบบ
            </button>
            <Link href="/" className="btn btn-outline-light w-100" style={{ borderRadius: '25px' }}>
              ย้อนกลับ
            </Link>
          </div>

          {/* Links */}
          <div style={{ marginTop: '2rem', gap: '5rem', display: 'flex', justifyContent: 'center' }}>
            <Link href="/forgot-password" className="text-decoration-none link-body-emphasis link-offset-2">ลืมรหัสผ่าน?</Link>
            <Link href="/register" className="text-decoration-none link-body-emphasis link-offset-2">สมัครสมาชิก</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
