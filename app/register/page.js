'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    prefix: '',
    firstName: '',
    lastName: '',
    address: '',
    gender: '',
    birthDate: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.prefix) newErrors.prefix = 'กรุณาเลือกคำนำหน้าชื่อ';
    if (!formData.firstName) newErrors.firstName = 'กรุณากรอกชื่อ';
    if (!formData.lastName) newErrors.lastName = 'กรุณากรอกนามสกุล';
    if (!formData.address) newErrors.address = 'กรุณากรอกที่อยู่';
    if (!formData.gender) newErrors.gender = '';
    if (!formData.birthDate) newErrors.birthDate = 'กรุณาเลือกวันเกิด';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'กรุณายอมรับข้อตกลง';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert('สมัครสมาชิกสำเร็จ!');
      console.log('Registration data:', formData);
      // ที่นี่คุณสามารถส่งข้อมูลไปยัง API ได้
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', padding: '20px', margin: '0 auto', marginTop: '100px', marginBottom: '100px' }}>
      <form 
        className="border-none rounded-5 p-5" 
        style={{backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'}} 
        noValidate
        onSubmit={handleSubmit}
      >
        
        <div className="mb-3">
          <label 
            htmlFor="username"
            className="form-label">
            Username
          </label>
          <input 
            type="text"
            className="form-control bg-transparent rounded px-3 py-2 text-gray-800 focus:outline-none"
            style={{
              border: errors.username ? '2px solid #dc3545' : '1px solid #6b7280'
            }}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="โปรดตั้งชื่อผู้ใช้ของคุณ"
            required
          />
          {errors.username && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label 
            htmlFor="password"
            className="form-label">
            Password
          </label>
          <input 
            type="password"
            className="form-control bg-transparent rounded px-3 py-2 text-gray-800 focus:outline-none"
            style={{
              border: errors.password ? '2px solid #dc3545' : '1px solid #6b7280'
            }}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="สร้างรหัสผ่าน"
            required
          />
          {errors.password && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password}</div>}
        </div>
        
        <div className="mb-3">
          <label 
            htmlFor="prefix"
            className="form-label">
            คำนำหน้าชื่อ
          </label>
          <select 
            className="form-select bg-transparent rounded px-3 py-2 text-gray-800 focus:outline-none"
            style={{
              border: errors.prefix ? '2px solid #dc3545' : '1px solid #6b7280'
            }}
            id="prefix"
            name="prefix"
            value={formData.prefix}
            onChange={handleChange}
            required
          >
            <option value="">โปรดเลือกคำนำหน้าชื่อ</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          {errors.prefix && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.prefix}</div>}
        </div>

        <div className="mb-3">
          <label 
            htmlFor="firstName"
            className="form-label">
            ชื่อของคุณ
          </label>
          <input 
            type="text"
            className="form-control bg-transparent rounded px-3 py-2 text-gray-800 focus:outline-none"
            style={{
              border: errors.firstName ? '2px solid #dc3545' : '1px solid #6b7280'
            }}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="ใส่ชื่อของคุณที่นี่ซะ"
            required
          />
          {errors.firstName && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <label 
            htmlFor="lastName"
            className="form-label">
            นามสกุล
          </label>
          <input 
            type="text"
            className="form-control bg-transparent rounded px-3 py-2 text-gray-800 focus:outline-none"
            style={{
              border: errors.lastName ? '2px solid #dc3545' : '1px solid #6b7280'
            }}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="ใส่นามสกุลของคุณด้วย"
            required
          />
          {errors.lastName && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.lastName}</div>}
        </div>

        <div className="mb-3">
          <label 
            htmlFor="address"
            className="form-label">
            ที่อยู่ของคุณ
          </label>
          <textarea 
            className="form-control bg-transparent rounded px-3 py-2 text-gray-800 focus:outline-none"
            style={{
              border: errors.address ? '2px solid #dc3545' : '1px solid #6b7280'
            }}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3} 
            placeholder="ใส่ที่อยู่ของคุณ"
            required
          />
          {errors.address && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.address}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">เพศ</label>
          <div style={{
            border: errors.gender ? '2px solid #dc3545' : 'none',
            borderRadius: '0.375rem',
            padding: errors.gender ? '0.5rem' : '0'
          }}>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input bg-transparent focus:outline-none" 
                type="radio" 
                name="gender" 
                id="male"
                value="ชาย"
                checked={formData.gender === 'ชาย'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="male">
                ชาย
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input bg-transparent focus:outline-none" 
                type="radio" 
                name="gender" 
                id="female"
                value="หญิง"
                checked={formData.gender === 'หญิง'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="female">
                หญิง
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input bg-transparent focus:outline-none" 
                type="radio" 
                name="gender" 
                id="other"
                value="อื่นๆ"
                checked={formData.gender === 'อื่นๆ'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="other">
                อื่นๆ
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input bg-transparent focus:outline-none" 
                type="radio" 
                name="gender" 
                id="notSpecified"
                value="ไม่ระบุ"
                checked={formData.gender === 'ไม่ระบุ'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="notSpecified">
                ไม่ระบุ
              </label>
            </div>
          </div>
          {errors.gender && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.gender}</div>}
        </div>
        
        <div className="mb-3">
          <label 
            htmlFor="birthDate"
            className="form-label">
            วันเกิดของท่าน
          </label>
          <input 
            type="date"
            className="form-control bg-transparent rounded px-3 py-2 text-gray-800 focus:outline-none"
            style={{
              border: errors.birthDate ? '2px solid #dc3545' : '1px solid #6b7280'
            }}
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.birthDate}</div>}
        </div>

        <div className="mb-3 form-check">
          <input 
            type="checkbox"
            className="form-check-input bg-transparent focus:outline-none"
            style={{
              accentColor: errors.acceptTerms ? '#dc3545' : undefined
            }}
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          <label 
            className="form-check-label"
            htmlFor="acceptTerms"
            style={{
              color: errors.acceptTerms ? '#dc3545' : undefined
            }}>
            ฉันยอมรับข้อกำหนดและเงื่อนไขของเว็บไซต์นี้
          </label>
          {errors.acceptTerms && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.acceptTerms}</div>}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>

          <button 
            type="submit"
            className="btn btn-outline-light w-100"
            style={{                    
              borderRadius: '25px',
              padding: '12px 25px',
              fontWeight: '500',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              width: '300px',
              textAlign: 'center',
            }}>
            สมัครสมาชิก
          </button>

          <Link 
            role="button"
            className="btn btn-outline-light w-100"
            href="/login"
            style={{                    
              borderRadius: '25px',
              padding: '12px 25px',
              fontWeight: '500',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              width: '300px',
              textAlign: 'center',
            }}>
            ย้อนกลับ
          </Link>
        </div>

      </form>
    </div>
  );
}
