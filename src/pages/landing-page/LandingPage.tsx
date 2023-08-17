import HeroSvg from "./../../assets/hero.svg";
import "./LandingPage.scss"

const LandingPage = () => {
    return (
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
    );
};

export default LandingPage;
