import { useParams } from "react-router-dom";
import "./ActiveQuizPage.scss";
import { useEffect, useState } from "react";
import flashcardService, { Flashcard } from "../../services/FlashcardService";
import topicService from "../../services/TopicService";

// Active Quiz Page component.
function ActiveQuizPage() {
  // topic of quiz | time per question, in seconds.
  let { topicId, timeSeconds } = useParams();
  topicId = topicId as string;
  timeSeconds = timeSeconds as string;

  const [topicName, setTopicName] = useState<string>("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    // Get topic name
    topicService
      .getTopic(topicId)
      .then((topic) => setTopicName(topic.name))
      .catch(() => console.log("Error fetching topic."));

    // Get topic flashcards
    // TODO: pass in proper user ID
    flashcardService.getUserFlashcardsByTopic("123", topicId);
  }, []);

  return (
    <div className="ActiveQuizPage">
      <h1 className="active-quiz-heading">{topicName} Quiz</h1>
    </div>
  );
}

export default ActiveQuizPage;
