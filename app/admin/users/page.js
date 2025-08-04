'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid bg-dark min-vh-100 py-5 text-light">
      <h2 className="text-center mb-5 fw-bold" style={{ marginTop: '100px' }}>รายชื่อผู้ใช้งาน</h2>

      <div className="row g-4">
        {items.length === 0 && (
          <div className="text-center text-muted">ไม่พบข้อมูลผู้ใช้</div>
        )}

        {items.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
            <div className="card h-100 bg-gradient bg-secondary text-light border-0 shadow-sm rounded-4 p-2">
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="mb-3">
                  <h5 className="card-title fw-bold mb-2">
                    <i className="fa fa-user-circle me-2"></i>
                    {item.fullname}
                  </h5>
                  <ul className="list-unstyled small mb-0">
                    <li><i className="fa fa-user me-2"></i>Username: {item.username}</li>
                    <li><i className="fa fa-address-card me-2"></i>Firstname: {item.firstname}</li>
                    <li><i className="fa fa-user-tag me-2"></i>Lastname: {item.lastname}</li>
                    <li><i className="fa fa-map-marker-alt me-2"></i>Address: {item.address}</li>
                    <li><i className="fa fa-venus-mars me-2"></i>Sex: {item.sex}</li>
                    <li><i className="fa fa-birthday-cake me-2"></i>Birthday: {item.birthday}</li>
                  </ul>
                </div>
                <div className="d-flex justify-content-between gap-2">
                  <Link href="#" className="btn btn-sm btn-outline-warning w-100">
                    <i className="fa fa-edit me-1"></i> แก้ไข
                  </Link>
                  <button className="btn btn-sm btn-outline-danger w-100">
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
