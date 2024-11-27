import flashcardService, {
  Flashcard,
} from "../../../services/FlashcardService";
import "./EditableFlashcard.scss";

interface EditableFlashcardProps {
  flashcard: Flashcard;
  // Used when the edit button is pressed.
  setFlashcardToEdit: React.Dispatch<React.SetStateAction<Flashcard | null>>;
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

// A flashcard element that can be used to edit said flashcard.
// Used in the Flashcards page.
function EditableFlashcard({
  flashcard,
  setFlashcardToEdit,
  flashcards,
  setFlashcards,
}: EditableFlashcardProps) {
  // The html id to apply to this EditableFlashcard flashcard container div.
  const flashcardContainerId: string = `flashcard-container-${flashcard.id}`;

  // Boolean variable to see if the client is a Firefox browser.
  // Used to apply custom styling for Firefox clients.
  const isFirefox: boolean = navigator.userAgent
    .toLowerCase()
    .includes("firefox")
    ? true
    : false;

  return (
    <div className="EditableFlashcard text-sm">
      <div
        className={`container ${isFirefox ? "firefox-container" : ""}`.trim()}
        id={flashcardContainerId}
      >
        <div className="front-face">
          <p className="question">{flashcard.question}</p>
          <div className="buttons">
            <span
              className="material-symbols-rounded card-option-button"
              onClick={flipFlashcard}
            >
              sync
            </span>
            <span
              className="material-symbols-rounded card-option-button"
              onClick={() => setFlashcardToEdit(flashcard)}
            >
              edit
            </span>
            <span
              className="material-symbols-rounded card-option-button"
              onClick={deleteFlashcard}
            >
              delete
            </span>
          </div>
        </div>

        <div
          className={`back-face ${isFirefox ? "firefox-back-face" : ""}`.trim()}
        >
          <div className="answer-container">
            <p className="answer-heading">Answer:</p>
            <p className="answer">{flashcard.answer}</p>
          </div>

          <div className="buttons">
            <span
              className="material-symbols-rounded card-option-button"
              onClick={flipFlashcard}
            >
              sync
            </span>
            <span
              className="material-symbols-rounded card-option-button"
              onClick={() => setFlashcardToEdit(flashcard)}
            >
              edit
            </span>
            <span
              className="material-symbols-rounded card-option-button"
              onClick={deleteFlashcard}
            >
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

  // Deletes this flashcard.
  async function deleteFlashcard(): Promise<void> {
    // Delete flashcard locally by updating flashcards state array.
    const updatedFlashcards: Flashcard[] = flashcards.filter(
      (card) => card.id != flashcard.id
    );
    setFlashcards(updatedFlashcards);

    // Delete flashcard on the server.
    await flashcardService.deleteFlashcard(flashcard);
  }
}

export default EditableFlashcard;
