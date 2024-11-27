// Flashcard service. Handles all server related Flashcard operations.

import apiUrl from "../api";
import { getUser, User } from "../utility/user-utility";

// The Flashcard interface, used to create Flashcard objects.
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topicId: string;
}

class FlashcardService {
  readonly flashcardsRoute: string = `${apiUrl}/flashcards`;
  readonly guestSessionStorageFlashcardsKey: string = "guestUserFlashcards";

  async getUserFlashcardsByTopic(topicId: string): Promise<Flashcard[]> {
    // If its a guest user, use session storage.
    const user: User = getUser();
    if (user && user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageFlashcardsKey
      );
      // If its null, return an empty array.
      if (!result) {
        return [];
      } else {
        // Parse the JSON and filter for flashcards for the topic id provided.
        const parsedResult: Flashcard[] = JSON.parse(result);
        const flashcardsForTopic: Flashcard[] = parsedResult.filter(
          (flashcard) => flashcard.topicId == topicId
        );
        return flashcardsForTopic;
      }
    }

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
    // If its a guest user, use session storage.
    const user: User = getUser();
    if (user && user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageFlashcardsKey
      );
      // If its null, set a new array with the new flashcard.
      if (!result) {
        sessionStorage.setItem(
          this.guestSessionStorageFlashcardsKey,
          JSON.stringify([flashcard])
        );
      } else {
        // Parse the JSON, add the new topic to the list, and re-set that value.
        const parsedResult: Flashcard[] = JSON.parse(result);
        parsedResult.push(flashcard);
        sessionStorage.setItem(
          this.guestSessionStorageFlashcardsKey,
          JSON.stringify(parsedResult)
        );
      }
      return;
    }

    return fetch(`${this.flashcardsRoute}/`, {
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
    })
      .then((response) => {
        if (!response.ok) {
          console.error(`Failed to create flashcard: ${response.statusText}`);
        }
      })
      .catch((error) => console.error("Error creating flashcard:", error));
  }

  async updateFlashcard(flashcard: Flashcard): Promise<void> {
    // If its a guest user, use session storage.
    const user: User = getUser();
    if (user && user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageFlashcardsKey
      );
      // If its null, throw an error.
      if (!result) {
        throw new Error(
          "There are no flashcards set in session storage for the guest user!"
        );
      } else {
        // Parse the JSON, update the correct flashcard, then re-set the flashcards.
        const parsedResult: Flashcard[] = JSON.parse(result);
        const updatedFlashcards: Flashcard[] = parsedResult.map((f) => {
          if (f.id == flashcard.id) {
            return flashcard;
          }
          return f;
        });
        sessionStorage.setItem(
          this.guestSessionStorageFlashcardsKey,
          JSON.stringify(updatedFlashcards)
        );
      }
      return;
    }

    return fetch(`${this.flashcardsRoute}/${flashcard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: flashcard.question,
        answer: flashcard.answer,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error(`Failed to update flashcard: ${response.statusText}`);
        }
      })
      .catch((error) => console.error("Error updating flashcard:", error));
  }

  async deleteFlashcard(flashcard: Flashcard): Promise<void> {
    // If its a guest user, use session storage.
    const user: User = getUser();
    if (user && user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageFlashcardsKey
      );
      // If its null, throw an error.
      if (!result) {
        throw new Error(
          "There are no flashcards set in session storage for the guest user!"
        );
      } else {
        // Parse the JSON, delete the correct flashcard, then re-set the flashcards.
        const parsedResult: Flashcard[] = JSON.parse(result);
        const updatedFlashcards: Flashcard[] = parsedResult.filter(
          (f) => f.id != flashcard.id
        );
        sessionStorage.setItem(
          this.guestSessionStorageFlashcardsKey,
          JSON.stringify(updatedFlashcards)
        );
      }
      return;
    }

    return fetch(`${this.flashcardsRoute}/${flashcard.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.error(`Failed to delete flashcard: ${response.statusText}`);
        }
      })
      .catch((error) => console.error("Failed to delete flashcard:", error));
  }
}

const flashcardService: FlashcardService = new FlashcardService();
export default flashcardService;
