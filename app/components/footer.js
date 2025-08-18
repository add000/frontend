//import ใน /app/layout.js
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Footer() {
  return (
    <div>
      <section className="py-2 bg-dark" style={{ objectFit: 'cover' }}>
        <div className="container px-4 px-md-5" style={{ objectFit: 'cover' }}>
          <div
            className="d-flex flex-wrap justify-content-center gap-4"
            style={{ textAlign: 'center' }}
          >
            {[
              { href: '#', icon: 'fab fa-steam' },
              { href: 'https://xbox.com', icon: 'fab fa-xbox' },
              { href: 'https://youtube.com', icon: 'fab fa-youtube' },
              { href: '#', icon: 'fab fa-mastodon' },
              { href: '#', icon: 'fab fa-telegram' },
              { href: 'https://discord.com', icon: 'fab fa-discord' },
              { href: 'https://github.com', icon: 'fab fa-github' },
              { href: 'https://linkedin.com', icon: 'fab fa-linkedin' },
              { href: 'mailto:your.email@example.com', icon: 'fas fa-envelope' },
              { href: 'https://twitter.com', icon: 'fab fa-x-twitter' }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '2rem',
                  transition: 'all 0.3s ease',
                  color: '#4a5568',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
              >
                <i className={item.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div
        className="w-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          marginTop: '0rem',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <footer className="py-5">
          <div className="container-fluid px-4 px-md-5">
            <div className="row g-4">
              {/* Personal Info Section */}
              <div className="col-12 col-lg-4 mb-4">
                <div className="pe-lg-4">
                  <h3 className="fw-bold mb-3" style={{ color: '#2d3748' }}>John Doe</h3>
                  <p className="mb-4 lh-lg" style={{ color: '#718096' }}>
                    Full Stack Developer & UI/UX Designer
                    <br />
                    สร้างสรรค์เว็บไซต์และแอปพลิเคชันที่สวยงามและใช้งานง่าย
                    พร้อมประสบการณ์ที่น่าประทับใจสำหรับผู้ใช้งาน
                  </p>
                </div>
              </div>

              {/* Portfolio Links */}
              <div className="col-6 col-md-4 col-lg-2 mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: '#2d3748' }}>ผลงาน</h5>
                <ul className="nav flex-column gap-2">
                  <li className="nav-item">
                    <a href="#projects" className="nav-link p-0"
                      style={{
                        color: '#718096',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#4a5568';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#718096';
                        e.target.style.paddingLeft = '0';
                      }}>
                      โปรเจค
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#skills" className="nav-link p-0"
                      style={{
                        color: '#718096',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#4a5568';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#718096';
                        e.target.style.paddingLeft = '0';
                      }}>
                      ทักษะ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#experience" className="nav-link p-0"
                      style={{
                        color: '#718096',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#4a5568';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#718096';
                        e.target.style.paddingLeft = '0';
                      }}>
                      ประสบการณ์
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#certifications" className="nav-link p-0"
                      style={{
                        color: '#718096',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#4a5568';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#718096';
                        e.target.style.paddingLeft = '0';
                      }}>
                      ใบรับรอง
                    </a>
                  </li>
                </ul>
              </div>

              {/* About Links */}
              <div className="col-6 col-md-4 col-lg-2 mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: '#2d3748' }}>เกี่ยวกับ</h5>
                <ul className="nav flex-column gap-2">
                  <li className="nav-item">
                    <a href="#about" className="nav-link p-0"
                      style={{
                        color: '#718096',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#4a5568';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#718096';
                        e.target.style.paddingLeft = '0';
                      }}>
                      เกี่ยวกับฉัน
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#blog" className="nav-link p-0"
                      style={{
                        color: '#718096',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#4a5568';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#718096';
                        e.target.style.paddingLeft = '0';
                      }}>
                      บล็อก
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#resume" className="nav-link p-0"
                      style={{
                        color: '#718096',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#4a5568';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#718096';
                        e.target.style.paddingLeft = '0';
                      }}>
                      เรซูเม่
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#contact" className="nav-link p-0"
                      style={{
                        color: '#718096',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#4a5568';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#718096';
                        e.target.style.paddingLeft = '0';
                      }}>
                      ติดต่อ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Section */}
              <div className="col-12 col-md-4 col-lg-4 mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: '#2d3748' }}>ติดต่อฉัน</h5>
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-envelope me-3" style={{ color: '#4a5568', width: '20px' }}></i>
                    <a href="mailto:your.email@example.com"
                      style={{ color: '#718096', textDecoration: 'none' }}
                      onMouseOver={(e) => e.target.style.color = '#4a5568'}
                      onMouseOut={(e) => e.target.style.color = '#718096'}>
                      your.email@example.com
                    </a>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-phone me-3" style={{ color: '#4a5568', width: '20px' }}></i>
                    <a href="tel:+66123456789"
                      style={{ color: '#718096', textDecoration: 'none' }}
                      onMouseOver={(e) => e.target.style.color = '#4a5568'}
                      onMouseOut={(e) => e.target.style.color = '#718096'}>
                      +66 12 345 6789
                    </a>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-map-marker-alt me-3" style={{ color: '#4a5568', width: '20px' }}></i>
                    <span style={{ color: '#718096' }}>
                      123 เชียงใหม่, ประเทศไทย 50200
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-top pt-4 mt-5" style={{ borderColor: '#e2e8f0' }}>
              <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <p className="mb-0" style={{ color: '#718096', }}>
                    © 2025 Your Company. สงวนลิขสิทธิ์ทุกประการ
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <ul className="nav justify-content-md-end gap-4">
                    <li className="nav-item">
                      <a href="#" className="nav-link p-0 text-light opacity-75 hover-opacity-100"
                        style={{ transition: 'all 0.3s ease' }}
                        onMouseOver={(e) => e.target.style.opacity = '1'}
                        onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                        นโยบายความเป็นส่วนตัว
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link p-0 text-light opacity-75 hover-opacity-100"
                        style={{ transition: 'all 0.3s ease' }}
                        onMouseOver={(e) => e.target.style.opacity = '1'}
                        onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                        เงื่อนไขการใช้งาน
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}