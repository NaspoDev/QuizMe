import { useEffect, useState } from "react";
import Modal, { ModalProps } from "../../generic_modal/Modal";
import "./AddFlashcardModal.scss";
import topicService, { Topic } from "../../../../services/TopicService";
import flashcardService, {
  Flashcard,
} from "../../../../services/FlashcardService";

interface AddFlashcardModalProps extends ModalProps {
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

// Add flashcard modal.
function AddFlashcardModal({
  isOpen,
  closeModal,
  flashcards,
  setFlashcards,
}: AddFlashcardModalProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const noTopicFormValue: string = "no-topic";

  useEffect(() => {
    // Call backend api to get the user's topics.
    // TODO: pass in proper ID
    topicService.getUserTopics("123").then(setTopics);
  }, []);

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
        <div className="flashcard-topic-select-container form-item">
          <label htmlFor="flashcard-topic-select">Topic:</label>
          <select
            name="topic"
            id="flashcard-topic-select"
            className="flashcard-topic-select"
            defaultValue={noTopicFormValue}
          >
            {topics.map((topic) => (
              <option
                value={topic.id}
                key={topic.id}
                className="topic-select-option"
              >
                {topic.name}
              </option>
            ))}
            {/* No topic is the default selection */}
            <option
              value={noTopicFormValue}
              key={0}
              className="topic-select-option"
            >
              No Topic
            </option>
          </select>
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

  function handleCreateFlashcard(): void {
    const flashcardQuestionInput: HTMLInputElement = document.getElementById(
      "flashcard-question-input"
    ) as HTMLInputElement;
    const flashcardAnswerInput: HTMLInputElement = document.getElementById(
      "flashcard-answer-input"
    ) as HTMLInputElement;
    const flashcardTopicInput: HTMLSelectElement = document.getElementById(
      "flashcard-topic-select"
    ) as HTMLSelectElement;

    const questionInputValue: string = flashcardQuestionInput.value.trim();
    const answerInputValue: string = flashcardAnswerInput.value.trim();
    const topicInputValue: string = flashcardTopicInput.value;

    if (questionInputValue.length > 0 && answerInputValue.length > 0) {
      // Define the new flashcard object.
      const newFlashcard: Flashcard = {
        id: "123", // TODO: Create proper ID
        question: questionInputValue,
        answer: answerInputValue,
        topicInfo: null,
      };

      // If a topic was selected, update the flashcard object with the
      // respective topic data.
      if (topicInputValue != noTopicFormValue) {
        newFlashcard.topicInfo = {
          // the value is the topic ID
          topicId: topicInputValue,
          // topic name can be found through getting the text value of the <option> element.
          topicName:
            flashcardTopicInput.options[flashcardTopicInput.selectedIndex].text,
        };
      }

      // Create new flashcard locally.
      setFlashcards([...flashcards, newFlashcard]);
      // Create new flashcard on the server.
      flashcardService.createFlashcard(newFlashcard);
    }

    closeModal();
  }
}

export default AddFlashcardModal;
