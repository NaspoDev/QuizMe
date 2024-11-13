import { Flashcard } from "../../../services/FlashcardService";
import "./QuizFlashcard.scss";

interface QuizFlashcardProps {
  flashcard: Flashcard;
}

// The flashcard component used in quizzes.
function QuizFlashcard({ flashcard }: QuizFlashcardProps) {
  // The html id to apply to this QuizFlashcard flashcard container div.
  const flashcardContainerId: string = `flashcard-container-${flashcard.id}`;

  return (
    <div className="QuizFlashcard text-lg font-semibold">
      <div
        className="container"
        id={flashcardContainerId}
        onClick={flipFlashcard}
      >
        <div className="front-face">
          <p className="question">{flashcard.question}</p>
        </div>

        <div className="back-face">
          <div className="answer-container">
            <p className="answer-heading">Answer:</p>
            <p className="answer">{flashcard.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Flips the flashcard by rotating the 'container' div 180deg.
  function flipFlashcard(): void {
    const containerElement: HTMLDivElement = document.getElementById(
      flashcardContainerId
    ) as HTMLDivElement;

    if (containerElement.style.transform == "rotateY(180deg)") {
      containerElement.style.transform = "rotateY(0deg)";
    } else {
      containerElement.style.transform = "rotateY(180deg)";
    }
  }
}

export default QuizFlashcard;
