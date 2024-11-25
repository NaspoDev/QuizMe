import { useContext, useEffect } from "react";
import "./LandingPage.scss";
import { AuthStatusContext } from "../../providers/AuthStatusProvider";
import { useNavigate } from "react-router-dom";

// The landing page
function LandingPage() {
  const [isSignedIn] = useContext(AuthStatusContext);
  const navigate = useNavigate();

  // If the user is logged in, they should be be able to visit the
  // landing page unless they log out, so redirect them if they try.
  useEffect(() => {
    if (isSignedIn) {
      navigate("/topics");
    }
  });

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
