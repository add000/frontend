'use client';
// components/LiquidNavbar.tsx
import { LiquidWeb } from 'liquid-web/react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LiquidNavbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  // Reset inline styles เมื่อ pathname เปลี่ยน
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !isActive(href)) {
        // Reset inline styles สำหรับปุ่มที่ไม่ active
        link.style.background = '';
        link.style.backdropFilter = '';
        link.style.transform = '';
        link.style.boxShadow = '';
      }
    });
  }, [pathname]);

  useEffect(() => {
    const loadBootstrap = async () => {
      if (typeof window !== 'undefined') {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }
    };

    loadBootstrap();
  }, []);

  const getNavLinkStyle = (path) => ({
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    background: isActive(path) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    backdropFilter: isActive(path) ? 'blur(10px)' : 'none',
    border: isActive(path) ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
    margin: '0 3px',
    boxShadow: isActive(path) ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
    fontSize: '14px',
    fontWeight: '400',
    minWidth: '80px',
    textAlign: 'center'
  });

  // สำหรับหน้าจอเล็ก
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
    width: '160px'
  });

  const handleMouseEnter = (e, path) => {
    if (!isActive(path)) {
      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
      e.target.style.backdropFilter = 'blur(10px)';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    }
  };

  const handleMouseLeave = (e, path) => {
    if (!isActive(path)) {
      e.target.style.background = '';
      e.target.style.backdropFilter = '';
      e.target.style.transform = '';
      e.target.style.boxShadow = '';
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
          {/* Fluid Glass Overlay */}
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
                width={32}
                height={32}
                className="d-inline-block align-text-top"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }}
              />
              FrontEnd
            </Link>
            <br />
            <br />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="navbar-toggler-icon" style={{
                filter: 'invert(1) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
              }} />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* Desktop Navigation */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-none d-lg-flex">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive('/') ? 'active' : ''}`}
                      aria-current={isActive('/') ? 'page' : undefined}
                      href="/"
                      style={getNavLinkStyle('/')}
                      onMouseEnter={(e) => handleMouseEnter(e, '/')}
                      onMouseLeave={(e) => handleMouseLeave(e, '/')}>
                      หน้าแรก
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                      href="/about"
                      style={getNavLinkStyle('/about')}
                      onMouseEnter={(e) => handleMouseEnter(e, '/about')}
                      onMouseLeave={(e) => handleMouseLeave(e, '/about')}>
                      เกี่ยวกับเรา
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive('/service') ? 'active' : ''}`}
                      href="/service"
                      style={getNavLinkStyle('/service')}
                      onMouseEnter={(e) => handleMouseEnter(e, '/service')}
                      onMouseLeave={(e) => handleMouseLeave(e, '/service')}>
                      บริการของเรา
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/contact"
                      className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                      style={getNavLinkStyle('/contact')}
                      onMouseEnter={(e) => handleMouseEnter(e, '/contact')}
                      onMouseLeave={(e) => handleMouseLeave(e, '/contact')}>
                      ติดต่อเรา
                    </Link>
                  </li>
                </div>
              </ul>

              {/* Mobile Navigation */}
              <div className="d-lg-none w-100">
                <div className="d-flex flex-column align-items-center" style={{ gap: '8px', padding: '15px 0' }}>
                  <Link
                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    aria-current={isActive('/') ? 'page' : undefined}
                    href="/"
                    style={getMobileNavLinkStyle('/')}
                    onMouseEnter={(e) => handleMouseEnter(e, '/')}
                    onMouseLeave={(e) => handleMouseLeave(e, '/')}>
                    หน้าแรก
                  </Link>
                  <Link
                    className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                    href="/about"
                    style={getMobileNavLinkStyle('/about')}
                    onMouseEnter={(e) => handleMouseEnter(e, '/about')}
                    onMouseLeave={(e) => handleMouseLeave(e, '/about')}>
                    เกี่ยวกับเรา
                  </Link>
                  <Link
                    className={`nav-link ${isActive('/service') ? 'active' : ''}`}
                    href="/service"
                    style={getMobileNavLinkStyle('/service')}
                    onMouseEnter={(e) => handleMouseEnter(e, '/service')}
                    onMouseLeave={(e) => handleMouseLeave(e, '/service')}>
                    บริการของเรา
                  </Link>
                  <Link
                    href="/contact"
                    className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                    style={getMobileNavLinkStyle('/contact')}
                    onMouseEnter={(e) => handleMouseEnter(e, '/contact')}
                    onMouseLeave={(e) => handleMouseLeave(e, '/contact')}>
                    ติดต่อเรา
                  </Link>

                  {/* Mobile Login Button */}
                  <div style={{ marginTop: '15px', width: '100%', maxWidth: '200px' }}>
                    <a className="btn btn-outline-light w-100" href="/login" role="button" style={{
                      borderRadius: '25px',
                      padding: '12px 25px',
                      fontWeight: '500',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                      }}>
                      เข้าสู่ระบบ
                    </a>
                  </div>
                </div>
              </div>

              {/* Desktop Login Button */}
              <div className="d-none d-lg-block">
                <Link className="btn btn-outline-light" href="/login" role='button' style={{
                  borderRadius: '25px',
                  padding: '10px 25px',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }}>
                  เข้าสู่ระบบ
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </LiquidWeb>
    </header>
  );
}
