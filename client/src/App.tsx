import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import LandingPage from "./components/landing_page/LandingPage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import TopicsPage from "./components/topics_page/TopicsPage";
import FlashcardsPage from "./components/flashcards_page/FlashcardsPage";
import StartQuizPage from "./components/start_quiz_page/StartQuizPage";
import ActiveQuizPage from "./components/active_quiz/ActiveQuizPage";
import { useContext } from "react";
import { AuthStatusContext } from "./providers/AuthStatusProvider";

function App() {
  const location = useLocation();
  const [isSignedIn] = useContext(AuthStatusContext);

  return (
    <div className="App">
      <Sidebar pathname={location.pathname} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* If there is a user signed in, allow access to these pages. */}
          {isSignedIn ? (
            <>
              <Route path="/topics">
                <Route path="" element={<TopicsPage />} />
                <Route
                  path=":topicId/:topicName"
                  element={<FlashcardsPage />}
                />
              </Route>

              <Route path="/start-quiz" element={<StartQuizPage />} />
              <Route
                path="/active-quiz/:topicId/:timeSeconds"
                element={<ActiveQuizPage />}
              />
            </>
          ) : (
            // Otherwise redirect to landing page.
            <Route path="*" element={<Navigate to={"/"} />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
