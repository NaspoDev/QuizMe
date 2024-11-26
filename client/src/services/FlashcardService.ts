// Flashcard service. Handles all server related Flashcard operations.

import apiUrl from "../api";

// The Flashcard interface, used to create Flashcard objects.
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topicId: string;
}

class FlashcardService {
  readonly flashcardsRoute: string = `${apiUrl}/flashcards`;

  async getUserFlashcardsByTopic(topicId: string): Promise<Flashcard[]> {
    const response = await fetch(`${this.flashcardsRoute}/topic/${topicId}`);
    const data = await response.json();

    const result: Flashcard[] = [];
    for (const flashcardData of data) {
      const flashcard: Flashcard = {
        id: flashcardData.flashcard_id,
        question: flashcardData.question,
        answer: flashcardData.answer,
        topicId: topicId,
      };
      result.push(flashcard);
    }

    return result;
  }

  async createFlashcard(flashcard: Flashcard): Promise<void> {
    fetch(`${this.flashcardsRoute}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flashcardId: flashcard.id,
        question: flashcard.question,
        answer: flashcard.answer,
        topicId: flashcard.topicId,
      }),
    }).catch((error) => console.error("Error creating flashcard:", error));
  }

  async updateFlashcard(flashcard: Flashcard): Promise<void> {
    fetch(`${this.flashcardsRoute}/${flashcard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: flashcard.question,
        answer: flashcard.answer,
      }),
    }).catch((error) => console.error("Error updating flashcard:", error));
  }

  async deleteFlashcard(flashcard: Flashcard): Promise<void> {
    fetch(`${this.flashcardsRoute}/${flashcard.id}`, {
      method: "DELETE",
    }).catch((error) => console.error("Failed to delete flashcard:", error));
  }
}

const flashcardService: FlashcardService = new FlashcardService();
export default flashcardService;
