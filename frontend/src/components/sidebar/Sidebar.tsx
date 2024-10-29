import "./Sidebar.scss";

// Sidebar component. Always persistent, used to navigate and control the app.
function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="heading">
        <h1 className="title font-bold text-2xl">QuizMe</h1>
        <h2 className="subtitle font-light text">A flashcard app.</h2>
      </div>

      <div className="buttons">
        <button className="sidebar-button sidebar-button-orange">
          All Flashcards
        </button>
        <button className="sidebar-button sidebar-button-orange">
          My Topics
        </button>
        <button className="sidebar-button sidebar-button-green">
          Start a Quiz
        </button>
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
