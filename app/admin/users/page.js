'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { apiFetch } from '../../config/api';

export default function Page() {
  const [items, setItems] = useState([]);   // ❌ ไม่มี <any[]>
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // โหลดข้อมูลผู้ใช้
  const fetchUsers = async () => {
    try {
      const res = await apiFetch('/api/users', {
        cache: 'no-store',
      });
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchUsers();
  }, []);

  // ✅ Loading Animation
  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
        <div
          className="spinner-border text-info mb-3"
          role="status"
          style={{ width: '4rem', height: '4rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>กำลังโหลดข้อมูล...</h5>
      </div>
    );
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนผู้ใช้นี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
      customClass: { popup: 'rounded-5', confirmButton: 'rounded-5', cancelButton: 'rounded-5' },
      padding: '6em',
      color: '#fff',
      iconColor: '#f87171',
      background: '#1f1f1f',
    });

    if (result.isConfirmed) {
      try {
        const res = await apiFetch(`/api/users/${id}`, {
          method: 'DELETE',
        });

        const data = await res.json();
        console.log(data);

        setItems(items.filter(item => item.id !== id));

        Swal.fire(
          'ลบแล้ว!',
          'ผู้ใช้ถูกลบเรียบร้อยแล้ว.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบผู้ใช้ได้', 'error');
      }
    }
  }
  return (
    <>
      <div className="position-relative bg-black">
        <img
          src="/p/p3.jpg"
          className="img-fit"
          style={{ height: "100vh", width: "100vw", objectFit: "cover" }}
        />
        <div
          className="position-absolute text-center w-100"
          style={{
            position: "absolute",
            top: "45%",
            color: "white",
            fontSize: "4em",
            fontWeight: "bold",
            textShadow: "0px 0px 20px #B17D4D",
            padding: "0 20px",
            zIndex: 2,
          }}
        >
          สมาชิก
        </div>
        <div
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0))",
            zIndex: 1,
            pandingBottom: "6em"
          }}
        ></div>
        <div
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0),rgba(0,0,0,0), #0f0f0f)",
            zIndex: 1,
            pandingBottom: "6em"
          }}
        >
      </div>
      </div>
      <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: '#0f0f0f' }}>
        <div className="row g-4">
          {items.length === 0 && (
            <div className="text-center text-muted">ไม่พบข้อมูลผู้ใช้</div>
          )}

          {items.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <div
                className="card h-100 border-0 shadow-lg rounded-4 p-3 text-light"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="mb-3">
                    <h5 className="card-title fw-bold mb-2 text-info">
                      <i className="fa fa-user-circle me-2"></i>
                      {item.fullname}
                    </h5>
                    <ul className="list-unstyled small mb-0 text-light">
                      <li><i className="fa fa-user me-2 text-secondary"></i>Username: {item.username}</li>
                      <li><i className="fa fa-address-card me-2 text-secondary"></i>Firstname: {item.firstname}</li>
                      <li><i className="fa fa-user-tag me-2 text-secondary"></i>Lastname: {item.lastname}</li>
                      <li><i className="fa fa-shield-alt me-2 text-info"></i>บทบาท: {item.role_name || 'ยังไม่กำหนด'}</li>
                      <li><i className="fa fa-map-marker-alt me-2 text-secondary"></i>Address: {item.address}</li>
                      <li><i className="fa fa-venus-mars me-2 text-secondary"></i>Sex: {item.sex}</li>
                      <li><i className="fa fa-birthday-cake me-2 text-secondary"></i>Birthday: {item.birthday}</li>
                    </ul>
                  </div>
                  <div className="d-flex justify-content-between gap-2">
                    <Link href={`/admin/users/edit/${item.id}`} className="btn btn-sm btn-outline-info w-100 rounded-5">
                      <i className="fa fa-edit me-1"></i> แก้ไข
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-outline-danger w-100 rounded-5"
                    >
                      <i className="fa fa-trash me-1"></i> ลบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
