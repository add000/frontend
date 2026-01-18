'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { rolesAPI } from '../../config/api';
import { useAuth } from '../../config/AuthProvider';

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await rolesAPI.getAll();
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      Swal.fire('Error', 'Cannot fetch roles data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this role!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'rounded-5', confirmButton: 'rounded-5', cancelButton: 'rounded-5' },
      padding: '6em',
      color: '#fff',
      iconColor: '#f87171',
      background: '#1f1f1f',
    });

    if (result.isConfirmed) {
      try {
        await rolesAPI.delete(id);
        setRoles(roles.filter(role => role.id !== id));
        Swal.fire('Deleted!', 'Role has been deleted', 'success');
      } catch (error) {
        console.error('Error deleting role:', error);
        Swal.fire('Error', 'Cannot delete role', 'error');
      }
    }
  };

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
          Manage Roles
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
              <h2 className="text-white">Role List</h2>
              {isAdmin && (
                <Link href="/admin/roles/create" className="btn btn-primary rounded-5">
                  <i className="fa fa-plus me-2"></i>Create New Role
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="row g-4">
          {roles.length === 0 && (
            <div className="text-center text-muted">No roles found</div>
          )}

          {roles.map((role) => (
            <div className="col-12 col-md-6 col-lg-4" key={role.id}>
              <div
                className="card h-100 border-0 shadow-lg rounded-4 p-3 text-light"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="mb-3">
                    <h5 className="card-title fw-bold mb-2 text-info">
                      <i className="fa fa-shield-alt me-2"></i>
                      {role.name}
                    </h5>
                    <p className="card-text text-light small">
                      {role.description}
                    </p>
                    <div className="text-muted small">
                      <i className="fa fa-calendar me-1"></i>
                      Created: {new Date(role.created_at).toLocaleDateString('en-US')}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="d-flex gap-2 mb-3">
                      <Link 
                        href={`/admin/roles/${role.id}/permissions`} 
                        className="btn btn-sm btn-outline-warning w-100 rounded-5"
                      >
                        <i className="fa fa-key me-1"></i> Manage Permissions
                      </Link>
                      {isAdmin && (
                        <>
                          <Link 
                            href={`/admin/roles/edit/${role.id}`} 
                            className="btn btn-sm btn-outline-info w-100 rounded-5"
                          >
                            <i className="fa fa-edit me-1"></i> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(role.id)}
                            className="btn btn-sm btn-outline-danger w-100 rounded-5"
                            disabled={role.name === 'admin'} // ป้องกันการลบ admin
                          >
                            <i className="fa fa-trash me-1"></i> Delete
                          </button>
                        </>
                      )}
                    </div>
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
