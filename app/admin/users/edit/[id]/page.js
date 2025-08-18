'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstname: '',
        fullname: '',
        lastname: '',
        address: '',
        sex: '',
        birthday: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`);
                const data = await res.json();
                const user = Array.isArray(data) ? data[0] : data;
                setFormData({
                    username: user.username || '',
                    password: user.password || '',
                    firstname: user.firstname || '',
                    fullname: user.fullname || '',
                    lastname: user.lastname || '',
                    address: user.address || '',
                    sex: user.sex || '',
                    birthday: user.birthday || '',
                    acceptTerms: user.acceptTerms || false,
                });
            } catch (error) {
                console.error(error);
            }
        }
        if (id)
            fetchUser();
    }, [id]);

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
        if (!formData.address) newErrors.address = 'กรุณากรอกที่อยู่';
        if (!formData.sex) newErrors.sex = 'กรุณาเลือกเพศ';
        if (!formData.birthday) newErrors.birthday = 'กรุณาเลือกวันเกิด';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'กรุณายอมรับข้อตกลง';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const foundErrors = validate();
        if (Object.keys(foundErrors).length > 0) {
            setErrors(foundErrors);
            return;
        }
        setErrors({});
        const submitData = {
            id,
            username: formData.username,
            password: formData.password,
            firstname: formData.firstname,
            fullname: formData.fullname,
            lastname: formData.lastname,
            address: formData.address,
            sex: formData.sex,
            birthday: formData.birthday,
            acceptTerms: formData.acceptTerms,
        };

        try {
            const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            const result = await res.json();
            if (res.ok) {
                Swal.fire({
                    title: 'สำเร็จ!',
                    text: 'แก้ไขสมาชิกสำเร็จ!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    router.push('/admin/users');
                });
                setFormData({
                    username: '',
                    password: '',
                    firstname: '',
                    fullname: '',
                    lastname: '',
                    address: '',
                    sex: '',
                    birthday: '',
                    acceptTerms: false,
                });
                setErrors({});
            } else {
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด!',
                    text: result?.message || 'ไม่สามารถส่งข้อมูลแก้ไขได้!',
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ข้อผิดพลาดเครือข่าย',
                icon: 'error',
            });
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', padding: '20px', margin: '0 auto', marginTop: '100px', marginBottom: '100px' }}>
            <form
                className="border-none rounded-5 p-5"
                style={{
                    backdropFilter: 'blur(16px)',
                    backgroundColor: 'rgba(255, 200, 200, 0.2)',
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

                {/* Address */}
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">ที่อยู่ของคุณ</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
                        placeholder="ใส่ที่อยู่ของคุณ"
                        style={{ border: errors.address ? '2px solid #dc3545' : '1px solid #6b7280' }}
                    />
                    {errors.address && <div style={{ color: '#dc3545' }}>{errors.address}</div>}
                </div>

                {/* sex */}
                <div className="mb-3">
                    <label className="form-label">เพศ</label>
                    <div>
                        {['ชาย', 'หญิง', 'อื่นๆ', 'ไม่ระบุ'].map((option) => (
                            <div className="form-check form-check-inline" key={option}>
                                <input
                                    type="radio"
                                    name="sex"
                                    id={option}
                                    value={option}
                                    checked={formData.sex === option}
                                    onChange={handleChange}
                                    className="form-check-input bg-transparent rounded-3"
                                />
                                <label className="form-check-label" htmlFor={option}>{option}</label>
                            </div>
                        ))}
                    </div>
                    {errors.sex && <div style={{ color: '#dc3545' }}>{errors.sex}</div>}
                </div>

                {/* Birth Date */}
                <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">วันเกิดของท่าน</label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="form-control bg-transparent border border-gray-400 rounded-5 px-3 py-2 text-gray-800 focus:outline-none"
                        style={{ border: errors.birthday ? '2px solid #dc3545' : '1px solid #6b7280' }}
                    />
                    {errors.birthday && <div style={{ color: '#dc3545' }}>{errors.birthday}</div>}
                </div>

                {/* Accept Terms */}
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="form-check-input bg-transparent rounded-3"
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                        ฉันยอมรับข้อกำหนดและเงื่อนไขของเว็บไซต์นี้
                    </label>
                    {errors.acceptTerms && <div style={{ color: '#dc3545' }}>{errors.acceptTerms}</div>}
                </div>

                {/* Submit + Back */}
                <div className="d-flex flex-column align-items-center gap-2">
                    <button type="submit" className="btn btn-outline-light w-100" style={{ borderRadius: '25px' }}>
                        แก้ไขข้อมูล
                    </button>
                    <Link href="/admin/users" className="btn btn-outline-light w-100" style={{ borderRadius: '25px' }}>
                        ย้อนกลับ
                    </Link>
                </div>
            </form>
        </div>
    );
}
