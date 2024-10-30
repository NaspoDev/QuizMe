import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import LandingPage from "./components/landing_page/LandingPage";
import { Route, Routes } from "react-router-dom";
import FlashcardsPage from "./components/flashcards_page/FlashcardsPage";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/topics" element={<LandingPage />} />
          <Route path="/active-quiz" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
