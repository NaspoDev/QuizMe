import "./AddTopicModal.scss";
import topicService, { Topic } from "../../../../services/TopicService";
import Modal, { ModalProps } from "../../generic_modal/Modal";
import { v4 as uuidv4 } from "uuid";

interface AddTopicModalProps extends ModalProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

function AddTopicModal({
  isOpen,
  closeModal,
  topics,
  setTopics,
}: AddTopicModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      additionalClasses="AddTopicModal"
    >
      <h3 className="add-topic-heading text-lg">Create New Topic</h3>
      <form className="add-topic-form">
        <input
          type="text"
          placeholder="Topic Name"
          className="topic-name-input"
          id="topic-name-input"
        />
      </form>
      <div className="buttons-container text-sm">
        <button className="button button-dark" onClick={closeModal}>
          Cancel
        </button>
        <button className="button button-success" onClick={handleCreateTopic}>
          Create
        </button>
      </div>
    </Modal>
  );

  function handleCreateTopic(): void {
    const topicNameInput: HTMLInputElement = document.getElementById(
      "topic-name-input"
    ) as HTMLInputElement;
    const inputValue: string = topicNameInput.value.trim();

    if (inputValue.length > 0) {
      // Define the new topic object.
      const newTopic: Topic = {
        id: uuidv4(),
        name: inputValue,
        numberOfFlashcards: 0,
      };

      // Create new topic locally
      setTopics([...topics, newTopic]);

      // Create new topic on the server.
      topicService.createTopic(newTopic);
    }

    closeModal();
  }
}

export default AddTopicModal;
