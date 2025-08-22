export default function About() {
  return (
    <>
      <div className="d-flex">
        <div className="position-relative bg-black">
          <img
            src="/p/p3.jpg"
            className="img-fluid"
            style={{ height: "40vh", width: "100vw", objectFit: "cover", marginTop: "6em" }}
          />
          <div
            className="position-absolute text-start"
            style={{
              position: "absolute",
              top: "50%",
              left: "4em",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "2.5em",
              fontWeight: "bold",
              textShadow: "0px 0px 15px rgba(255, 255, 255, 1)",
              padding: "0 20px",
              zIndex: 2,
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
      <div className="bg" style={{ width: "100vw", height: "auto", backgroundColor: "#15151a",}}>
        <div className="container px-4" style={{ paddingTop: "6em", paddingBottom: "6em", textAlign: "center", color: "white", textShadow: "0px 0px 15px rgba(255, 255, 255, 1)", }}>
          <h1 style={{ fontSize: "", fontWeight: "bold", fontSmooth: "antialiased", }}>เกี่ยวกับเรา</h1>
          <br />
          <h5 style={{ fontSize: "", }}>
            มันคือศิลปะ
          </h5>
        </div>
      </div>
    </>
  );
}
