import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import LandingPage from "./components/landing_page/LandingPage";
import { Route, Routes, useLocation } from "react-router-dom";
import FlashcardsPage from "./components/flashcards_page/FlashcardsPage";
import TopicsPage from "./components/topics_page/TopicsPage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Sidebar pathname={location.pathname} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/active-quiz" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
