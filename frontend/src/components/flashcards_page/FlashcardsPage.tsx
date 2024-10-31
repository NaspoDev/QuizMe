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
          key={1}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={2}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={3}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={4}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={5}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={6}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={7}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={8}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={9}
        />
        <EditableFlashcard
          id="1"
          answer="This is the answer!"
          question="This is the question?"
          topic="OOP"
          key={10}
        />
      </div>
    </div>
  );
}

export default FlashcardsPage;
