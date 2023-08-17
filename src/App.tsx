import "./App.scss";
import AboutPage from "./pages/about-page/AboutPage";
import EventsPage from "./pages/events-page/EventsPage";
import GetInvolvedPage from "./pages/get-involved-page/GetInvolvedPage";
import ProgramsPage from "./pages/programs-page/ProgramsPage";
import LandingPage from "./pages/landing-page/LandingPage";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}

export default App;
