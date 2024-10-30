import EditableFlashcard from "./editable_flashcard/EditableFlashcard";
import "./FlashcardsPage.scss";

function FlashcardsPage() {
  return (
    <div className="FlashcardsPage">
      <h1 className="heading font-bold text-2xl">Your Flashcards</h1>
      <div className="flashcards-display">
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={"1"}
        />
      </div>
    </div>
  );
}

export default FlashcardsPage;
