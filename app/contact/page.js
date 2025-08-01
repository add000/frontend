export default function ContactPage() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0)',}}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="row shadow rounded-5 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'}}>
          {/* Info Panel */}
          <div className="col-md-5 d-flex flex-column justify-content-center bg-dark text-white p-4">
            <h3 className="mb-4">ติดต่อเรา</h3>
            <p><i className="fas fa-map-marker-alt me-2"></i> 123 เชียงใหม่, ประเทศไทย 50200</p>
            <p><i className="fas fa-phone me-2"></i> 02-123-4567</p>
            <p><i className="fas fa-envelope me-2"></i> info@example.com</p>
            <p><i className="fas fa-clock me-2"></i> จ.-ศ. 9:00-18:00</p>
          </div>

          {/* Form Panel */}
          <div className="col-md-7 p-5">
            <form>
              <div className="mb-3">
                <label className="form-label">ชื่อ-นามสกุล</label>
                <input type="text" className="form-control rounded-5 border-secondary bg-transparent" placeholder="กรอกชื่อของคุณ" />
              </div>
              <div className="mb-3">
                <label className="form-label">อีเมล</label>
                <input type="email" className="form-control rounded-5 border-secondary bg-transparent" placeholder="you@example.com" />
              </div>
              <div className="mb-4">
                <label className="form-label">ข้อความ</label>
                <textarea className="form-control rounded-4 border-secondary bg-transparent" rows="4" placeholder="เขียนข้อความของคุณที่นี่..."></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100 rounded-5">
                ส่งข้อความ <i className="fas fa-paper-plane ms-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
