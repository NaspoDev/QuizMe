import EditableFlashcard from "./editable_flashcard/EditableFlashcard";
import "./FlashcardsPage.scss";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  topic: string | null;
}

function FlashcardsPage() {
  // temp filler data
  const flashcards: Flashcard[] = [
    {
      id: 1,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 2,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 3,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 4,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 5,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 6,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 7,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 8,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 9,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
    {
      id: 10,
      question: "This is the question?",
      answer: "This is the answer.",
      topic: "OOP",
    },
  ];

  return (
    <div className="FlashcardsPage">
      <h1 className="flashcards-page-heading font-bold text-2xl">
        Your Flashcards
      </h1>
      <div className="content-container">
        <div className="flashcards-display">
          {flashcards.map((flashcard) => (
            <EditableFlashcard
              id={flashcard.id}
              answer={flashcard.answer}
              question={flashcard.question}
              topic={flashcard.topic}
              key={flashcard.id}
            />
          ))}
        </div>
        {/* add new task button */}
        <button className="add-task-button icon-button icon-button-green">
          <span className="material-symbols-rounded text-3xl">add</span>
        </button>
      </div>
    </div>
  );
}

export default FlashcardsPage;
