function StatCard({ title, value, icon, color }) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border-0 shadow-lg h-100"
        style={{ borderRadius: "15px" }}
      >
        <div className="card-body d-flex align-items-center">

          <div
            className="me-3 text-white d-flex justify-content-center align-items-center"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: color,
              fontSize: "28px"
            }}
          >
            {icon}
          </div>

          <div>

            <h6 className="text-muted">{title}</h6>

            <h2 className="fw-bold">{value}</h2>

          </div>

        </div>
      </div>
    </div>
  );
}

export default StatCard;