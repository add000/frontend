import React from 'react';

function SlideCardSingle({ imageSrc, title, description }) {
  return (
    <div>
      <div
        className="card overflow-hidden rounded-0"
        style={{
          width: '100vw',
          height: '50vh',
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          position: 'relative',
        }}
      >
        {/* ภาพ */}
        <div
          className="image-wrapper"
          style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
        >
          <img
            src={imageSrc}
            alt="Preview"
            className="slide-image"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
              zIndex: 1,
            }}
          />
        </div>

        {/* ข้อความด้านหลังภาพ */}
        <div
          className="text-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-start px-4"
          style={{
            zIndex: 0,
            opacity: 1,
            color: '#fff',
          }}
        >
          <h4 className="fw-bold mb-2">{title}</h4>
          <p className="mb-0">{description}</p>
        </div>
      </div>

      <style jsx>{`
        .card:hover .slide-image {
          transform: translateY(-100%);
        }
      `}</style>
    </div>
  );
}

export default function SlideCard() {
  return (
    <div className="card-container">
      {[
        { title: "Project One", description: "This card reveals text after sliding the image upward." },
        { title: "Project Two", description: "Another card with its own animation and timing." },
        { title: "Project Three", description: "Another card with its own animation and timing." },
        { title: "Project Four", description: "Another card with its own animation and timing." },
      ].map((card, index) => (
        <SlideCardSingle
          key={index}
          imageSrc={`/p/${index + 1}.jpg`} // Assuming images are named 1.jpg, 2.jpg, etc.
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
}
