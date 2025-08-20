'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Page() {
  const [items, setItems] = useState([]);   // ❌ ไม่มี <any[]>
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // โหลดข้อมูลผู้ใช้
  const fetchUsers = async () => {
    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
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

  // ฟังก์ชันลบผู้ใช้
  async function handleDelete(id) {
    if (!confirm('คุณแน่ใจว่าต้องการลบผู้ใช้นี้?')) return;

    try {
      const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) throw new Error('Delete failed');

      const result = await res.json();
      console.log(result);

      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: '#0f0f0f' }}>
      <h2 className="text-center mb-5 fw-bold text-light" style={{ marginTop: '100px' }}>
        รายชื่อผู้ใช้งาน
      </h2>

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
  );
}
