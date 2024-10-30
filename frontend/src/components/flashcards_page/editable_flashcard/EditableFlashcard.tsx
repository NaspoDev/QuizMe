import "./EditableFlashcard.scss";

interface EditableFlashcardProps {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

// A flashcard element that can be used to edit said flashcard.
// Used in the Flashcards page.
function EditableFlashcard({
  question,
  answer,
  topic,
}: EditableFlashcardProps) {
  return (
    <div className="EditableFlashcard">
      <div className="question-container">{question}</div>
      <div className="details-and-buttons">
        <p className="flashcard-topic">{topic}</p>
        <div className="flashcard-buttons">
          {/* icon edit button */}
          {/* icon delete button */}
        </div>
      </div>
    </div>
  );
}

export default EditableFlashcard;
