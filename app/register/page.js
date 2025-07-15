export default function RegisterPage() {
  return (
    <div className            = "container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <form className         = "border p-4 rounded">
        <div className        = "mb-3">

          <label 
          htmlFor             = "exampleInputEmail1"
          className           = "form-label">
            Username
          </label>

          <input 
          type                = "text"
          className           = "form-control"
          id                  = "exampleInputText1"
          aria-describedby    = "TextHelp"
          placeholder         = "โปรดตั้งชื่อผู้ใช้ของคุณ"
          />

          <div 
          id                  = "TextHelp"
          className           = "form-text">
            
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
          placeholder         = "สร้างรหัสผ่าน"
          />

        </div>
        
        <label 
          htmlFor             = "exampleInputText1"
          className           = "form-label">
            คำนำหน้าชื่อ
        </label>
        <select className     = "form-select" aria-label="Default select example">
            <option>โปรดเลือกคำนำหน้าชื่อ</option>
            <option value     = "1">นาย</option>
            <option value     = "2">นาง</option>
            <option value     = "3">นางสาว</option>
        </select>

        <br/>

        <div className        = "mb-3">
          
        <label 
          htmlFor             = "exampleInputText1"
          className           = "form-label">
            ชื่อของคุณ
        </label>

        <input 
          type                = "text"
          className           = "form-control"
          id                  = "exampleInputText1"
          placeholder         = "ใส่ชื่อของคุณที่นี่ซะ"
          />

        </div>

        <div className        = "mb-3">
          
        <label 
          htmlFor             = "exampleInputText1"
          className           = "form-label">
            นามสกุล
        </label>

        <input 
          type                = "text"
          className           = "form-control"
          id                  = "exampleInputText1"
          placeholder         = "ใส่นามสกุลของคุณด้วย"
          />

        </div>

        <div className        = "mb-3">
        <label 
        htmlFor               = "exampleFormControlTextarea1"
        className             = "form-label">
           ที่อยู่ของคุณ
        </label>
        <textarea 
        className             = "form-control"
        id                    = "exampleFormControlTextarea1"
        rows                  = {3} />
        </div>

        
        <label 
          htmlFor             = "exampleInputText1"
          className           = "form-label">
            เพศ
        </label>
        <div>

            <div className    = "form-check form-check-inline">
            <input className  = "form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
            <label className  = "form-check-label" htmlFor="radioDefault1">
                ชาย
            </label>
            </div>
            <div className    = "form-check form-check-inline">
            <input className  = "form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
            <label className  = "form-check-label" htmlFor="radioDefault2">
                หญิง
            </label>
            </div>
            <div className    = "form-check form-check-inline">
            <input className  = "form-check-input" type="radio" name="radioDefault" id="radioDefault3"  />
            <label className  = "form-check-label" htmlFor="radioDefault3">
                อื่นๆ
            </label>
            </div>
            <div className    = "form-check form-check-inline">
            <input className  = "form-check-input" type="radio" name="radioDefault" id="radioDefault4" />
            <label className  = "form-check-label" htmlFor="radioDefault4">
                ไม่ระบุ
            </label>
            </div>
        </div>

        <br />
        
        <div className        = "mb-3">
          <label 
          htmlFor             = "exampleInputText1"
          className           = "form-label">
            วันเกิดของท่าน
          </label>
          <input 
          type                = "date"
          className           = "form-control"
          id                  = "exampleInputdate1"
          placeholder         = "โปรดใส่วันเกิดของคุณ"
          />
        </div>

        <br />

        <div className        = "mb-3 form-check">
          <input 
          type                = "checkbox"
          className           = "form-check-input"
          id                  = "exampleCheck1" />
          <label 
          className           = "form-check-label"
          htmlFor             = "exampleCheck1">
            ฉันยอมรับข้อกำหนดและเงื่อนไขของเว็บไซต์นี้
          </label>

        </div>

        <br />

        <div content="flex" style={{ display: 'flex', justifyContent: 'end', gap: '1em' }}>
        <a className="btn btn-primary" href="/login" role="button">ย้อนกลับ</a>
        <button 
        type                  = "submit"
        className             = "btn btn-primary">
            สมัครสมาชิก
        </button>
        </div>

      </form>
    </div>
  );
}