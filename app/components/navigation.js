'use client';
import { LiquidWeb } from 'liquid-web/react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '@/config/AuthProvider';
import { debounce } from '../utils/performance';

export default function LiquidNavbar() {
  const collapseRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [tokenState, setToken] = useState(null);
  const { user } = useAuth();

  const isActive = (path) => pathname === path;

  // อ่าน token และรีเซ็ต style link (เพิ่ม performance optimization)
  const resetLinks = useCallback(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !isActive(href)) {
        link.style.background = '';
        link.style.backdropFilter = '';
        link.style.transform = '';
        link.style.boxShadow = '';
      }
    });
  }, [pathname]);

  const debouncedResetLinks = debounce(resetLinks, 100);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    debouncedResetLinks();
  }, [pathname, debouncedResetLinks, user]);

  // โหลด Bootstrap JS
  useEffect(() => {
    const loadBootstrap = async () => {
      if (typeof window !== 'undefined') {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }
    };
    loadBootstrap();
  }, []);

  // Logout
  const handlelogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  // Style สำหรับ Desktop
  const getNavLinkStyle = (path) => ({
    color: 'white',
    padding: '10px 16px',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    background: isActive(path) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    backdropFilter: isActive(path) ? 'blur(10px)' : 'none',
    border: isActive(path) ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
    margin: '0 3px',
    display: 'block',
    boxShadow: isActive(path) ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
    fontSize: '14px',
    fontWeight: '400',
    width: '115px',
    textAlign: 'center'
  });

  // Style สำหรับ Mobile
  const getMobileNavLinkStyle = (path) => ({
    color: 'white',
    padding: '10px 16px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    background: isActive(path) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    backdropFilter: isActive(path) ? 'blur(10px)' : 'none',
    border: isActive(path) ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
    margin: '3px 0',
    display: 'block',
    textAlign: 'center',
    boxShadow: isActive(path) ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
    fontSize: '14px',
    fontWeight: '400',
    width: '250px'
  });

  const handleMouseEnter = (e, path) => {
    if (!isActive(path)) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
      e.currentTarget.style.backdropFilter = 'blur(10px)';
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    }
  };

  const handleMouseLeave = (e, path) => {
    if (!isActive(path)) {
      e.currentTarget.style.background = '';
      e.currentTarget.style.backdropFilter = '';
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    }
  };

  return (
    <header className="fixed-top" style={{ padding: '10px' }}>
      <LiquidWeb
        selector="nav"
        options={{
          mode: 'prominent',
          scale: 24,
          opacity: 0.3,
          blur: 3,
          saturation: 60,
          aberration: 0,
        }}>

        <nav className="navbar navbar-expand-lg" style={{
          backdropFilter: 'blur(6px) saturate(180%)',
          WebkitBackdropFilter: 'blur(6px) saturate(180%)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderRadius: '50px',
          padding: '10px 20px',
          border: 'none',
          boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.05)
        `,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0.1,
            left: 1,
            right: 0.01,
            bottom: -0.10,
            background: `
            linear-gradient(135deg,
              rgba(0, 0, 0, 0.3) 0%,
              rgba(0, 0, 0, 0.2) 50%,
              rgba(0, 0, 0, 0.1) 100%
            )
          `,
            borderRadius: '50px',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          <div className="container-fluid" style={{ position: 'relative', zIndex: 2 }}>
            <Link href="/" className="navbar-brand d-flex align-items-center gap-2" style={{
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              <img
                src="/flower.svg"
                alt="Flower"
                width={42}
                height={42}
                className="d-inline-block align-text-top"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }}
              />
              FrontEnd
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{
                borderRadius: '50px',
                padding: '8px ',
                fontWeight: '500',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <span className="navbar-toggler-icon" style={{
                filter: 'invert(1) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
              }} />
            </button>

            {/* ใช้ collapseRef เพื่อ Bootstrap collapse */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef}>
              {/* Desktop Navigation */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-none d-lg-flex">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <li className="nav-item">
                    <Link className="nav-link" href="/" style={getNavLinkStyle('/')}
                      onMouseEnter={(e) => handleMouseEnter(e, '/')}
                      onMouseLeave={(e) => handleMouseLeave(e, '/')}
                    >หน้าแรก</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/about" style={getNavLinkStyle('/about')}
                      onMouseEnter={(e) => handleMouseEnter(e, '/about')}
                      onMouseLeave={(e) => handleMouseLeave(e, '/about')}
                    >เกี่ยวกับเรา</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/service" style={getNavLinkStyle('/service')}
                      onMouseEnter={(e) => handleMouseEnter(e, '/service')}
                      onMouseLeave={(e) => handleMouseLeave(e, '/service')}
                    >บริการของเรา</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/contact" style={getNavLinkStyle('/contact')}
                      onMouseEnter={(e) => handleMouseEnter(e, '/contact')}
                      onMouseLeave={(e) => handleMouseLeave(e, '/contact')}
                    >ติดต่อเรา</Link>
                  </li>
                </div>
              </ul>

              {/* Desktop Login Button */}
              <div className="d-none d-lg-flex align-items-center gap-2">
                {tokenState && user && (
                  <>
                    {/* User Status */}
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-success bg-opacity-10 rounded-2 px-2 py-1 d-flex align-items-center gap-1">
                        <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                        <span className="text-success small fw-semibold">Online</span>
                      </div>
                      
                      {/* User Profile Button - Direct Dashboard Access */}
                      <Link 
                        className="btn btn-outline-light d-flex align-items-center gap-2"
                        href={
                          user?.role_name === 'admin' ? '/admin/dashboard' :
                          user?.role_name === 'owner' ? '/owner/dashboard' :
                          user?.role_name === 'sales' ? '/sales/dashboard' :
                          user?.role_name === 'warehouse' ? '/warehouse/dashboard' :
                          '/dashboard'
                        }
                        style={{
                          borderRadius: '25px',
                          padding: '8px 16px',
                          fontWeight: '500',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          color: 'white',
                          textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
                          transition: 'all 0.3s ease',
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          zIndex: '10',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        }}
                      >
                        <i className="fas fa-user-circle"></i>
                        <span>{user?.firstname || 'User'}</span>
                        <i className="fas fa-arrow-right ms-1" style={{ fontSize: '12px' }}></i>
                      </Link>
                    </div>
                  </>
                )}
                
                {/* Login/Logout Button */}
                {tokenState ? (
                  <button type="button"
                    onClick={handlelogout}
                    className="btn btn-outline-danger"
                    style={{
                      borderRadius: '25px',
                      padding: '10px 20px',
                      fontWeight: '500',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    }}>
                    <i className="fas fa-sign-out-alt"></i> ออกจากระบบ
                  </button>
                ) : (
                  <Link className="btn btn-outline-light"
                    href="/login"
                    role="button"
                    style={{
                      borderRadius: '25px',
                      padding: '10px 20px',
                      fontWeight: '500',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    }}>เข้าสู่ระบบ</Link>
                )}
              </div>

              {/* Mobile Navigation */}
              <div className="d-lg-none w-100">
                <div className="d-flex flex-column align-items-center" style={{ gap: '8px', padding: '15px 0' }}>
                  <Link
                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    aria-current={isActive('/') ? 'page' : undefined}
                    href="/"
                    style={getMobileNavLinkStyle('/')}
                    onMouseEnter={(e) => handleMouseEnter(e, '/')}
                    onMouseLeave={(e) => handleMouseLeave(e, '/')}
                  >
                    หน้าแรก
                  </Link>

                  <Link
                    className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                    href="/about"
                    style={getMobileNavLinkStyle('/about')}
                    onMouseEnter={(e) => handleMouseEnter(e, '/about')}
                    onMouseLeave={(e) => handleMouseLeave(e, '/about')}
                  >
                    เกี่ยวกับเรา
                  </Link>

                  <Link
                    className={`nav-link ${isActive('/service') ? 'active' : ''}`}
                    href="/service"
                    style={getMobileNavLinkStyle('/service')}
                    onMouseEnter={(e) => handleMouseEnter(e, '/service')}
                    onMouseLeave={(e) => handleMouseLeave(e, '/service')}
                  >
                    บริการของเรา
                  </Link>

                  <Link
                    href="/contact"
                    className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                    style={getMobileNavLinkStyle('/contact')}
                    onMouseEnter={(e) => handleMouseEnter(e, '/contact')}
                    onMouseLeave={(e) => handleMouseLeave(e, '/contact')}
                  >
                    ติดต่อเรา
                  </Link>

                  {/* Mobile User Status and Profile */}
                  {tokenState && user && (
                    <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                      <div className="bg-success bg-opacity-10 rounded-2 px-2 py-1 d-flex align-items-center gap-1">
                        <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                        <span className="text-success small fw-semibold">Online</span>
                      </div>
                      
                      {/* User Profile Dropdown */}
                      <div className="dropdown">
                        <button 
                          className="btn btn-outline-light d-flex align-items-center gap-2"
                          type="button"
                          id="profileDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{
                            borderRadius: '25px',
                            padding: '8px 16px',
                            fontWeight: '500',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
                            transition: 'all 0.3s ease',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                          }}
                        >
                          <i className="fas fa-user-circle"></i>
                          <span>{user?.firstname || 'User'}</span>
                          <i className="fas fa-chevron-down ms-1" style={{ fontSize: '12px' }}></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '15px',
                          padding: '8px',
                          minWidth: '200px'
                        }}>
                          {/* Dashboard links based on user role */}
                          <li>
                            <h6 className="dropdown-header text-white mb-2">
                              <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                            </h6>
                          </li>
                          <li><hr className="dropdown-divider" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} /></li>
                          
                          {user?.role_name === 'admin' && (
                            <>
                              <li>
                                <Link className="dropdown-item text-white d-flex align-items-center gap-2" 
                                  href="/admin/dashboard"
                                  style={{
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <i className="fas fa-user-shield text-primary"></i>
                                  <span>Admin Dashboard</span>
                                </Link>
                              </li>
                            </>
                          )}
                          
                          {user?.role_name === 'owner' && (
                            <>
                              <li>
                                <Link className="dropdown-item text-white d-flex align-items-center gap-2" 
                                  href="/owner/dashboard"
                                  style={{
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <i className="fas fa-crown text-success"></i>
                                  <span>Owner Dashboard</span>
                                </Link>
                              </li>
                            </>
                          )}
                          
                          {user?.role_name === 'sales' && (
                            <>
                              <li>
                                <Link className="dropdown-item text-white d-flex align-items-center gap-2" 
                                  href="/sales/dashboard"
                                  style={{
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(251, 146, 60, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <i className="fas fa-chart-line text-warning"></i>
                                  <span>Sales Dashboard</span>
                                </Link>
                              </li>
                            </>
                          )}
                          
                          {user?.role_name === 'warehouse' && (
                            <>
                              <li>
                                <Link className="dropdown-item text-white d-flex align-items-center gap-2" 
                                  href="/warehouse/dashboard"
                                  style={{
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <i className="fas fa-warehouse text-info"></i>
                                  <span>Warehouse Dashboard</span>
                                </Link>
                              </li>
                            </>
                          )}
                          
                          <li><hr className="dropdown-divider" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} /></li>
                          <li>
                            <button 
                              className="dropdown-item text-white d-flex align-items-center gap-2"
                              onClick={handlelogout}
                              style={{
                                borderRadius: '8px',
                                padding: '8px 12px',
                                transition: 'all 0.3s ease',
                                border: 'none',
                                background: 'transparent',
                                width: '100%'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <i className="fas fa-sign-out-alt text-danger"></i>
                              <span>ออกจากระบบ</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Mobile Login Button */}
                  <div style={{ width: '100%', maxWidth: '200px' }}>
                    {tokenState ? (
                      <button
                        type="button"
                        onClick={handlelogout}
                        className="btn btn-outline-danger w-100"
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
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        }}
                      >
                        ออกจากระบบ
                      </button>
                    ) : (
                      <Link
                        className="btn btn-outline-light w-100"
                        href="/login"
                        role="button"
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
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        }}
                      >
                        เข้าสู่ระบบ
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </LiquidWeb>
    </header>
  );
}
