export default function LoginPage() {
  return (
    
    <div className                      = "container"
    style={{ 
      maxWidth                          : '400px',
      padding                           : '20px',
      margin                            : '0 auto',
      marginTop                         : '100px'
    }}>

      <form className                   = "border-none p-5 rounded-5"
      style={{
        backdropFilter                  : 'blur(16px)',
        backgroundColor                 : 'rgba(0, 0, 0, 0)',
        boxShadow                       : '0 4px 20px rgba(0, 0, 0, 0.4)'
      }}>

        <div className                  = "mb-3">

          <label 
          htmlFor                       = "exampleInputText1"
          className                     = "form-label">
            Username
          </label>

          <input 
          type                          = "text"
          className                     = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                            = "exampleInputText1"
          aria-describedby              = "TextHelp"
          placeholder                   = "โปรดใส่ชื่อของคุณ"
          />

          <div 
          id                            = "TextHelp"
          className                     = "form-text">
            ข้าพเจ้าอยากจะทราบชื่อของคุน
          </div>

        </div>
        <div className                  = "mb-3">
          
          <label 
          htmlFor                       = "exampleInputPassword1"
          className                     = "form-label">
            Password
          </label>

          <input 
          type                          = "password"
          className                     = "form-control bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none bg-transparent border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
          id                            = "exampleInputPassword1"
          placeholder                   = "อย่าลืมใส่รหัสผ่านของคุณด้วยละ"
          />

        </div>
        <div className                  = "mb-3 form-check">
          <input 
          type                          = "checkbox"
          className                     = "form-check-input bg-transparent focus:outline-none"
          id                            = "exampleCheck1" />
          <label 
          className                     = "form-check-label"
          htmlFor                       = "exampleCheck1">
            จำข้าไว้
          </label>
        </div>

        <div style                      = {{
          display                       : 'flex',
          flexDirection                 : 'column',
          alignItems                    : 'center',
          gap                           : '10px'
          }}>

          <a 
            role                        = "button"
            className                   = "btn btn-outline-light w-100"
            href                        = "/"
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
                        textAlign       : 'center'
            }}>
            ย้อนกลับ
          </a>

          <a 
            type                        = "submit"
            className                   = "btn btn-outline-light w-100"
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
              textAlign       : 'center'
            }}>
            เข้าสู่ระบบ
          </a>
        </div>

        <br />
        <br />

        <div>
          <div style={{ 
            gap                         : '5rem',
            display                     : 'flex',
            justifyContent              : 'center',
          }}>

          <a href                       = "/forgot-password"
          className                     = "text-decoration-none link-body-emphasis link-offset-2">ลืมรหัสผ่าน?</a>
          <a href                       = "/register"
          className                     = "text-decoration-none link-body-emphasis link-offset-2">สมัครสมาชิก</a>
          </div>
        </div>

      </form>
    </div>
  );
}