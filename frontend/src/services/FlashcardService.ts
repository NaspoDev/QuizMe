// Flashcard service. Handles all server related Flashcard operations.

// The Flashcard interface, used to create Flashcard objects.
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topicId: string | null;
}

class FlashcardService {
  async getUserFlashcards(userId: string): Promise<Flashcard[]> {
    // TODO: implementation
    console.log(userId);
    // filler data
    return [
      {
        id: "1",
        question: "This is the first question?",
        answer: "This is the first answer.",
        topicId: "1",
      },
      {
        id: "2",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: "2",
      },
      {
        id: "3",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: "3",
      },
      {
        id: "4",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: "1",
      },
      {
        id: "5",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: "3",
      },
      {
        id: "6",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: "3",
      },
      {
        id: "7",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: "1",
      },
      {
        id: "8",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: "2",
      },
      {
        id: "9",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: null,
      },
      {
        id: "10",
        question: "This is the question?",
        answer: "This is the answer.",
        topicId: null,
      },
    ];
  }
}

const flashcardService: FlashcardService = new FlashcardService();
export default flashcardService;
