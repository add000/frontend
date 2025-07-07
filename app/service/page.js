export default function Service() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center text-blue-950 mb-4">บริการของเรา</h1>
        </div>
      </div>
      
      {/* Responsive Grid */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="text-center p-3 border rounded">
            <i className="bi bi-gear fs-1 text-primary"></i>
            <h5 className="mt-2">Service 1</h5>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="text-center p-3 border rounded">
            <i className="bi bi-laptop fs-1 text-success"></i>
            <h5 className="mt-2">Service 2</h5>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="text-center p-3 border rounded">
            <i className="bi bi-phone fs-1 text-warning"></i>
            <h5 className="mt-2">Service 3</h5>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="text-center p-3 border rounded">
            <i className="bi bi-cloud fs-1 text-info"></i>
            <h5 className="mt-2">Service 4</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
