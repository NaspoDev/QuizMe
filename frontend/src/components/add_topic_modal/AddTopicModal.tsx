import { useEffect } from "react";
import "./AddTopicModal.scss";

interface AddTopicModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

function AddTopicModal({ isOpen, closeModal }: AddTopicModalProps) {
  // Set event listeners on mount to listen for `esc` key click or
  // clicking outside of modal to close it.
  useEffect(() => {
    if (isOpen) {
      // Window click listener.
      document
        .getElementById("add-topic-modal-overlay")
        ?.addEventListener("click", handleOutsideClick);

      // Key press listener.
      window.addEventListener("keydown", handleKeyPress);
    } else {
      // When the modal is closed, remove the listeners.
      document
        .getElementById("add-topic-modal-overlay")
        ?.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyPress);
    }

    // Remove the event listeners when the component unmounts.
    // This is used as another safety even though we already have the if statement above.
    return () => {
      document
        .getElementById("add-topic-modal-overlay")
        ?.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="AddTopicModal" id="AddTopicModal">
        <h3 className="add-topic-heading text-lg">Create New Topic</h3>
        <form className="add-topic-form">
          <input
            type="text"
            className="topic-name-input"
            placeholder="Topic Name"
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
      </div>
      {/* Used to apply a dark overlay behind the modal. */}
      <div
        className="add-topic-modal-overlay"
        id="add-topic-modal-overlay"
      ></div>
    </>
  );

  function handleCreateTopic(): void {
    // TODO: implement logic
    closeModal();
  }

  // Function to handle when the user clicks outside the modal.
  // Closes the modal.
  function handleOutsideClick(): void {
    closeModal();
  }

  // Function to handle when the user presses a key.
  // If it is the escape key, close the modal.
  function handleKeyPress(event: KeyboardEvent): void {
    if (event.key == "Escape") {
      closeModal();
    }
  }
}

export default AddTopicModal;
