import "./App.scss";
import CodeConnectLogo from "./assets/logo.svg";

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
    </>
  );
}

export default App;
