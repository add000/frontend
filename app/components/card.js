//import ใน /app/page.js

export default function Card() {
    return (
    <div className="container-fluid text-light" style={{ backgroundColor: '#1F1713', padding: '20px' }}>
        <div className="row">
            <div className="col-md-12 text-center mb-4"></div>
            <div className="col-md-12 text-center mb-4">
                <h3>Our Project</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card text-light" style={{ backgroundColor: '#4F4337', boxShadow: '0 0px 30px rgba(255, 255, 255, 0.8)' }}>
                <img src="/nikki_p.jpeg" className="card-img-top img-responsive" alt="..." />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
            <div className="card text-light" style={{ backgroundColor: '#4F4337', boxShadow: '0 0px 30px rgba(255, 255, 255, 0.8)' }}>
                <img src="/nikki_p.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
            <div className="card text-light" style={{ backgroundColor: '#4F4337', boxShadow: '0 0px 30px rgba(255, 255, 255, 0.8)' }}>
                <img src="/nikki_p.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
                </div>
            </div>
      </div>
    </div>
    );
  }