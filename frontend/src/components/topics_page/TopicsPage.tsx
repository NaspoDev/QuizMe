import { useEffect, useState } from "react";
import "./TopicsPage.scss";
import topicService, { Topic } from "../../services/TopicService";
import AddTopicModal from "../modals/specific_modals/add_topic_modal/AddTopicModal";
import { useNavigate } from "react-router-dom";
import DeleteTopicConfirmationModal from "../modals/specific_modals/delete_topic_confirmation_modal/DeleteTopicConfirmationModal";

// The Topics page. Displays all the users topics.
function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] =
    useState<boolean>(false);
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
            <div className="delete-button-container">
              <span
                className="material-symbols-rounded delete-icon-button"
                onClick={(event) => handleDeleteButtonClick(event)}
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
      <DeleteTopicConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        closeModal={closeDeleteConfirmationModal}
      />
    </div>
  );

  // Navigates to the flashcard page for the pressed topic.
  function handleTopicClick(topic: Topic): void {
    navigate(`/topics/${topic.id}/${topic.name}`);
  }

  // Opens the delete confirmation modal when the delete topic button is pressed.
  function handleDeleteButtonClick(
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): void {
    // The delete button is inside of topic card, which has it's own click listener.
    // Stopping the event propagation so that the topic's click event isn't called.
    event.stopPropagation();
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
