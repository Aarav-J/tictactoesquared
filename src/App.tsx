import "./App.scss";
import CodeConnectLogo from "./assets/logo.svg";
import HeroSvg from "./assets/hero.svg";

function App() {

  return (
    <>
      <section className="navbar">
        <img className="navbar__logo" src={CodeConnectLogo} alt="CodeConnect Logo" />
        <div className="navbar__links">
          <a className="navbar__links__link"> Home </a>
          <a className="navbar__links__link"> About </a>
          <a className="navbar__links__link"> Program </a>
          <a className="navbar__links__link"> Events </a>
          <a className="navbar__links__link"> Get Involved </a>
        </div>
        <button className="navbar__contact-button">Contact Us</button>
      </section>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__content__title">
            Bringing
            <span className="hero__content__title--accent"> computer science </span>
            to K-12 students.
          </h1>
          <p className="hero__content__paragraph">
            We foster development in the computer science community through hosting a variety of interactive programs.
          </p>
          <button className="hero__content__programs-button">Programs</button>
        </div>
        <img className="hero__image" src={HeroSvg} alt="Hero SVG" />
      </section>
    </>
  );
}

export default App;
