// Flashcard service. Handles all server related Flashcard operations.

// The Flashcard interface, used to create Flashcard objects.
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topicId: string;
}

class FlashcardService {
  async getUserFlashcardsByTopic(
    userId: string,
    topicId: string
  ): Promise<Flashcard[]> {
    // TODO: implementation

    // filler implementation
    console.log(userId);

    const result: Flashcard[] = [];

    for (const card of flashcards) {
      if (card.topicId == topicId) {
        result.push(card);
      }
    }

    return result;
  }

  async createFlashcard(flashcard: Flashcard): Promise<void> {
    // TODO: implementation
    console.log("New flashcard created on the server!");
    console.log(flashcard);
  }

  async updateFlashcard(flashcard: Flashcard): Promise<void> {
    // TODO: implementation
    console.log("Updated flashcard on the server!");
    console.log(flashcard);
  }
}

const flashcardService: FlashcardService = new FlashcardService();
export default flashcardService;

// filler data
const flashcards: Flashcard[] = [
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
    topicId: "2",
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
    topicId: "1",
  },
  {
    id: "10",
    question: "This is the question?",
    answer: "This is the answer.",
    topicId: "3",
  },
];
