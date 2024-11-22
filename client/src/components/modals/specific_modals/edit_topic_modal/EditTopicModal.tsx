import "./EditTopicModal.scss";
import topicService, { Topic } from "../../../../services/TopicService";
import Modal, { ModalProps } from "../../generic_modal/Modal";

interface EditTopicModalProps extends ModalProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  topicToEdit: Topic | null;
}

function EditTopicModal({
  isOpen,
  closeModal,
  topics,
  setTopics,
  topicToEdit,
}: EditTopicModalProps) {
  if (topicToEdit == null) {
    return;
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      additionalClasses="EditTopicModal"
    >
      <h3 className="edit-topic-heading text-lg">Edit Topic</h3>
      <form className="edit-topic-form">
        <input
          type="text"
          placeholder="Topic Name"
          className="topic-name-input"
          id="topic-name-input"
          defaultValue={topicToEdit.name}
        />
      </form>
      <div className="buttons-container text-sm">
        <button className="button button-dark" onClick={closeModal}>
          Cancel
        </button>
        <button className="button button-success" onClick={handleUpdateTopic}>
          Confirm
        </button>
      </div>
    </Modal>
  );

  function handleUpdateTopic(): void {
    const topicNameInput: HTMLInputElement = document.getElementById(
      "topic-name-input"
    ) as HTMLInputElement;
    const inputValue: string = topicNameInput.value.trim();

    if (topicToEdit == null) {
      return;
    }

    if (inputValue.length > 0) {
      // Define the updated topic as a new object.
      const updatedTopic: Topic = {
        id: topicToEdit.id,
        name: inputValue,
        numberOfFlashcards: topicToEdit.numberOfFlashcards,
      };

      // Update the topics state array.
      const updatedTopics: Topic[] = topics.map((topic) =>
        topic.id == topicToEdit.id ? updatedTopic : topic
      );
      setTopics(updatedTopics);

      // Update the topic on the server.
      topicService.updateTopic(updatedTopic);
    }

    closeModal();
  }
}

export default EditTopicModal;
