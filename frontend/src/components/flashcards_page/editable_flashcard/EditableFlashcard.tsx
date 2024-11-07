import { Flashcard } from "../../../services/FlashcardService";
import "./EditableFlashcard.scss";

// A flashcard element that can be used to edit said flashcard.
// Used in the Flashcards page.
function EditableFlashcard({ id, question, answer }: Flashcard) {
  // The html id to apply to this EditableFlashcard flashcard container div.
  const flashcardContainerId: string = `flashcard-container-${id}`;

  return (
    <div className="EditableFlashcard text-sm">
      <div className="container" id={flashcardContainerId}>
        <div className="front-face">
          <p className="question">{question}</p>
          <div className="buttons">
            <span
              className="material-symbols-rounded card-option-button"
              onClick={flipFlashcard}
            >
              sync
            </span>
            <span className="material-symbols-rounded card-option-button">
              edit
            </span>
            <span className="material-symbols-rounded card-option-button">
              delete
            </span>
          </div>
        </div>

        <div className="back-face">
          <div className="answer-container">
            <p className="answer-heading">Answer:</p>
            <p className="answer">{answer}</p>
          </div>

          <div className="buttons">
            <span
              className="material-symbols-rounded card-option-button"
              onClick={flipFlashcard}
            >
              sync
            </span>
            <span className="material-symbols-rounded card-option-button">
              edit
            </span>
            <span className="material-symbols-rounded card-option-button">
              delete
            </span>
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

export default EditableFlashcard;
