'use client';
import Carousel from './components/carousel';
import Card from './components/card';




export default function Home() {
  return (
    <main>
      <Carousel />
      <div className="position-relative bg-black">
        <img
          src="/p/p2.jpg"
          className="img-fluid"
          style={{ height: "50vh", width: "100vw", }}
        />
        <div
          className="position-absolut text-center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "2.5em",
            fontWeight: "bold",
            textShadow: "0px 1px 0px rgba(255, 255, 255, 0)" +
              ", 0px 3px 0px rgba(255, 255, 255, 0.8)" +
              ", 0px 6px 0px rgba(255, 255, 255, 0.6)" +
              ", 0px 9px 0px rgba(255, 255, 255, 0.4)" +
              ", 0px 12px 0px rgba(255, 255, 255, 0.2)" ,

            padding: "0 20px",
            zIndex: 2,
          }}
        >
          Font<span className="text" style={{ }}>End</span> Development
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
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5), rgba(0,0,0,1))",
            zIndex: 1,
            pandingBottom: "6em"
          }}
        ></div>
      </div>
      <Card />
    </main>
  );
}