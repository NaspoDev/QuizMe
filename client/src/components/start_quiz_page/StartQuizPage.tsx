import { useEffect, useState } from "react";
import "./StartQuizPage.scss";
import topicService, { Topic } from "../../services/TopicService";
import LabeledSlider from "../labeled_slider/LabeledSlider";
import { useNavigate } from "react-router-dom";

function StartQuizPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [quizTimeSelectionDisplayed, setQuizTimeSelectionDisplayed] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Call backend api to get the user's topics.
    topicService
      .getUserTopics()
      .then(setTopics)
      .catch((error) => console.error("Could not get user topics:", error));
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
            minValue={1}
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
    event.preventDefault();
    const topicSelectionElement: HTMLSelectElement = document.getElementById(
      "quiz-topic-selection"
    ) as HTMLSelectElement;
    const timedQuizOptionTrue: HTMLInputElement = document.getElementById(
      "timed-quiz-option-true"
    ) as HTMLInputElement;

    const topicId: string = topicSelectionElement.value;

    // If a timed quiz is not selected, navigate to active-quiz.
    // (Pass in '0' for time param as 0 will represent unlimited time).
    if (!timedQuizOptionTrue.checked) {
      navigate(`/active-quiz/${topicId}/0`);
      return;
    }

    // Otherwise, a timed quiz has been selected.
    // Get the time selection from the time selection slider element.
    const quizTimeSelectionElement: HTMLInputElement = document.getElementById(
      "quiz-time-selection-input"
    ) as HTMLInputElement;
    const timePerQuestionSec: string = quizTimeSelectionElement.value;

    // Navigate to active-quiz with the respective time param.
    navigate(`/active-quiz/${topicId}/${timePerQuestionSec}`);
  }
}

export default StartQuizPage;
