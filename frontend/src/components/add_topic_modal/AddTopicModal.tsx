import "./AddTopicModal.scss";

function AddTopicModal({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="AddTopicModal">
        <h3 className="add-topic-heading text-lg">Create New Topic</h3>
        <form className="add-topic-form">
          <input
            type="text"
            className="topic-name-input"
            placeholder="Topic Name"
          />
        </form>
        <div className="buttons-container">
          <button className="button">Cancel</button>
          <button className="button">Create</button>
        </div>
      </div>
      {/* Used to apply a dark overlay behind the modal. */}
      <div className="add-topic-modal-overlay"></div>
    </>
  );
}

export default AddTopicModal;
