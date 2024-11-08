import Modal, { ModalProps } from "../../generic_modal/Modal";
import "./DeleteTopicConfirmationModal.scss";

interface DeleteTopicConfirmationModalProps extends ModalProps {}

// Confirmation prompt/modal when deleting a topic.
function DeleteTopicConfirmationModal({
  isOpen,
  closeModal,
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

  function handleDeleteTopic(): void {
    closeModal();
  }
}

export default DeleteTopicConfirmationModal;
