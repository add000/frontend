export default function About() {
  return (
    <>
      <div className="d-flex">
        <div className="position-relative bg-black">
          <img
            src="/nikki_p.jpeg"
            className="img-fluid"
            style={{ height: "50vh", width: "100vw", objectFit: "cover", marginTop: "6em" }}
          />
          <div
            className="position-absolute text-start"
            style={{
              marginTop: "-30vh",
              marginLeft: "2.5em",
              color: "white",
              fontSize: "2.5em",
              fontWeight: "bold",
              fontSmooth: "antialiased",
              textShadow: "0px 0px 20px rgba(255, 255, 255, 1)",
              zIndex: 2
            }}
          >
            About Us
          </div>
          <div
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
              zIndex: 1,
              marginTop: "6em",
              pandingBottom: "6em"
            }}
          ></div>
        </div>
      </div>
      <div className="bg-black" style={{ width: "100vw", height: "auto", }}>
        <div className="container px-4" style={{ paddingTop: "6em", paddingBottom: "6em", textAlign: "center", color: "white", textShadow: "0px 0px 15px rgba(255, 255, 255, 1)", }}>
          <h1 style={{ fontSize: "2.5em", fontWeight: "bold", fontSmooth: "antialiased", }}>เกี่ยวกับเรา</h1>
          <br />
          <p style={{ fontSize: "1.5em", }}>
            fontend fontend fontend fontend fontend fontend fontend fontend fontend fontend
            fontend fontend fontend fontend fontend fontend fontend fontend fontend fontend
            fontend fontend fontend fontend fontend fontend fontend fontend fontend fontend
            fontend fontend fontend fontend fontend fontend fontend fontend fontend fontend
            fontend fontend fontend fontend fontend fontend fontend fontend fontend fontend
            fontend fontend fontend fontend fontend fontend fontend fontend fontend fontend
            fontend fontend fontend fontend fontend fontend fontend fontend fontend fontend
            fontend fontend fontend fontend fontend fontend fontend fontend fontend fontend
          </p>
        </div>
      </div>
    </>
  );
}
