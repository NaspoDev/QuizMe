import { useEffect, useState } from "react";
import "./TopicsPage.scss";
import topicService, { Topic } from "../../services/TopicService";
import AddTopicModal from "../modals/specific_modals/add_topic_modal/AddTopicModal";
import { useNavigate } from "react-router-dom";
import DeleteTopicConfirmationModal from "../modals/specific_modals/delete_topic_confirmation_modal/DeleteTopicConfirmationModal";
import EditTopicModal from "../modals/specific_modals/edit_topic_modal/EditTopicModal";

// The Topics page. Displays all the users topics.
function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] =
    useState<boolean>(false);

  // This will be set with whatever topic needs to be edited.
  // 'setTopicToEdit' is called when the user presses the edit button on a topic card.
  // prettier-ignore
  const [topicToEdit, setTopicToEdit] = useState<Topic | null>(null);
  const [isEditTopicModalOpen, setIsEditTopicModalOpen] =
    useState<boolean>(false);

  // This will be set with whatever topic that the user clicked to delete.
  // 'setTopicToDelete' is called when the user presses the delete button on a topic card.
  // Used by DeleteTopicConfirmationModal to get info about the topic that may be deleted,
  // and to act on it if the deletion is confirmed.
  // prettier-ignore
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Call backend api to get the user's topics.
    // TODO: pass in proper ID
    topicService.getUserTopics("123").then(setTopics);
  }, []);

  return (
    <div className="TopicsPage">
      <h1 className="topics-heading text-2xl font-bold">Your Topics</h1>
      <div className="topics-display">
        {topics.map((topic) => (
          <div
            className="topic-card font-semibold button"
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
          >
            <div className="info-container">
              <p className="topic-name">{topic.name}</p>
              <div className="number-of-flashcards-container">
                <span className="material-symbols-rounded flashcard-icon">
                  quiz
                </span>
                <p className="topic-number-of-flashcards font-light">
                  {topic.numberOfFlashcards} cards
                </p>
              </div>
            </div>
            <div className="buttons-container">
              <span
                className="material-symbols-rounded edit-icon-button"
                onClick={(event) => handleEditButtonClick(event, topic)}
              >
                edit
              </span>
              <span
                className="material-symbols-rounded delete-icon-button"
                onClick={(event) => handleDeleteButtonClick(event, topic)}
              >
                delete
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* add new topic button */}
      <button
        className="add-topic-button icon-button icon-button-green"
        onClick={openAddTopicModal}
      >
        <span className="material-symbols-rounded text-3xl">add</span>
      </button>
      <AddTopicModal
        isOpen={isAddTopicModalOpen}
        closeModal={closeAddTopicModal}
        topics={topics}
        setTopics={setTopics}
      />
      <EditTopicModal
        isOpen={isEditTopicModalOpen}
        closeModal={closeEditTopicModal}
        topics={topics}
        setTopics={setTopics}
        topicToEdit={topicToEdit}
      />
      <DeleteTopicConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        closeModal={closeDeleteConfirmationModal}
        topics={topics}
        setTopics={setTopics}
        topicToDelete={topicToDelete}
      />
    </div>
  );

  // Navigates to the flashcard page for the pressed topic.
  function handleTopicClick(topic: Topic): void {
    navigate(`/topics/${topic.id}/${topic.name}`);
  }

  // Opens the edit topic modal when the edit topic button is pressed.
  function handleEditButtonClick(
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    topic: Topic
  ): void {
    // The edit button is inside of topic card, which has it's own click listener.
    // Stopping the event propagation so that the topic's click event isn't called.
    event.stopPropagation();
    setTopicToEdit(topic);
    openEditTopicModal();
  }

  // Opens the delete confirmation modal when the delete topic button is pressed.
  function handleDeleteButtonClick(
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    topic: Topic
  ): void {
    // The delete button is inside of topic card, which has it's own click listener.
    // Stopping the event propagation so that the topic's click event isn't called.
    event.stopPropagation();
    setTopicToDelete(topic);
    openDeleteConfirmationModal();
  }

  // Opens the add topic modal.
  function openAddTopicModal(): void {
    setIsAddTopicModalOpen(true);
  }

  // Closes the add topic modal.
  function closeAddTopicModal(): void {
    setIsAddTopicModalOpen(false);
  }

  // Opens the edit topic modal.
  function openEditTopicModal(): void {
    setIsEditTopicModalOpen(true);
  }

  // Closes the edit topic modal.
  function closeEditTopicModal(): void {
    setIsEditTopicModalOpen(false);
  }

  // Opens the delete topic confirmation modal.
  function openDeleteConfirmationModal(): void {
    setIsDeleteConfirmationModalOpen(true);
  }

  // Closes the delete topic confirmation modal.
  function closeDeleteConfirmationModal(): void {
    setIsDeleteConfirmationModalOpen(false);
  }
}

export default TopicsPage;
