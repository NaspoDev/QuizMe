import { useParams } from "react-router-dom";
import "./ActiveQuizPage.scss";

// Active Quiz Page component.
function ActiveQuizPage() {
  // topic of quiz | time per question, in seconds.
  let { topicId, timeSeconds } = useParams();
  topicId = topicId as string;
  timeSeconds = timeSeconds as string;

  return <div className="ActiveQuizPage">ActiveQuizPage</div>;
}

export default ActiveQuizPage;
