import "./Sidebar.scss";

// Sidebar component. Always persistent, used to navigate and control the app.
function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="heading">
        <h1 className="title">QuizMe</h1>
        <h2 className="subtitle">A flashcard app.</h2>
      </div>
      <div className="buttons"></div>
    </div>
  );
}

export default Sidebar;
