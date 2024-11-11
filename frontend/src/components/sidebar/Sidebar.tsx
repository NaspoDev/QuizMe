import { Link } from "react-router-dom";
import "./Sidebar.scss";

// Sidebar props.
// This component should be re-rendered whenever the location changes.
interface SidebarProps {
  pathname: string;
}

// Sidebar component. Always persistent, used to navigate and control the app.
function Sidebar({ pathname }: SidebarProps) {
  return (
    <div className="Sidebar">
      <div className="heading">
        <h1 className="title font-bold text-2xl">QuizMe</h1>
        <h2 className="subtitle font-light text">A flashcard app.</h2>
      </div>

      {/* Buttons container. Buttons change based on current page. */}
      <div className="buttons">
        {/* Landing page */}
        {pathname == "/" && (
          <Link
            to="/topics"
            className="button sidebar-button sidebar-button-green"
          >
            Get Started!
          </Link>
        )}

        {/* Topics page(s), start quiz page */}
        {(pathname.startsWith("/topics") || pathname == "/start-quiz") && (
          <>
            <Link
              to="/topics"
              className="button sidebar-button sidebar-button-orange"
            >
              My Topics
            </Link>
            <Link
              to="/start-quiz"
              className="button sidebar-button sidebar-button-green"
            >
              Start a Quiz
            </Link>
          </>
        )}

        {/* Topics page(s), start quiz page */}
        {pathname.startsWith("/active-quiz") && (
          <>
            <Link
              to="/topics"
              className="button sidebar-button sidebar-button-red"
            >
              End Quiz
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
