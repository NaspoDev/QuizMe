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

  // Dummy flashcard object used to initialize 'flashcardToEdit' state variable.
  const dummyFlashcard: Flashcard = {
    id: "123",
    question: "Dummy question",
    answer: "Dummy answer",
    topicId: "123",
  };
  // This will be set with whatever flashcard needs to be edited.
  // 'setFlashcardToEdit' is called when the user presses the edit button on a
  // EditableFlashcard.
  const [flashcardToEdit, setFlashcardToEdit] =
    useState<Flashcard>(dummyFlashcard);
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
    // If 'flashcardToEdit' is still set to the dummy flashcard, don't open.
    // (This is here to prevent the modal from opening when this component first mounts,
    // as useEffect is always called on first mount no matter what).
    if (flashcardToEdit == dummyFlashcard) {
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
  }
}

export default FlashcardsPage;
