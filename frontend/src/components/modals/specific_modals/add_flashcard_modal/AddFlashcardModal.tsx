import { useEffect, useState } from "react";
import Modal, { ModalProps } from "../../generic_modal/Modal";
import "./AddFlashcardModal.scss";
import topicService, { Topic } from "../../../../services/TopicService";
import { Flashcard } from "../../../../services/FlashcardService";

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
        <div className="flashcard-answer-input-container form-item">
          <label htmlFor="flashcard-question-input">Question:</label>
          <textarea
            placeholder="Enter the question"
            className="flashcard-question-input form-item"
            id="flashcard-question-input"
          />
        </div>

        <div className="flashcard-answer-input-container form-item">
          <label htmlFor="flashcard-answer-input">Answer:</label>
          <textarea
            placeholder="Enter the answer"
            className="flashcard-answer-input form-item"
            id="flashcard-answer-input"
          />
        </div>
        <div className="flashcard-topic-select-container form-item">
          <label htmlFor="flashcard-topic-select">Topic:</label>
          <select
            name="topic"
            id="flashcard-topic-select"
            className="flashcard-topic-select"
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
              value="null"
              key={0}
              className="topic-select-option"
              selected
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

  function handleCreateFlashcard() {
    console.log("temp");
  }
  //   function handleCreateFlashcard(): void {
  //     const flashcardQuestionInput: HTMLInputElement = document.getElementById(
  //       "flashcard-question-input"
  //     ) as HTMLInputElement;
  //     const flashcardAnswerInput: HTMLInputElement = document.getElementById(
  //       "flashcard-answer-input"
  //     ) as HTMLInputElement;
  //     const flashcardTopicInput: HTMLSelectElement = document.getElementById(
  //       "flashcard-topic-select"
  //     ) as HTMLSelectElement;

  //     const questionInputValue: string = flashcardQuestionInput.value.trim();
  //     const answerInputValue: string = flashcardAnswerInput.value.trim();
  //     const topicInputValue: string = flashcardTopicInput.value;

  //     if (questionInputValue.length > 0 && answerInputValue.length > 0) {
  //       // Define the new topic object.
  //       const newTopic: Topic = {
  //         id: "123", // TODO: Pass in proper ID
  //         name: inputValue,
  //         numberOfFlashcards: 0,
  //       };

  //       // Create new topic locally
  //       setTopics([...topics, newTopic]);

  //       // Create new topic on the server.
  //       topicService.createTopic(newTopic);
  //     }

  //     closeModal();
  //   }
}

export default AddFlashcardModal;
