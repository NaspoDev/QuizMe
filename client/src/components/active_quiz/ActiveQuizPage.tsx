import { useNavigate, useParams } from "react-router-dom";
import "./ActiveQuizPage.scss";
import { useEffect, useState } from "react";
import flashcardService, { Flashcard } from "../../services/FlashcardService";
import topicService from "../../services/TopicService";
import QuizFlashcard from "./quiz_flashcard/QuizFlashcard";

// Active Quiz Page component.
function ActiveQuizPage() {
  // topic of quiz | time per question, in seconds.
  // 0 seconds means this is not a timed quiz.
  let { topicId, timeSeconds } = useParams();
  topicId = topicId as string;
  timeSeconds = timeSeconds as string;
  // Converted value of timeSeconds param to number.
  const secondsPerQuestion: number = Number(timeSeconds);
  // Boolean variable that makes checking if this is a timed quiz easier.
  const isTimedQuiz: boolean = secondsPerQuestion == 0 ? false : true;

  const navigate = useNavigate();

  const [topicName, setTopicName] = useState<string>("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quizProgress, setQuizProgress] = useState<number>(1);
  const [questionTimeRemaining, setQuestionTimeRemaining] =
    useState<number>(secondsPerQuestion);

  useEffect(() => {
    // Get topic name
    topicService
      .getTopic(topicId)
      .then((topic) => setTopicName(topic.name))
      .catch(() => console.error("Error fetching topic."));

    // Get topic flashcards, then call to shuffle them.
    flashcardService.getUserFlashcardsByTopic(topicId).then((data) => {
      setFlashcards(shuffleFlashcards(data));
    });
  }, []);

  // Sets the timer for a timed quiz.
  // Works by defining a setTimeout() method that updates the time remaining
  // state variable, which is a dependency of this useState(), which then calls it again.
  useEffect(() => {
    // If it's not a timed quiz, return.
    if (!isTimedQuiz) {
      return;
    }

    // If the timer has run out, navigate to the next question.
    if (questionTimeRemaining <= 0) {
      navigateQuizNext();
    }

    // Set a 1 second timeout that updates the questionTimeRemaining state variable.
    const timer = setTimeout(() => {
      setQuestionTimeRemaining(questionTimeRemaining - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [questionTimeRemaining]);

  // Reset the timer whenever the quiz navigates.
  useEffect(() => {
    if (isTimedQuiz) {
      setQuestionTimeRemaining(secondsPerQuestion);
    }
  }, [quizProgress]);

  return (
    <div className="ActiveQuizPage">
      <div className="heading-area">
        <h1 className="active-quiz-heading font-bold text-2xl">
          {topicName} Quiz
        </h1>
        <progress
          className="quiz-progress-bar"
          max={flashcards.length}
          value={quizProgress}
        ></progress>
        <p className="quiz-progress-numeric font-light">
          {quizProgress}/{flashcards.length}
        </p>
        {isTimedQuiz && (
          <div className="question-time-remaining-container">
            <p className="question-time-remaining-text font-light">
              Time remaining for this question:{" "}
            </p>
            <p className="question-time-remaining-value font-semibold">
              {questionTimeRemaining}
            </p>
          </div>
        )}
      </div>

      <div className="flashcard-container">
        {/* Wait for flashcards to shuffle & set */}
        {flashcards.length > 0 && (
          // Display the flashcard at the index of quiz progress - 1
          <QuizFlashcard
            flashcard={flashcards[quizProgress - 1]}
            // Passing a key in so that a completely new instance of the component
            // renders when the flashcard changes, therefore resetting the flashcard
            // orientation without having to do it manually.
            key={quizProgress}
          />
        )}
      </div>

      <p className="flip-flashcard-prompt text-sm font-light">
        Click the card to see the answer.
      </p>

      {/* quiz navigation buttons */}
      {/* If we are not at the last flashcard, show the next flashcard button.
      Otherwise, show the complete quiz button. */}
      {quizProgress < flashcards.length ? (
        <button
          className="next-flashcard-button icon-button icon-button-orange"
          onClick={navigateQuizNext}
        >
          <span className="material-symbols-rounded text-3xl">
            arrow_forward
          </span>
        </button>
      ) : (
        <button
          className="complete-quiz-button icon-button icon-button-green"
          onClick={navigateQuizNext}
        >
          <span
            className="material-symbols-rounded text-3xl"
            onClick={completeQuiz}
          >
            done_outline
          </span>
        </button>
      )}

      {/* If quiz progress > 1, show the back button. */}
      {quizProgress > 1 && (
        <button
          className="previous-flashcard-button icon-button icon-button-orange"
          onClick={navigateQuizPrevious}
        >
          <span className="material-symbols-rounded text-3xl">arrow_back</span>
        </button>
      )}
    </div>
  );

  // Navigates the quiz to the next flashcard.
  function navigateQuizNext(): void {
    if (quizProgress == flashcards.length) {
      completeQuiz();
    } else {
      setQuizProgress(quizProgress + 1);
    }
  }

  // Navigates the quiz to the previous flashcard.
  function navigateQuizPrevious(): void {
    setQuizProgress(quizProgress - 1);
  }

  // Exits the quiz and returns to topics page.
  function completeQuiz(): void {
    navigate("/topics");
  }

  // Shuffle the flashcards array using the Fisher-Yates shuffle algorithm.
  // Returns the provided array shuffled.
  function shuffleFlashcards(flashcards: Flashcard[]): Flashcard[] {
    let currentIndex: number = flashcards.length;

    // While there are still elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element
      const randomIndex: number = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap the element at current index with the random index chosen.
      [flashcards[currentIndex], flashcards[randomIndex]] = [
        flashcards[randomIndex],
        flashcards[currentIndex],
      ];
    }

    return flashcards;
  }
}

export default ActiveQuizPage;
