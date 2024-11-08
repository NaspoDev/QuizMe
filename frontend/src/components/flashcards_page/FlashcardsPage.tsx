import { useEffect, useState } from "react";
import EditableFlashcard from "./editable_flashcard/EditableFlashcard";
import "./FlashcardsPage.scss";
import flashcardService, { Flashcard } from "../../services/FlashcardService";
import AddFlashcardModal from "../modals/specific_modals/add_flashcard_modal/AddFlashcardModal";
import { useParams } from "react-router-dom";
import EditFlashcardModal from "../modals/specific_modals/edit_flashcard_modal/EditFlashcardModal";

// Flashcards page. Displays flashcards for a topic.
function FlashcardsPage() {
  let { topicId, topicName } = useParams();
  topicId = topicId as string;
  topicName = topicName as string;

  // List of flashcards.
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  // Boolean state to determine if the Add Flashcard Modal should be open.
  const [isAddFlashcardModalOpen, setIsAddFlashcardModalOpen] =
    useState<boolean>(false);

  // This will be set with whatever flashcard needs to be edited.
  // 'setFlashcardToEdit' is called when the user presses the edit button on a
  // EditableFlashcard.
  // prettier-ignore
  const [flashcardToEdit, setFlashcardToEdit] = useState<Flashcard | null>(null);
  // Boolean state to determine if the Edit Flashcard Modal should be open.
  const [isEditFlashcardModalOpen, setIsEditFlashcardModalOpen] =
    useState<boolean>(false);

  // Call backend api to get the user's flashcards.
  useEffect(() => {
    flashcardService
      .getUserFlashcardsByTopic("123", topicId)
      .then(setFlashcards);
  }, []);

  // Opens the Edit Flashcard Modal whenever the 'flashcardToEdit' changes.
  useEffect(() => {
    if (flashcardToEdit == null) {
      return;
    }

    openEditFlashcardModal();
  }, [flashcardToEdit]);

  return (
    <div className="FlashcardsPage">
      <h1 className="flashcards-page-heading font-bold text-2xl">
        {topicName} Flashcards
      </h1>

      <div className="content-container">
        <div className="flashcards-display">
          {flashcards.map((flashcard) => (
            <EditableFlashcard
              flashcard={flashcard}
              setFlashcardToEdit={setFlashcardToEdit}
              flashcards={flashcards}
              setFlashcards={setFlashcards}
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
      <EditFlashcardModal
        isOpen={isEditFlashcardModalOpen}
        closeModal={closeEditFlashcardModal}
        flashcards={flashcards}
        setFlashcards={setFlashcards}
        flashcardToEdit={flashcardToEdit}
        topicName={topicName}
      />
    </div>
  );

  // Opens the add flashcard modal.
  function openAddFlashcardModal(): void {
    setIsAddFlashcardModalOpen(true);
  }

  function closeAddFlashcardModal(): void {
    setIsAddFlashcardModalOpen(false);
  }

  // Opens the edit flashcard modal.
  function openEditFlashcardModal(): void {
    setIsEditFlashcardModalOpen(true);
  }

  function closeEditFlashcardModal(): void {
    setIsEditFlashcardModalOpen(false);
    setFlashcardToEdit(null);
  }
}

export default FlashcardsPage;
