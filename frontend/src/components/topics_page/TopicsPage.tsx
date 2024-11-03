import "./TopicsPage.scss";

interface Topic {
  id: number;
  name: string;
  numberOfFlashcards: number;
}

// The Topics page. Displays all the users topics.
function TopicsPage() {
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
      <button className="add-topic-button icon-button icon-button-green">
        <span className="material-symbols-rounded text-3xl">add</span>
      </button>
    </div>
  );
}

export default TopicsPage;
