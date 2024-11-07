import { useEffect, useState } from "react";
import EditableFlashcard from "./editable_flashcard/EditableFlashcard";
import "./FlashcardsPage.scss";
import flashcardService, { Flashcard } from "../../services/FlashcardService";
import AddFlashcardModal from "../modals/specific_modals/add_flashcard_modal/AddFlashcardModal";
import { useParams } from "react-router-dom";

// Flashcards page. Displays flashcards for a topic.
function FlashcardsPage() {
  let { topicId, topicName } = useParams();
  topicId = topicId as string;
  topicName = topicName as string;

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isAddFlashcardModalOpen, setIsAddFlashcardModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    // Call backend api to get the user's flashcards.
    flashcardService
      .getUserFlashcardsByTopic("123", topicId)
      .then(setFlashcards);
  }, []);

  return (
    <div className="FlashcardsPage">
      <h1 className="flashcards-page-heading font-bold text-2xl">
        {topicName} Flashcards
      </h1>

      <div className="content-container">
        <div className="flashcards-display">
          {flashcards.map((flashcard) => (
            <EditableFlashcard
              id={flashcard.id}
              answer={flashcard.answer}
              question={flashcard.question}
              topicId={topicId}
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
        topicId={topicId}
        topicName={topicName}
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
