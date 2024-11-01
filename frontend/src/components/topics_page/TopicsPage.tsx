import "./TopicsPage.scss";

interface Topic {
  id: number;
  name: string;
  numberOfFlashcards: number;
}

// The Topics page. Displays all the users topics.
function TopicsPage() {
  // temp filler data
  const topics: Topic[] = [
    { id: 1, name: "OOP", numberOfFlashcards: 10 },
    { id: 2, name: "Design Patterns", numberOfFlashcards: 8 },
    { id: 3, name: "System Design", numberOfFlashcards: 23 },
  ];

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
    </div>
  );
}

export default TopicsPage;
