'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { permissionsAPI } from '../../../config/api';
import { useAuth } from '../../../config/AuthProvider';

export default function CreatePermissionPage() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    resource: '',
    action: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.resource.trim() || !formData.action.trim()) {
      Swal.fire('Error', 'Name, resource, and action are required', 'error');
      return;
    }

    setLoading(true);
    try {
      await permissionsAPI.create(formData);
      
      Swal.fire({
        title: 'Success!',
        text: 'Permission created successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#1f1f1f',
        color: '#fff',
        iconColor: '#4ade80',
        padding: '6em',
        customClass: { popup: 'rounded-5' },
      }).then(() => {
        router.push('/admin/permissions');
      });
    } catch (error) {
      console.error('Error creating permission:', error);
      Swal.fire('Error', 'Cannot create permission', 'error');
    } finally {
      setLoading(false);
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
          Create New Permission
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
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4 text-light"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-white mb-0">
                    <i className="fa fa-key me-2"></i>
                    Create New Permission
                  </h3>
                  <Link href="/admin/permissions" className="btn btn-outline-light rounded-5">
                    <i className="fa fa-times me-1"></i> Cancel
                  </Link>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-light">
                      Permission Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-light border-secondary rounded-3"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., user.create"
                      required
                      disabled={!isAdmin}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="resource" className="form-label text-light">
                      Resource <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-light border-secondary rounded-3"
                      id="resource"
                      name="resource"
                      value={formData.resource}
                      onChange={handleChange}
                      placeholder="e.g., users, products, orders"
                      required
                      disabled={!isAdmin}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="action" className="form-label text-light">
                      Action <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-light border-secondary rounded-3"
                      id="action"
                      name="action"
                      value={formData.action}
                      onChange={handleChange}
                      placeholder="e.g., create, read, update, delete"
                      required
                      disabled={!isAdmin}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="form-label text-light">
                      Description
                    </label>
                    <textarea
                      className="form-control bg-transparent text-light border-secondary rounded-3"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter permission description"
                      rows="4"
                      disabled={!isAdmin}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-success flex-fill rounded-5"
                      disabled={loading || !isAdmin}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <i className="fa fa-save me-1"></i> Create Permission
                        </>
                      )}
                    </button>
                    <Link href="/admin/permissions" className="btn btn-outline-light rounded-5">
                      <i className="fa fa-arrow-left me-1"></i> Back
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
