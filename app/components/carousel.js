//import ใน /app/page.js

'use client';
import { useEffect } from 'react';
import Image from "next/image";
export default function Carousel() {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return (
    <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image src="/p/c1.jpg"
            className="d-block w-100 object-fit-cover "
            alt="..." width={1920} height={690}
            style={{ height: '100vh', width: '100vw' }}
          />
        </div>
        <div className="carousel-item">
          <Image src="/p/c2.jpg"
            className="d-block w-100 object-fit-cover"
            alt="..." width={1920} height={690}
            style={{ height: '100vh', width: '100vw' }}
          />
        </div>
        <div className="carousel-item">
          <Image src="/p/c3.jpg"
            className="d-block w-100 object-fit-cover"
            alt="..." width={1920} height={690}
            style={{ height: '100vh', width: '100vw' }}
          />

        </div>

        <div
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,1))",
            zIndex: 1,
            marginTop: "6em",
            pandingBottom: "6em"
          }}>
        </div>

      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}