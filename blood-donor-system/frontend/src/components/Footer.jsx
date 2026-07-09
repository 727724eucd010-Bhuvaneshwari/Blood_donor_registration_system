function Footer() {
  return (
    <footer
      className="mt-5 text-white"
      style={{
        background: "#212529",
        paddingTop: "50px",
        paddingBottom: "30px",
      }}
    >
      <div className="container">

        <div className="row">

          <div className="col-md-4">

            <h3 className="fw-bold">
              🩸 BloodConnect
            </h3>

            <p className="mt-3">
              Connecting blood donors with people
              who need blood during emergencies.
            </p>

          </div>

          <div className="col-md-4">

            <h5>Quick Links</h5>

            <ul className="list-unstyled mt-3">

              <li>Home</li>

              <li>Dashboard</li>

              <li>Donors</li>

              <li>Urgent Requests</li>

            </ul>

          </div>

          <div className="col-md-4">

            <h5>Contact</h5>

            <p className="mt-3">

              Email : support@bloodconnect.com

            </p>

            <p>

              Phone : +91 9876543210

            </p>

          </div>

        </div>

        <hr />

        <div className="text-center">

          © 2026 BloodConnect | Donate Blood ❤️ Save Lives

        </div>

      </div>
    </footer>
  );
}

export default Footer;