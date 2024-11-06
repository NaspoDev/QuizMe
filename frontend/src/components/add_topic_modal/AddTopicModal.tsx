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
    if (!isOpen) {
      return;
    }

    // Window click listener.
    window.addEventListener(
      "click",
      (event) => {
        console.log(event.target);
        if (event.target != document.getElementById("AddTopicModal")) {
          closeModal();
          console.log("called!");
        }
      },
      { once: true }
    );
  }, []);

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
      <div className="add-topic-modal-overlay"></div>
    </>
  );

  function handleCreateTopic(): void {
    // TODO: implement logic
    closeModal();
  }
}

export default AddTopicModal;
