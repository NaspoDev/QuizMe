import Modal, { ModalProps } from "../../generic_modal/Modal";
import "./EditFlashcardModal.scss";
import flashcardService, {
  Flashcard,
} from "../../../../services/FlashcardService";

interface EditFlashcardModalProps extends ModalProps {
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  flashcardToEdit: Flashcard | null;
  topicName: string;
}

// Edit flashcard modal.
function EditFlashcardModal({
  isOpen,
  closeModal,
  flashcards,
  setFlashcards,
  flashcardToEdit,
  topicName,
}: EditFlashcardModalProps) {
  if (flashcardToEdit == null) {
    return;
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      additionalClasses="EditFlashcardModal"
    >
      <h3 className="edit-flashcard-heading text-lg">Edit Flashcard</h3>
      <form className="edit-flashcard-form">
        <textarea
          placeholder="Question"
          className="flashcard-question-input form-item"
          id="flashcard-question-input"
          defaultValue={flashcardToEdit.question}
        />
        <textarea
          placeholder="Answer"
          className="flashcard-answer-input form-item"
          id="flashcard-answer-input"
          defaultValue={flashcardToEdit.answer}
        />
        <div className="flashcard-topic-display form-item">
          <p className="topic-display-heading">Topic:</p>
          <p className="topic-name">{topicName}</p>
        </div>
      </form>
      <div className="buttons-container text-sm">
        <button className="button button-dark" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="button button-success"
          onClick={handleUpdateFlashcard}
        >
          Save
        </button>
      </div>
    </Modal>
  );

  async function handleUpdateFlashcard(): Promise<void> {
    const flashcardQuestionInput: HTMLInputElement = document.getElementById(
      "flashcard-question-input"
    ) as HTMLInputElement;
    const flashcardAnswerInput: HTMLInputElement = document.getElementById(
      "flashcard-answer-input"
    ) as HTMLInputElement;

    const questionInputValue: string = flashcardQuestionInput.value.trim();
    const answerInputValue: string = flashcardAnswerInput.value.trim();

    if (flashcardToEdit == null) {
      return;
    }

    if (questionInputValue.length > 0 && answerInputValue.length > 0) {
      // Create an updated flashcard object.
      const updatedFlashcard: Flashcard = {
        id: flashcardToEdit.id,
        question: questionInputValue,
        answer: answerInputValue,
        topicId: flashcardToEdit.topicId,
      };

      // Updating the flashcards state array.
      const updatedFlashcards: Flashcard[] = flashcards.map((flashcard) =>
        flashcard.id == flashcardToEdit.id ? updatedFlashcard : flashcard
      );
      setFlashcards(updatedFlashcards);

      // Update flashcard on the server.
      await flashcardService.updateFlashcard(updatedFlashcard);
    }

    closeModal();
  }
}

export default EditFlashcardModal;
