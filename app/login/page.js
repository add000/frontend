export default function LoginPage() {
  return (
    <div className            = "container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <form className         = "border p-4 rounded">
        <div className        = "mb-3">

          <label 
          htmlFor             = "exampleInputText1"
          className           = "form-label">
            Username
          </label>

          <input 
          type                = "text"
          className           = "form-control"
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
          className           = "form-control"
          id                  = "exampleInputPassword1"
          placeholder         = "อย่าลืมใส่รหัสผ่านของคุณด้วยละ"
          />

        </div>
        <div className        = "mb-3 form-check">
          <input 
          type                = "checkbox"
          className           = "form-check-input"
          id                  = "exampleCheck1" />
          <label 
          className           = "form-check-label"
          htmlFor             = "exampleCheck1">
            จำข้าไว้
          </label>

        </div>

        <button 
        type                  = "submit"
        className             = "btn btn-primary">
          เข้าสู่ระบบ
        </button>

        <br />
        <br />

        <div>
          <flex style         = {{ gap: '6em', display: 'flex', justifyContent: 'center' }}>
          <a href             = "/forgot-password" className="text-decoration-none">ลืมรหัสผ่าน?</a>
          <a href             = "/register" className="text-decoration-none">สมัครสมาชิก</a>
          </flex>
        </div>

      </form>
    </div>
  );
}