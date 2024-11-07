import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import LandingPage from "./components/landing_page/LandingPage";
import { Route, Routes, useLocation } from "react-router-dom";
import TopicsPage from "./components/topics_page/TopicsPage";
import FlashcardsPage from "./components/flashcards_page/FlashcardsPage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Sidebar pathname={location.pathname} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/topics">
            <Route path="" element={<TopicsPage />} />
            <Route path=":topicId/:topicName" element={<FlashcardsPage />} />
          </Route>

          <Route path="/start-quiz" element={<LandingPage />} />
          <Route path="/active-quiz" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
