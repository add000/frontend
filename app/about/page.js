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
      <div className="bg-black" style={{ width: "100vw", height: "auto", }}>
        <div className="container px-4" style={{ paddingTop: "6em", paddingBottom: "6em", textAlign: "center", color: "white", textShadow: "0px 0px 15px rgba(255, 255, 255, 1)", }}>
          <h1 style={{ fontSize: "2.5em", fontWeight: "bold", fontSmooth: "antialiased", }}>เกี่ยวกับเรา</h1>
          <br />
          <p style={{ fontSize: "1.5em", }}>
            enerally, developers are well versed in at least one programming language and proficient in the art of structuring and developing software code or a program. Depending on the job role and type of software developed, there are numerous types of developers, such as software developers, application developers, mobile developers, web developers, etc.
          </p>
        </div>
      </div>
    </>
  );
}
