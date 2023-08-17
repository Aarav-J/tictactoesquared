import "./App.scss";
import AboutPage from "./pages/about-page/AboutPage";
import LandingPage from "./pages/landing-page/LandingPage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import MentorshipPage from "./pages/mentorship-page/MentorshipPage";
import ProgramsPage from "./pages/programs-page/ProgramsPage";
import GetInvolvedPage from "./pages/get-involved-page/GetInvolvedPage";

function App() {
  return (
    <>
      <div className="main-container">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/about" element={<AboutPage></AboutPage>}></Route>
          <Route
            path="/mentorship"
            element={<MentorshipPage></MentorshipPage>}
          ></Route>
          <Route
            path="/programs"
            element={<ProgramsPage></ProgramsPage>}
          ></Route>
          <Route
            path="/get-involved"
            element={<GetInvolvedPage></GetInvolvedPage>}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
