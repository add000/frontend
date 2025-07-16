export default function LoginPage() {
  return (

    <div className            = "container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <form className         = "border-none p-5 rounded-5" style={{backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'}}>
        <div className        = "mb-3">

          <label 
          htmlFor             = "exampleInputText1"
          className           = "form-label">
            Username
          </label>

          <input 
          type                = "text"
          className           = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                  = "exampleInputText1"
          aria-describedby    = "TextHelp"
          placeholder         = "โปรดใส่ชื่อของคุณ"
          />

          <div 
          id                  = "TextHelp"
          className           = "form-text">
            ข้าพเจ้าอยากจะทราบชื่อของคุน
          </div>

        </div>
        <div className        = "mb-3">
          
          <label 
          htmlFor             = "exampleInputPassword1"
          className           = "form-label">
            Password
          </label>

          <input 
          type                = "password"
          className           = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                  = "exampleInputPassword1"
          placeholder         = "อย่าลืมใส่รหัสผ่านของคุณด้วยละ"
          />

        </div>
        <div className        = "mb-3 form-check">
          <input 
          type                = "checkbox"
          className           = "form-check-input bg-transparent focus:outline-none"
          id                  = "exampleCheck1" />
          <label 
          className           = "form-check-label"
          htmlFor             = "exampleCheck1">
            จำข้าไว้
          </label>

        </div>

        <div content="flex" style={{ display: 'flex', justifyContent: 'end', gap: '1em' }}>
        <a className="btn btn-primary" href="/" role="button">ย้อนกลับ</a>

        <button 
        type                  = "submit"
        className             = "btn btn-primary">
          เข้าสู่ระบบ
        </button>
        </div>

        <br />
        <br />

        <div>
          <div style         = {{ gap: '6em', display: 'flex', justifyContent: 'center' }}>
          <a href             = "/forgot-password" className="text-decoration-none">ลืมรหัสผ่าน?</a>
          <a href             = "/register" className="text-decoration-none">สมัครสมาชิก</a>
          </div>
        </div>

      </form>
    </div>
  );
}