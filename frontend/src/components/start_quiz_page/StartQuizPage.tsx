import { useEffect, useState } from "react";
import "./StartQuizPage.scss";
import topicService, { Topic } from "../../services/TopicService";
import LabeledSlider from "../labeled_slider/LabeledSlider";

function StartQuizPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [quizTimeSelectionDisplayed, setQuizTimeSelectionDisplayed] =
    useState<boolean>(false);

  useEffect(() => {
    // Call backend api to get the user's topics.
    // TODO: pass in proper ID
    topicService.getUserTopics("123").then(setTopics);
  }, []);

  return (
    <div className="StartQuizPage">
      <h1 className="start-quiz-heading text-2xl font-bold">Start a Quiz</h1>
      <form
        className="start-quiz-form"
        onSubmit={(event) => handleStartQuiz(event)}
      >
        <div className="topic-selection form-item">
          <label htmlFor="quiz-topic-selection" className="font-semibold">
            Select Topic:
          </label>
          <select
            className="quiz-topic-selection"
            name=" topicSelection"
            id="quiz-topic-selection"
          >
            {topics.map((topic) => (
              <option
                className="quiz-topic-selection-option"
                value={topic.id}
                key={topic.id}
              >
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        <div className="timed-quiz-selection-container form-item">
          <p className="timed-quiz-selection-heading font-semibold">
            Timed Quiz?
          </p>

          <div className="timed-quiz-options-container">
            <div className="timed-quiz-option-container">
              <input
                type="radio"
                id="timed-quiz-option-false"
                value="No"
                name="timed-quiz-option"
                className="timed-quiz-option"
                defaultChecked
                onChange={hideQuizTimeSelection}
              />
              <label htmlFor="timed-quiz-option-false">No</label>
            </div>
            <div className="timed-quiz-option-container">
              <input
                type="radio"
                id="timed-quiz-option-true"
                value="Yes"
                name="timed-quiz-option"
                className="timed-quiz-option"
                onChange={showQuizTimeSelection}
              />
              <label htmlFor="timed-quiz-option-true">Yes</label>
            </div>
          </div>
        </div>

        {quizTimeSelectionDisplayed && (
          <LabeledSlider
            minValue={0}
            maxValue={60}
            defaultValue={15}
            htmlSliderId="quiz-time-selection-input"
            label="Time Per Question:"
            labelPostfix="s"
            additionalClasses="form-item"
          />
        )}

        <div className="submit-button-container">
          <button
            type="submit"
            className="button button-success quiz-start-submit-button"
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );

  function showQuizTimeSelection(): void {
    setQuizTimeSelectionDisplayed(true);
  }

  function hideQuizTimeSelection(): void {
    setQuizTimeSelectionDisplayed(false);
  }

  // Start a quiz based on the selection in the form.
  function handleStartQuiz(event: React.FormEvent<HTMLFormElement>): void {
    // TODO: implement logic
  }
}

export default StartQuizPage;
