import EditableFlashcard from "./editable_flashcard/EditableFlashcard";
import "./FlashcardsPage.scss";

function FlashcardsPage() {
  return (
    <div className="FlashcardsPage">
      <h1 className="heading font-bold text-2xl">Your Flashcards</h1>
      <div className="content-container">
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
          <EditableFlashcard
            id="1"
            answer="This is the answer!"
            question="This is the question?"
            topic="OOP"
            key={11}
          />
          <EditableFlashcard
            id="1"
            answer="This is the answer!"
            question="This is the question?"
            topic="OOP"
            key={12}
          />
          <EditableFlashcard
            id="1"
            answer="This is the answer!"
            question="This is the question?"
            topic="OOP"
            key={13}
          />
          <EditableFlashcard
            id="1"
            answer="This is the answer!"
            question="This is the question?"
            topic="OOP"
            key={14}
          />
        </div>
        {/* add new task button */}
        <button className="add-task-button icon-button icon-button-green">
          <span className="material-symbols-rounded text-3xl">add</span>
        </button>
      </div>
    </div>
  );
}

export default FlashcardsPage;
