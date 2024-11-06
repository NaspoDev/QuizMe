import { useEffect, useState } from "react";
import "./TopicsPage.scss";
import topicService, { Topic } from "../../services/TopicService";
import AddTopicModal from "../add_topic_modal/AddTopicModal";

// The Topics page. Displays all the users topics.
function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    // Call backend api to get the user's topics.
    topicService.getUserTopics("123").then(setTopics);
  });

  return (
    <div className="TopicsPage">
      <h1 className="topics-heading text-2xl font-bold">Your Topics</h1>
      <div className="topics-display">
        {topics.map((topic) => (
          <div className="topic-card font-semibold button" key={topic.id}>
            <p className="topic-name">{topic.name}</p>
            <div className="details-container">
              <p className="topic-number-of-flashcards">
                {topic.numberOfFlashcards}
              </p>
              <span className="material-symbols-rounded">quiz</span>
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
      />
    </div>
  );

  // Opens the add topic modal.
  function openAddTopicModal(): void {
    setIsAddTopicModalOpen(true);
  }

  function closeAddTopicModal(): void {
    setIsAddTopicModalOpen(false);
  }
}

export default TopicsPage;
