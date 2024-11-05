import { useEffect, useState } from "react";
import EditableFlashcard from "./editable_flashcard/EditableFlashcard";
import "./FlashcardsPage.scss";
import flashcardService, { Flashcard } from "../../services/FlashcardService";

function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    // Call backend api to get the user's flashcards.
    flashcardService.getUserFlashcards("123").then((data) => {
      setFlashcards(data);
    });
  }, []);

  return (
    <div className="FlashcardsPage">
      <h1 className="flashcards-page-heading font-bold text-2xl">
        Your Flashcards
      </h1>
      <div className="content-container">
        <div className="flashcards-display">
          {flashcards.map((flashcard) => (
            <EditableFlashcard
              id={flashcard.id}
              answer={flashcard.answer}
              question={flashcard.question}
              topicInfo={flashcard.topicInfo}
              key={flashcard.id}
            />
          ))}
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
