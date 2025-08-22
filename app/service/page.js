export default function ServicesPage() {
  const services = [
    {
      title: "ออกแบบเว็บไซต์",
      description: "ดีไซน์เว็บไซต์สวยงาม ใช้งานง่าย รองรับทุกอุปกรณ์",
      icon: "bi-window",
    },
    {
      title: "พัฒนาแอปพลิเคชัน",
      description: "แอปมือถือทั้ง Android และ iOS ด้วยเทคโนโลยีทันสมัย",
      icon: "bi-phone",
    },
    {
      title: "การตลาดออนไลน์",
      description: "ช่วยเพิ่มยอดขายด้วย SEO และโฆษณาออนไลน์",
      icon: "bi-bar-chart-line",
    },
    {
      title: "ระบบจัดการภายใน",
      description: "ระบบหลังบ้าน เช่น POS, CRM, ERP ที่ปรับตามธุรกิจได้",
      icon: "bi-sliders",
    },
    {
      title: "Cloud Solution",
      description: "โฮสติ้ง, Cloud Storage, และการสำรองข้อมูล",
      icon: "bi-cloud",
    },
    {
      title: "ให้คำปรึกษาด้าน IT",
      description: "ช่วยวางระบบไอที ธุรกิจองค์กร หรือสตาร์ทอัพ",
      icon: "bi-lightbulb",
    },
  ];

  return (
    <>
      <div className="position-relative bg-black">
        <img
          src="/p/p2.jpg"
          className="img-fluid"
          style={{ height: "100vh", width: "100vw", objectFit: "cover" }}
        />
        <div
          className="position-absolute text-center w-100"
          style={{
            position: "absolute",
            top: "50%",
            color: "white",
            fontSize: "2.5em",
            fontWeight: "bold",
            textShadow: "0px 0px 15px rgba(255, 255, 255, 1)",
            padding: "0 20px",
            zIndex: 2,
          }}
        >
          บริการของเรา
        </div>
        <div
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0))",
            zIndex: 1,
            pandingBottom: "6em"
          }}
        ></div>
        <div
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0),rgba(0,0,0,0), #111111)",
            zIndex: 1,
            pandingBottom: "6em"
          }}
        >
      </div>
      </div>
      <div className="container-fluid min-vh-100 d-flex align-items-center py-5" style={{ backgroundColor: "#111111", }}>
        <div className="grid-container" style={{ paddingTop: "100px", height: "auto", width: "100vw", }}>
          {services.map((service, index) => (
            <div
              key={index}
              className="container-fluid d-flex align-items-center"
              style={{ height: "50vh", backgroundColor: index % 2 === 0 ? "#000000" : "#111111", }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-12 d-md-none text-center mb-3">
                    {/* Icon for small screens */}
                    <i className={`bi ${service.icon}`} style={{ fontSize: "3rem", color: "#ffffff" }}></i>
                  </div>

                  {index % 2 === 0 ? (
                    <>
                      <div className="col-md-4 d-none d-md-block text-center">
                        {/* Icon for medium+ screens */}
                        <i className={`bi ${service.icon}`} style={{ fontSize: "4rem", color: "#ffffff" }}></i>
                      </div>
                      <div className="col-md-8 col-12 text-md-start text-center" style={{ color: "#ffffff" }}>
                        <h3 className="fw-bold">{service.title}</h3>
                        <p className="text-light">{service.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-8 col-12 text-md-end text-center" style={{ color: "#ffffff" }}>
                        <h3 className="fw-bold">{service.title}</h3>
                        <p className="text-light">{service.description}</p>
                      </div>
                      <div className="col-md-4 d-none d-md-block text-center">
                        <i className={`bi ${service.icon}`} style={{ fontSize: "4rem", color: "#ffffff" }}></i>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
