import React from 'react';

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      {/* Section: Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* Left */}
        <div className="me-5 d-none d-lg-block">
          <span>Connect with us on social media:</span>
        </div>

        {/* Right */}
        <div>
          <a href="https://facebook.com" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://google.com" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://instagram.com" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </section>

      {/* Section: Links */}
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            {/* Medical Practice Information */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-clinic-medical me-3"></i>Our Practice
              </h6>
              <p>
                We offer a wide range of medical services including general checkups, surgery, emergency care, and specialized consultations. Our team of experts is committed to your health and well-being.
              </p>
            </div>

            {/* Services Links */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Our Services</h6>
              <p><a href="#!" className="text-reset">General Checkup</a></p>
              <p><a href="#!" className="text-reset">Emergency Care</a></p>
              <p><a href="#!" className="text-reset">Surgical Procedures</a></p>
              <p><a href="#!" className="text-reset">Specialized Consultations</a></p>
            </div>

            {/* Useful Links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              <p><a href="#!" className="text-reset">Book an Appointment</a></p>
              <p><a href="#!" className="text-reset">Patient Portal</a></p>
              <p><a href="#!" className="text-reset">Health Insurance</a></p>
              <p><a href="#!" className="text-reset">FAQs</a></p>
            </div>

            {/* Contact Information */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
              <p><i className="fas fa-home me-3"></i> 123 Medical St, Health City, HC 12345</p>
              <p><i className="fas fa-envelope me-3"></i> info@doctorclinic.com</p>
              <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-fax me-3"></i> + 01 234 567 89</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 All Rights Reserved: <a className="text-reset fw-bold" href="https://doctorclinic.com">DoctorClinic.com</a>
      </div>
    </footer>
  );
}

export default Footer;
