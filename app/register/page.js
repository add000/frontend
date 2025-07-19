export default function RegisterPage() {
  return (
    <div className            = "container" style={{ maxWidth: '400px', padding: '20px', margin: '0 auto', marginTop: '100px', marginBottom: '100px' }}>
      <form className         = "border-none rounded-5 p-5" style={{backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'}} noValidate>
        
        <div className        = "mb-3">
          <label 
          htmlFor             = "validationCustomUsername"
          className           = "form-label">
            Username
          </label>
          <input 
          type                = "text"
          className           = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                  = "validationCustomUsername"
          aria-describedby    = "TextHelp"
          placeholder         = "โปรดตั้งชื่อผู้ใช้ของคุณ"
          required
          />
          <div className="valid-feedback">
            Looks good!
          </div>
          <div 
          id                  = "TextHelp"
          className           = "form-text">
          </div>
        </div>

        <div className        = "mb-3">
          <label 
          htmlFor             = "evalidationCustomPassword"
          className           = "form-label">
            Password
          </label>
          <input 
          type                = "password"
          className           = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                  = "evalidationCustomPassword"
          placeholder         = "สร้างรหัสผ่าน"
          required
          />
        <div className="valid-feedback">
          Looks good!
        </div>
        </div>
        
        <label 
          htmlFor             = "validationCustomSelect1"
          className           = "form-label">
            คำนำหน้าชื่อ
        </label>
        
        <select className     = "form-select bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none" 
        aria-label="Default select example"
        htmlFor             = "validationCustomSelect1"
        required>
            <option>โปรดเลือกคำนำหน้าชื่อ</option>
            <option value     = "1">นาย</option>
            <option value     = "2">นาง</option>
            <option value     = "3">นางสาว</option>
        </select>

        <br/>

        <div className        = "mb-3">
          
        <label 
          htmlFor             = "validationCustom01"
          className           = "form-label">
            ชื่อของคุณ
        </label>

        <input 
          type                = "text"
          className           = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                  = "validationCustom01"
          placeholder         = "ใส่ชื่อของคุณที่นี่ซะ"
          required
          />
          <div className="valid-feedback">
            Looks good!
          </div>

        </div>

        <div className        = "mb-3">
          
        <label 
          htmlFor             = "validationCustom02"
          className           = "form-label">
            นามสกุล
        </label>

        <input 
          type                = "text"
          className           = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                  = "validationCustom02"
          placeholder         = "ใส่นามสกุลของคุณด้วย"
          required
          />

        </div>

        <div className        = "mb-3">
        <label 
        htmlFor               = "validationCustom03"
        className             = "form-label">
           ที่อยู่ของคุณ
        </label>
        <textarea 
        className             = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
        id                    = "validationCustom03"
        rows                  = {3} 
        placeholder           = "ใส่ที่อยู่ของคุณ"
        required
        />
        <div className="invalid-feedback">
          Please provide a valid city.  
        </div>
        </div>

        
        <label 
          htmlFor             = "validationCustom04"
          className           = "form-label">
            เพศ
        </label>
        <div>

            <div className    = "form-check form-check-inline">
            <input className  = "form-check-input bg-transparent focus:outline-none" type="radio" name="radioDefault" id="radioDefault1" />
            <label className  = "form-check-label" htmlFor="radioDefault1">
                ชาย
            </label>
            </div>
            <div className    = "form-check form-check-inline">
            <input className  = "form-check-input bg-transparent focus:outline-none" type="radio" name="radioDefault" id="radioDefault2" />
            <label className  = "form-check-label" htmlFor="radioDefault2">
                หญิง
            </label>
            </div>
            <div className    = "form-check form-check-inline">
            <input className  = "form-check-input bg-transparent focus:outline-none" type="radio" name="radioDefault" id="radioDefault3"  />
            <label className  = "form-check-label" htmlFor="radioDefault3">
                อื่นๆ
            </label>
            </div>
            <div className    = "form-check form-check-inline">
            <input className  = "form-check-input bg-transparent focus:outline-none" type="radio" name="radioDefault" id="radioDefault4" />
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
          className           = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                  = "exampleInputdate1"
          placeholder         = "โปรดใส่วันเกิดของคุณ"
          />
        </div>

        <br />

        <div className        = "mb-3 form-check">
          <input 
          type                = "checkbox"
          className           = "form-check-input bg-transparent focus:outline-none"
          id                  = "exampleCheck1" />
          <label 
          className           = "form-check-label"
          htmlFor             = "exampleCheck1">
            ฉันยอมรับข้อกำหนดและเงื่อนไขของเว็บไซต์นี้
          </label>

        </div>

    <div style={{
          display                       : 'flex',
          flexDirection                 : 'column',
          alignItems                    : 'center',
          gap                           : '10px'
        }}>

          <a 
            role                        = "button"
            className                   = "btn btn-outline-light w-100"
            href                        = "/login"
            style={{                    
              borderRadius    : '25px',
              padding         : '12px 25px',
              fontWeight      : '500',
              border          : '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor : 'rgba(255, 255, 255, 0.1)',
              backdropFilter  : 'blur(10px)',
              color           : 'white',
              textShadow      : '0 1px 6px rgba(0, 0, 0, 0.3)',
              transition      : 'all 0.3s ease',
              boxShadow       : 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              width           : '300px',
              textAlign       : 'center',
            }}>
              ย้อนกลับ
          </a>

          <a 
            type                        = "register"
            className                   = "btn btn-outline-light w-100"
            href                        = "#"
            style={{                    
              borderRadius    : '25px',
              padding         : '12px 25px',
              fontWeight      : '500',
              border          : '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor : 'rgba(255, 255, 255, 0.1)',
              backdropFilter  : 'blur(10px)',
              color           : 'white',
              textShadow      : '0 1px 6px rgba(0, 0, 0, 0.3)',
              transition      : 'all 0.3s ease',
              boxShadow       : 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              width           : '300px',
              textAlign       : 'center',
            }}>
              สมัครสมาชิก
          </a>
    </div>

      </form>
    </div>
  );
}
