import { Link } from "react-router-dom";
import "./Sidebar.scss";

// Sidebar component. Always persistent, used to navigate and control the app.
function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="heading">
        <h1 className="title font-bold text-2xl">QuizMe</h1>
        <h2 className="subtitle font-light text">A flashcard app.</h2>
      </div>

      {/* Buttons container. Buttons change based on current page. */}
      <div className="buttons">
        {/* Landing page */}
        {location.pathname == "/" && (
          <Link
            to="/flashcards"
            className="button sidebar-button sidebar-button-green"
          >
            Get Started!
          </Link>
        )}

        {/* Flashcards or Topics page */}
        {(location.pathname == "/flashcards" ||
          location.pathname == "/topics") && (
          <>
            <Link
              to="/flashcards"
              className="button sidebar-button sidebar-button-orange"
            >
              All Flashcards
            </Link>
            <Link
              to="/flashcards"
              className="button sidebar-button sidebar-button-orange"
            >
              My Topics
            </Link>
            <Link
              to="/flashcards"
              className="button sidebar-button sidebar-button-green"
            >
              Start a Quiz
            </Link>
          </>
        )}
      </div>

      {/* Crediting myself */}
      <div className="developer-credits-container">
        <p className="developer-credits text-sm font-light">
          Created by{" "}
          <a
            href="https://naspo.dev/"
            target="_blank"
            className="naspo-hyperlink"
          >
            Naspo
          </a>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
