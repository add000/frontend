'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // ✅ handle change สำหรับ input ทุกช่อง
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ validate ช่องว่าง
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    return newErrors;
  };

  // ✅ handle login
  const handleLogin = async (e) => {
    e.preventDefault();

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
      console.log(formData.username);

      if (data.token) {
        localStorage.setItem('token', data.token);
        Swal.fire({
          icon: 'success',
          title: '<h3>เข้าสู่ระบบสำเร็จ</h3>',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          router.push('/admin/users');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '<h3>เข้าสู่ระบบไม่สำเร็จ</h3>',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          router.push('/login');
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '<h3>เกิดข้อผิดพลาด</h3>',
        text: err.message,
        confirmButtonText: 'ตกลง',
      });
    }
  };

  return (
    <main className="position-relative" style={{ height: '100vh', backgroundImage: 'url(/p/g1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div
      className="container"
      style={{
        maxWidth: '400px',
        padding: '20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
    >
      <form
        onSubmit={handleLogin}
        className="border-none p-5 rounded-5"
        style={{
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 200, 200, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
        }}
      >
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
          <div id="TextHelp" className="form-text">ข้าพเจ้าอยากจะทราบชื่อของคุณ</div>
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

        {/* Remember me */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input bg-transparent rounded-3"
            id="rememberMe"
          />
          <label className="form-check-label" htmlFor="rememberMe">จำข้าไว้</label>
        </div>

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
        <div
          style={{
            marginTop: '2rem',
            gap: '5rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link href="/forgot-password" className="text-decoration-none link-body-emphasis link-offset-2">ลืมรหัสผ่าน?</Link>
          <Link href="/register" className="text-decoration-none link-body-emphasis link-offset-2">สมัครสมาชิก</Link>
        </div>
      </form>
    </div>
    </main>
  );
}
