import { Topic } from "../../../../services/TopicService";
import Modal, { ModalProps } from "../../generic_modal/Modal";
import "./DeleteTopicConfirmationModal.scss";

interface DeleteTopicConfirmationModalProps extends ModalProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  topicToDelete: Topic | null;
}

// Confirmation prompt/modal when deleting a topic.
function DeleteTopicConfirmationModal({
  isOpen,
  closeModal,
  topics,
  setTopics,
  topicToDelete,
}: DeleteTopicConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      additionalClasses="DeleteTopicConfirmationModal"
    >
      <h3 className="confirm-delete-prompt font-bold">
        Are you sure you want to delete this topic?
      </h3>
      <p className="delete-all-flashcards-warning">
        This will also delete all flashcards associated with this topic.
      </p>
      <div className="buttons-container">
        <button className="button button-dark" onClick={closeModal}>
          Cancel
        </button>
        <button className="button button-danger" onClick={handleDeleteTopic}>
          Delete
        </button>
      </div>
    </Modal>
  );

  // Deleting a topic also involves deleting all flashcards associated with that topic,
  // which is handled by the TopicService.
  function handleDeleteTopic(): void {
    if (topicToDelete == null) {
      console.error("Cannot delete topic because topic is null!");
      return;
    }

    // Delete topic locally by updating the topics state array.
    const updatedTopics: Topic[] = topics.filter(
      (topic) => topic.id != topicToDelete.id
    );
    setTopics(updatedTopics);

    closeModal();
  }
}

export default DeleteTopicConfirmationModal;
