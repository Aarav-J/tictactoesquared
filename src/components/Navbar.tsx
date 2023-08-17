import "./Navbar.scss";
import CodeConnectLogo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <section className="navbar">
      <img
        className="navbar__logo"
        src={CodeConnectLogo}
        alt="CodeConnect Logo"
      />
      <div className="navbar__links">
        <a href="/" className="navbar__links__link">
          {" "}
          Home{" "}
        </a>
        <a href="/about" className="navbar__links__link">
          {" "}
          About{" "}
        </a>
        <a href="/mentorship" className="navbar__links__link">
          {" "}
          Mentorship{" "}
        </a>
        <a href="/programs" className="navbar__links__link">
          {" "}
          Programs{" "}
        </a>
        <a href="/get-involved" className="navbar__links__link">
          {" "}
          Get Involved{" "}
        </a>
      </div>
      <button className="navbar__contact-button">Contact Us</button>
    </section>
  );
};

export default Navbar;
