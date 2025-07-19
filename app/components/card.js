//import ใน /app/page.js

export default function Card() {
    return (
    <div className="container-fluid text-light" style={{          
            background: `
            linear-gradient(180deg, 
              rgba(0, 0, 0, ) 0%, 
              rgba(0, 0, 0, 0.80) 50%, 
              rgba(0, 0, 0, 0.0) 100%
            )
          `,
            padding: '20px' ,
            objectFit: 'cover',
          }}>
        <div className="row" style={{ margin: '100px'}}>
            <div className="col-md-12 text-center mb-4" style={{ textShadow: '0 0 52px rgba(255, 255, 255, 1)',}}>
                <h3 className="fw-bold fs-1 mb-auto ">Our Project</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card text-light rounded-5" style={{backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'}}>
                <img src="/bg0.jpeg" className="card-img-top img-responsive rounded-5" alt="..." />
                <div className="card-body">
                    <p className="card-text" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 1)', }}>Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
            <div className="card text-light rounded-5" style={{backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'}}>
                <img src="/bg0.jpeg" className="card-img-top rounded-5" alt="..." />
                <div className="card-body">
                    <p className="card-text" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 1)', }}>Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
            <div className="card text-light rounded-5" style={{backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'}}>
                <img src="/bg0.jpeg" className="card-img-top rounded-5" alt="..." />
                <div className="card-body">
                    <p className="card-text" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 1)', }}>Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
                </div>
            </div>
      </div>
    </div>
    );
  }