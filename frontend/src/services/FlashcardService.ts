// Flashcard service. Handles all server related Flashcard operations.

// The Flashcard interface, used to create Flashcard objects.
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topicInfo: null | { topicId: string; topicName: string };
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
        topicInfo: {
          topicId: "1",
          topicName: "OOP",
        },
      },
      {
        id: "2",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: {
          topicId: "2",
          topicName: "Design Patterns",
        },
      },
      {
        id: "3",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: {
          topicId: "2",
          topicName: "Design Patterns",
        },
      },
      {
        id: "4",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: {
          topicId: "1",
          topicName: "OOP",
        },
      },
      {
        id: "5",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: {
          topicId: "3",
          topicName: "System Design",
        },
      },
      {
        id: "6",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: {
          topicId: "3",
          topicName: "System Design",
        },
      },
      {
        id: "7",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: {
          topicId: "1",
          topicName: "OOP",
        },
      },
      {
        id: "8",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: {
          topicId: "2",
          topicName: "Design Patterns123456789",
        },
      },
      {
        id: "9",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: null,
      },
      {
        id: "10",
        question: "This is the question?",
        answer: "This is the answer.",
        topicInfo: null,
      },
    ];
  }
}

const flashcardService: FlashcardService = new FlashcardService();
export default flashcardService;
