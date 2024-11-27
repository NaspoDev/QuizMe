import Modal, { ModalProps } from "../../generic_modal/Modal";
import "./AddFlashcardModal.scss";
import flashcardService, {
  Flashcard,
} from "../../../../services/FlashcardService";
import { v4 as uuidv4 } from "uuid";

interface AddFlashcardModalProps extends ModalProps {
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  topicId: string;
  topicName: string;
}

// Add flashcard modal.
function AddFlashcardModal({
  isOpen,
  closeModal,
  flashcards,
  setFlashcards,
  topicId,
  topicName,
}: AddFlashcardModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      additionalClasses="AddFlashcardModal"
    >
      <h3 className="add-flashcard-heading text-lg">Create New Flashcard</h3>
      <form className="add-flashcard-form">
        <textarea
          placeholder="Question"
          className="flashcard-question-input form-item"
          id="flashcard-question-input"
        />
        <textarea
          placeholder="Answer"
          className="flashcard-answer-input form-item"
          id="flashcard-answer-input"
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
          onClick={handleCreateFlashcard}
        >
          Create
        </button>
      </div>
    </Modal>
  );

  async function handleCreateFlashcard(): Promise<void> {
    const flashcardQuestionInput: HTMLInputElement = document.getElementById(
      "flashcard-question-input"
    ) as HTMLInputElement;
    const flashcardAnswerInput: HTMLInputElement = document.getElementById(
      "flashcard-answer-input"
    ) as HTMLInputElement;

    const questionInputValue: string = flashcardQuestionInput.value.trim();
    const answerInputValue: string = flashcardAnswerInput.value.trim();

    if (questionInputValue.length > 0 && answerInputValue.length > 0) {
      // Define the new flashcard object.
      const newFlashcard: Flashcard = {
        id: uuidv4(),
        question: questionInputValue,
        answer: answerInputValue,
        topicId: topicId,
      };

      // Create new flashcard locally.
      setFlashcards([...flashcards, newFlashcard]);
      // Create new flashcard on the server.
      await flashcardService.createFlashcard(newFlashcard);
    }

    closeModal();
  }
}

export default AddFlashcardModal;
