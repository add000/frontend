'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { apiFetch, rolesAPI } from '../config/api';

export default function RegisterPage() {
  const router = useRouter();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    fullname: '',
    lastname: '',
    status: 'inactive',
    role_id: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await apiFetch('/api/roles/public');
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    if (!formData.firstname) newErrors.firstname = 'กรุณาเลือกคำนำหน้าชื่อ';
    if (!formData.fullname) newErrors.fullname = 'กรุณากรอกชื่อ';
    if (!formData.lastname) newErrors.lastname = 'กรุณากรอกนามสกุล';
    if (!formData.role_id) newErrors.role_id = 'กรุณาเลือกบทบาท';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'สมัครสมาชิกสำเร็จ!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          router.push('/login');
        });
        setFormData({
          username: '',
          password: '',
          firstname: '',
          fullname: '',
          lastname: '',
          status: 'inactive',
          role_id: '',
        });
        setErrors({});
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: result?.error || result?.message || 'สมัครสมาชิกไม่สำเร็จ!',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      }
    } catch (error) {
      console.error('Register Error:', error);
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: error.message || 'ข้อผิดพลาดเครือข่าย กรุณาลองใหม่',
        icon: 'error',
        confirmButtonText: 'ตกลง',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', padding: '20px', margin: '0 auto', marginTop: '100px', marginBottom: '100px' }}>
      <form
        className="border-none rounded-5 p-5"
        style={{
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 200, 190, 0.36)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
        noValidate
        onSubmit={handleSubmit}
      >
        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
            placeholder="โปรดตั้งชื่อผู้ใช้ของคุณ"
            style={{
              border: errors.username ? '2px solid #dc3545' : '1px solid #6b7280',
            }}
          />
          {errors.username && <div style={{ color: '#dc3545' }}>{errors.username}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
            placeholder="สร้างรหัสผ่าน"
            style={{
              border: errors.password ? '2px solid #dc3545' : '1px solid #6b7280',
            }}
          />
          {errors.password && <div style={{ color: '#dc3545' }}>{errors.password}</div>}
        </div>

        {/* firstname */}
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">คำนำหน้าชื่อ</label>
          <select
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
            style={{ border: errors.firstname ? '2px solid #dc3545' : '1px solid #6b7280' }}
          >
            <option value="">โปรดเลือกคำนำหน้าชื่อ</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          {errors.firstname && <div style={{ color: '#dc3545' }}>{errors.firstname}</div>}
        </div>

        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">ชื่อของคุณ</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
            placeholder="ใส่ชื่อของคุณที่นี่ซะ"
            style={{ border: errors.fullname ? '2px solid #dc3545' : '1px solid #6b7280' }}
          />
          {errors.fullname && <div style={{ color: '#dc3545' }}>{errors.fullname}</div>}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">นามสกุล</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
            placeholder="ใส่นามสกุลของคุณด้วย"
            style={{ border: errors.lastname ? '2px solid #dc3545' : '1px solid #6b7280' }}
          />
          {errors.lastname && <div style={{ color: '#dc3545' }}>{errors.lastname}</div>}
        </div>
        {/* Role Selection */}
        <div className="mb-3">
          <label htmlFor="role_id" className="form-label">บทบาท</label>
          <select
            id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            className="form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
            style={{ border: errors.role_id ? '2px solid #dc3545' : '1px solid #6b7280' }}
          >
            <option value="">โปรดเลือกบทบาท</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role_id && <div style={{ color: '#dc3545' }}>{errors.role_id}</div>}
        </div>

        {/* Submit + Back */}
        <div className="d-flex flex-column align-items-center gap-2">
          <button 
            type="submit" 
            className="btn btn-outline-light w-100" 
            style={{ borderRadius: '25px' }}
            disabled={loading}
          >
            {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
          </button>
          <Link href="/login" className="btn btn-outline-light w-100" style={{ borderRadius: '25px' }}>
            ย้อนกลับ
          </Link>
        </div>
      </form>
    </div>
  );
}
