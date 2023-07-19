import React from "react";

export const Footer = () => {
	return (
		<>
  <footer  className="text-center text-white" style={{backgroundColor: "#f1f1f1"}}>
    {/* <!-- Grid container --> */}
    <div  className="container pt-4">
      {/* <!-- Section: Social media --> */}
      <section  className="mb-4">

        {/* <!-- Google --> */}
        <a
           className="btn btn-link btn-floating btn-lg text-dark m-1"
          href="mailto:alejandrochiarilli@gmail.com"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <i  className="fab fa-google"></i>
        </a>

        {/* <!-- Instagram --> */}
        <a
           className="btn btn-link btn-floating btn-lg text-dark m-1"
          href="https://www.instagram.com/chiarilli/"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <i  className="fab fa-instagram"></i>
        </a>

        {/* <!-- Linkedin --> */}
        <a
           className="btn btn-link btn-floating btn-lg text-dark m-1"
          href="https://www.linkedin.com/in/alechiarilli/"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <i  className="fab fa-linkedin"></i>
        </a>
        {/* <!-- Github --> */}
        <a
           className="btn btn-link btn-floating btn-lg text-dark m-1"
          href="https://github.com/AleChiarilli"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <i  className="fab fa-github"></i>
        </a>
      </section>
      {/* <!-- Section: Social media --> */}
    </div>
  </footer>
  </>
);
	}