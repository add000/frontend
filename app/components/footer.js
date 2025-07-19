//import ใน /app/layout.js

export default function Footer() {
  return (
    <div 
      className="w-100" 
      style={{ 
        backgroundColor: '#f8f9fa',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        marginTop: '2rem',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
        height: '85vh', 
        width: '100vw' 
      }}
    >
      <footer className="py-5">
        <div className="container-fluid px-4 px-md-5">
          <div className="row g-4">
            {/* Company Info Section */}
            <div className="col-12 col-lg-4 mb-4">
              <div className="pe-lg-4">
                <h3 className="fw-bold mb-3" style={{ color: '#2d3748' }}>Your Company</h3>
                <p className="mb-4 lh-lg" style={{ color: '#718096' }}>
                  เราคือบริษัทที่มุ่งมั่นในการให้บริการที่ดีที่สุด 
                  พร้อมนวัตกรรมใหม่ๆ เพื่อลูกค้าทุกท่าน
                </p>
                <div className="d-flex gap-3">
                  <a href="#" 
                     style={{ 
                       fontSize: '1.2rem', 
                       transition: 'all 0.3s ease',
                       backgroundColor: '#e2e8f0',
                       color: '#4a5568',
                       padding: '12px',
                       borderRadius: '12px',
                       width: '45px',
                       height: '45px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       textDecoration: 'none'
                     }}
                     onMouseOver={(e) => {
                       e.target.style.backgroundColor = '#cbd5e0';
                       e.target.style.transform = 'translateY(-2px)';
                     }}
                     onMouseOut={(e) => {
                       e.target.style.backgroundColor = '#e2e8f0';
                       e.target.style.transform = 'translateY(0)';
                     }}>
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" 
                     style={{ 
                       fontSize: '1.2rem', 
                       transition: 'all 0.3s ease',
                       backgroundColor: '#e2e8f0',
                       color: '#4a5568',
                       padding: '12px',
                       borderRadius: '12px',
                       width: '45px',
                       height: '45px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       textDecoration: 'none'
                     }}
                     onMouseOver={(e) => {
                       e.target.style.backgroundColor = '#cbd5e0';
                       e.target.style.transform = 'translateY(-2px)';
                     }}
                     onMouseOut={(e) => {
                       e.target.style.backgroundColor = '#e2e8f0';
                       e.target.style.transform = 'translateY(0)';
                     }}>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" 
                     style={{ 
                       fontSize: '1.2rem', 
                       transition: 'all 0.3s ease',
                       backgroundColor: '#e2e8f0',
                       color: '#4a5568',
                       padding: '12px',
                       borderRadius: '12px',
                       width: '45px',
                       height: '45px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       textDecoration: 'none'
                     }}
                     onMouseOver={(e) => {
                       e.target.style.backgroundColor = '#cbd5e0';
                       e.target.style.transform = 'translateY(-2px)';
                     }}
                     onMouseOut={(e) => {
                       e.target.style.backgroundColor = '#e2e8f0';
                       e.target.style.transform = 'translateY(0)';
                     }}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" 
                     style={{ 
                       fontSize: '1.2rem', 
                       transition: 'all 0.3s ease',
                       backgroundColor: '#e2e8f0',
                       color: '#4a5568',
                       padding: '12px',
                       borderRadius: '12px',
                       width: '45px',
                       height: '45px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       textDecoration: 'none'
                     }}
                     onMouseOver={(e) => {
                       e.target.style.backgroundColor = '#cbd5e0';
                       e.target.style.transform = 'translateY(-2px)';
                     }}
                     onMouseOut={(e) => {
                       e.target.style.backgroundColor = '#e2e8f0';
                       e.target.style.transform = 'translateY(0)';
                     }}>
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-6 col-md-4 col-lg-2 mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#2d3748' }}>บริการ</h5>
              <ul className="nav flex-column gap-2">
                <li className="nav-item">
                  <a href="#" className="nav-link p-0" 
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
                    เว็บไซต์
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link p-0" 
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
                    แอปพลิเคชัน
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link p-0" 
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
                    ปรึกษา
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link p-0" 
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
                    ซัพพอร์ต
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="col-6 col-md-4 col-lg-2 mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#2d3748' }}>บริษัท</h5>
              <ul className="nav flex-column gap-2">
                <li className="nav-item">
                  <a href="#" className="nav-link p-0" 
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
                    เกี่ยวกับเรา
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link p-0" 
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
                    ทีมงาน
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link p-0" 
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
                    ข่าวสาร
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link p-0" 
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
                    ติดต่อเรา
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="col-12 col-md-4 col-lg-4 mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#2d3748' }}>รับข่าวสารจากเรา</h5>
              <p className="mb-3" style={{ color: '#718096' }}>
                สมัครรับข้อมูลข่าวสารและโปรโมชั่นพิเศษจากเรา
              </p>
              <form className="d-flex flex-column flex-sm-row gap-2">
                <div className="flex-grow-1">
                  <input
                    type="email"
                    className="form-control py-3 px-4"
                    placeholder="อีเมลของคุณ"
                    style={{ 
                      backgroundColor: '#ffffff', 
                      border: '2px solid #e2e8f0',
                      color: '#2d3748',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a0aec0';
                      e.target.style.boxShadow = '0 0 0 3px rgba(160, 174, 192, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <button 
                  className="btn px-4 py-3 fw-semibold"
                  type="button"
                  style={{ 
                    backgroundColor: '#4a5568',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#2d3748';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#4a5568';
                    e.target.style.transform = 'translateY(0)';
                  }}>
                  สมัคร
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-top pt-4 mt-5" style={{ borderColor: '#e2e8f0' }}>
            <div className="row align-items-center">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <p className="mb-0" style={{ color: '#718096' }}>
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
  );
}