import "./EditableFlashcard.scss";

interface EditableFlashcardProps {
  id: number;
  question: string;
  answer: string;
  topic: string | null;
}

// A flashcard element that can be used to edit said flashcard.
// Used in the Flashcards page.
function EditableFlashcard({
  question,
  answer,
  topic,
}: EditableFlashcardProps) {
  return (
    <div className="EditableFlashcard text-sm">
      <div className="container">
        <div className="front-face">
          <p className="question">{question}</p>
          <div className="details-and-buttons">
            <p className="flashcard-topic font-light-italic">{topic}</p>
            <div className="flashcard-buttons">
              <span className="material-symbols-rounded card-option-button">
                edit
              </span>
              <span className="material-symbols-rounded card-option-button">
                delete
              </span>
            </div>
          </div>
        </div>

        <div className="back-face">
          <p className="answer">{answer}</p>
          <div className="details-and-buttons">
            <p className="flashcard-topic font-light-italic">{topic}</p>
            <div className="flashcard-buttons">
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
    </div>
  );
}

export default EditableFlashcard;
