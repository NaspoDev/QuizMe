import { useEffect, useState } from "react";
import EditableFlashcard from "./editable_flashcard/EditableFlashcard";
import "./FlashcardsPage.scss";
import flashcardService, { Flashcard } from "../../services/FlashcardService";
import AddFlashcardModal from "../modals/specific_modals/add_flashcard_modal/AddFlashcardModal";

function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isAddFlashcardModalOpen, setIsAddFlashcardModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    // Call backend api to get the user's flashcards.
    flashcardService.getUserFlashcards("123").then(setFlashcards);
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
        <button
          className="add-task-button icon-button icon-button-green"
          onClick={openAddFlashcardModal}
        >
          <span className="material-symbols-rounded text-3xl">add</span>
        </button>
      </div>
      <AddFlashcardModal
        isOpen={isAddFlashcardModalOpen}
        closeModal={closeAddFlashcardModal}
        flashcards={flashcards}
        setFlashcards={setFlashcards}
      />
    </div>
  );

  // Opens the add topic modal.
  function openAddFlashcardModal(): void {
    setIsAddFlashcardModalOpen(true);
  }

  function closeAddFlashcardModal(): void {
    setIsAddFlashcardModalOpen(false);
  }
}

export default FlashcardsPage;
