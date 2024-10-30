import "./LandingPage.scss";

// The landing page
function LandingPage() {
  return (
    <div className="LandingPage">
      <h1 className="heading text-2xl font-bold">
        Welcome to QuizMe, <br />
        your new favourite way to study!
      </h1>
      <ul className="description-list font-handwriting text-2xl">
        <li className="description-item">Create flashcards.</li>
        <li className="description-item">
          Create topics to categorize your flashcards.
        </li>
        <li className="description-item">Quiz yourself on your flashcards.</li>
        <li className="description-item">
          Quiz yourself on specific topics, or on everything.
        </li>
        <li className="description-item">Quizzes can be timed, or not.</li>
      </ul>
    </div>
  );
}

export default LandingPage;
