'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { rolesAPI, permissionsAPI } from '../../../../config/api';
import { useAuth } from '../../../../config/AuthProvider';

export default function RolePermissionsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [rolePermissions, setRolePermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      // ดึงข้อมูลบทบาท
      const roleResponse = await rolesAPI.getById(id);
      const roleData = await roleResponse.json();
      setRole(roleData);

      // ดึงข้อมูลสิทธิ์ทั้งหมดแบบจัดกลุ่ม
      const permissionsResponse = await permissionsAPI.getGrouped();
      const permissionsData = await permissionsResponse.json();
      setPermissions(permissionsData);

      // ดึงข้อมูลสิทธิ์ของบทบาท
      const rolePermissionsResponse = await rolesAPI.getPermissions(id);
      const rolePermissionsData = await rolePermissionsResponse.json();
      setRolePermissions(rolePermissionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถดึงข้อมูลได้', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setRolePermissions([...rolePermissions, { id: permissionId }]);
    } else {
      setRolePermissions(rolePermissions.filter(p => p.id !== permissionId));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const permissionIds = rolePermissions.map(p => p.id);
      await rolesAPI.assignPermissions(id, permissionIds);
      
      Swal.fire({
        title: 'สำเร็จ!',
        text: 'บันทึกสิทธิ์เรียบร้อยแล้ว',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#1f1f1f',
        color: '#fff',
        iconColor: '#4ade80',
        padding: '6em',
        customClass: { popup: 'rounded-5' },
      }).then(() => {
        router.push('/admin/roles');
      });
    } catch (error) {
      console.error('Error saving permissions:', error);
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกสิทธิ์ได้', 'error');
    } finally {
      setSaving(false);
    }
  };

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
        <h5>Loading data...</h5>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="container text-center mt-5">
        <h3>Role not found</h3>
        <Link href="/admin/roles" className="btn btn-primary">กลับ</Link>
      </div>
    );
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
          Manage Role Permissions
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
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-white">Manage Role Permissions: {role.name}</h2>
                <p className="text-muted">{role.description}</p>
              </div>
              <div>
                <Link href="/admin/roles" className="btn btn-outline-light me-2 rounded-5">
                  <i className="fa fa-arrow-left me-1"></i> Back
                </Link>
                {isAdmin && (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-success rounded-5"
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Loading...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-save me-1"></i> Save
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {Object.entries(permissions).map(([resource, resourcePermissions]) => (
            <div className="col-12 col-lg-6 mb-4" key={resource}>
              <div
                className="card border-0 shadow-lg rounded-4 p-3 text-light"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="card-header bg-transparent border-0 mb-3">
                  <h5 className="text-info mb-0">
                    <i className="fa fa-folder me-2"></i>
                    {resource.charAt(0).toUpperCase() + resource.slice(1)}
                  </h5>
                </div>
                <div className="card-body">
                  {resourcePermissions.map((permission) => {
                    const isChecked = rolePermissions.some(p => p.id === permission.id);
                    return (
                      <div className="form-check mb-2" key={permission.id}>
                        <input
                          className="form-check-input bg-transparent rounded-3"
                          type="checkbox"
                          id={`permission-${permission.id}`}
                          checked={isChecked}
                          onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                          disabled={!isAdmin}
                        />
                        <label className="form-check-label" htmlFor={`permission-${permission.id}`}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span>
                              <i className="fa fa-check-circle me-2 text-success"></i>
                              {permission.action.charAt(0).toUpperCase() + permission.action.slice(1)}
                            </span>
                            <small className="text-muted">{permission.name}</small>
                          </div>
                          <div className="small text-muted mt-1">{permission.description}</div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
