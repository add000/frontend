'use client';
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    return newErrors;
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert('เข้าสู่ระบบไม่สำเร็จ');
      console.log(formData);
    }
  };

  return (
    
    <div className="container"
    style={{ 
      maxWidth: '400px',
      padding: '20px',
      margin: '0 auto',
      marginTop: '68px'
    }}>

      <form 
      onSubmit={handleSubmit}
      className="border-none p-5 rounded-5"
      style={{
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
      }}>

        <div className="mb-3">

          <label 
          htmlFor="formGroupExampleInput1"
          className="form-label">
            Username
          </label>

          <input 
          type="text"
          className={`form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none ${errors.username ? 'border-danger' : ''}`}
          id="formGroupExampleInput1"
          aria-describedby="TextHelp"
          placeholder="โปรดใส่ชื่อของคุณ"
          name="username"
          value={formData.username}
          onChange={handleChange}
          />
           {errors.username && 
           <div 
           className="text-danger">{errors.username}
           </div>}

          <div 
          id="TextHelp"
          className="form-text">
            ข้าพเจ้าอยากจะทราบชื่อของคุน
          </div>

        </div>
        <div className="mb-3">
          
          <label 
          htmlFor="formGroupExampleInput2"
          className="form-label">
            Password
          </label>

          <input 
          type="password"
          className={`form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none ${errors.password ? 'border-danger' : ''}`}
          id="formGroupExampleInput2"
          placeholder="อย่าลืมใส่รหัสผ่านของคุณด้วยละ"
          name="password"
          value={formData.password}
          onChange={handleChange}
          />
          {errors.password && 
          <div 
          className="text-danger">{errors.password}
          </div>}

        </div>
        <div className="mb-3 form-check">
          <input 
          type="checkbox"
          className="form-check-input bg-transparent focus:outline-none"
          id="exampleCheck1" />
          <label 
          className="form-check-label"
          htmlFor="exampleCheck1">
            จำข้าไว้
          </label>
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
              textAlign: 'center'
            }}>
            เข้าสู่ระบบ
          </button>

          <a 
            role="button"
            className="btn btn-outline-light w-100"
            href="/"
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
                        textAlign: 'center'
            }}>
            ย้อนกลับ
          </a>
        </div>

        <br />
        <br />

        <div>
          <div style={{ 
            gap: '5rem',
            display: 'flex',
            justifyContent: 'center',
          }}>

          <Link href="/forgot-password"
          className="text-decoration-none link-body-emphasis link-offset-2">ลืมรหัสผ่าน?</Link>
          <Link href="/register"
          className="text-decoration-none link-body-emphasis link-offset-2">สมัครสมาชิก</Link>
          </div>
        </div>

      </form>
    </div>
  );
}