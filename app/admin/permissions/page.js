'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { permissionsAPI } from '../../config/api';
import { useAuth } from '../../config/AuthProvider';

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await permissionsAPI.getGrouped();
      const data = await response.json();
      setPermissions(data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      Swal.fire('Error', 'Cannot fetch permissions data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this permission!",
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
        await permissionsAPI.delete(id);
        // Refresh permissions after deletion
        await fetchPermissions();
        Swal.fire('Deleted!', 'Permission has been deleted', 'success');
      } catch (error) {
        console.error('Error deleting permission:', error);
        Swal.fire('Error', 'Cannot delete permission', 'error');
      }
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
        <h5>Loading permissions...</h5>
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
          Manage Permissions
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
              <h2 className="text-white">Permission List</h2>
              {isAdmin && (
                <Link href="/admin/permissions/create" className="btn btn-primary rounded-5">
                  <i className="fa fa-plus me-2"></i>Create New Permission
                </Link>
              )}
            </div>
          </div>
        </div>

        {Object.keys(permissions).length === 0 && (
          <div className="text-center text-muted">No permissions found</div>
        )}

        {Object.entries(permissions).map(([resource, resourcePermissions]) => (
          <div className="mb-5" key={resource}>
            <h4 className="text-info mb-3">
              <i className="fa fa-folder me-2"></i>
              {resource.charAt(0).toUpperCase() + resource.slice(1)}
            </h4>
            
            <div className="row g-4">
              {resourcePermissions.map((permission) => (
                <div className="col-12 col-md-6 col-lg-4" key={permission.id}>
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
                        <h5 className="card-title fw-bold mb-2 text-warning">
                          <i className="fa fa-key me-2"></i>
                          {permission.action.charAt(0).toUpperCase() + permission.action.slice(1)}
                        </h5>
                        <p className="card-text text-light small mb-2">
                          {permission.name}
                        </p>
                        <p className="card-text text-muted small">
                          {permission.description}
                        </p>
                        <div className="text-muted small">
                          <i className="fa fa-calendar me-1"></i>
                          Created: {new Date(permission.created_at).toLocaleDateString('en-US')}
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="d-flex gap-2">
                          {isAdmin && (
                            <>
                              <Link 
                                href={`/admin/permissions/edit/${permission.id}`} 
                                className="btn btn-sm btn-outline-info w-100 rounded-5"
                              >
                                <i className="fa fa-edit me-1"></i> Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(permission.id)}
                                className="btn btn-sm btn-outline-danger w-100 rounded-5"
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
        ))}
      </div>
    </>
  );
}
