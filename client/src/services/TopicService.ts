// Topic service. Handles all server related Topics operations.

import apiUrl from "../api";
import { getUser, User } from "../utility/user-utility";
import flashcardService, { Flashcard } from "./FlashcardService";

// The Topic interface, used to create Topics.
export interface Topic {
  id: string;
  name: string;
  numberOfFlashcards: number;
}

class TopicService {
  readonly topicsRoute: string = `${apiUrl}/topics`;
  readonly guestSessionStorageTopicsKey: string = "guestUserTopics";

  async getUserTopics(): Promise<Topic[]> {
    const user: User = getUser();
    if (!user) {
      throw new Error("Cannot get user topics for null user!");
    }

    // If its a guest user, use session storage.
    if (user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageTopicsKey
      );
      // If its null, return an empty array.
      if (!result) {
        return [];
      } else {
        // Parse the JSON.
        const parsedResult: Topic[] = JSON.parse(result);
        return parsedResult;
      }
    }

    // Make the requests. First fetch topics, then for each topic fetch their
    // flashcards to fill the numberOfFlashcards property for each Topic object.
    try {
      // Fetch topics.
      const topicsResponse = await fetch(
        `${this.topicsRoute}/user-topics/${user.userId}`
      );
      if (!topicsResponse.ok) {
        throw new Error(`Failed to fetch topics: ${topicsResponse.statusText}`);
      }

      // Get the json topics response.
      const topicsResponseJson = await topicsResponse.json();

      // Parse the topics json response to an object.
      const topicsData: { id: string; name: string }[] = topicsResponseJson.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (topic: any) => {
          return {
            id: topic.topic_id,
            name: topic.name,
          };
        }
      );

      // `result` is our Topic list.
      // It will be constructed by requesting flashcards for each topicId in topicsData
      // and combining it with the topic data for that topic.
      const result: Topic[] = await Promise.all(
        topicsData.map(async (topicData) => {
          const flashcards: Flashcard[] =
            await flashcardService.getUserFlashcardsByTopic(topicData.id);

          const topic: Topic = {
            id: topicData.id,
            name: topicData.name,
            numberOfFlashcards: flashcards.length,
          };

          return topic;
        })
      );

      return result;
    } catch (error) {
      console.error("Error fetching user topics:", error);
      throw error;
    }
  }

  async getTopic(topicId: string): Promise<Topic> {
    // If its a guest user, use session storage.
    const user: User = getUser();
    if (user && user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageTopicsKey
      );
      // If its null, print and error.
      if (!result) {
        throw new Error(
          "There are no topics set in session storage for the guest user!"
        );
      } else {
        // Parse the JSON and find the correct topic
        const parsedResult: Topic[] = JSON.parse(result);
        for (const topic of parsedResult) {
          if (topic.id == topicId) {
            return topic;
          }
        }
        // If the correct topic could not be found throw an error.
        throw new Error("Could not find correct topic for guest user!");
      }
    }

    try {
      // Fetch topic.
      const topicResponse = await fetch(`${this.topicsRoute}/${topicId}`);
      const topicResJson = await topicResponse.json();
      const topicData = topicResJson[0];

      // Fetch flashcards for the topic to get the number of flashcards.
      const flashcards: Flashcard[] =
        await flashcardService.getUserFlashcardsByTopic(topicData.topic_id);

      // Construct and return the topic object.
      const result: Topic = {
        id: topicData.topic_id,
        name: topicData.name,
        numberOfFlashcards: flashcards.length,
      };

      return result;
    } catch (error) {
      console.error("Error fetching user topic:", error);
      throw error;
    }
  }

  async createTopic(topic: Topic): Promise<void> {
    const user: User = getUser();
    if (!user) {
      throw new Error("Cannot get user topics for null user!");
    }

    // If its a guest user, use session storage.
    if (user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageTopicsKey
      );
      // If its null, set a new array with the new topic.
      if (!result) {
        sessionStorage.setItem(
          this.guestSessionStorageTopicsKey,
          JSON.stringify([topic])
        );
      } else {
        // Parse the JSON, add the new topic to the list, and re-set that value.
        const parsedResult: Topic[] = JSON.parse(result);
        parsedResult.push(topic);
        sessionStorage.setItem(
          this.guestSessionStorageTopicsKey,
          JSON.stringify(parsedResult)
        );
      }
      return;
    }

    const userId: string = user.userId;

    try {
      await fetch(`${this.topicsRoute}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicId: topic.id,
          topicName: topic.name,
          userId: userId,
        }),
      });
    } catch (error) {
      console.error("Failed to create topic:", error);
    }
  }

  async updateTopic(topic: Topic): Promise<void> {
    // If its a guest user, use session storage.
    const user: User = getUser();
    if (user && user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageTopicsKey
      );
      // If its null, throw an error.
      if (!result) {
        throw new Error(
          "There are no topics set in session storage for the guest user!"
        );
      } else {
        // Parse the JSON, update the correct topic, then re-set the topics.
        const parsedResult: Topic[] = JSON.parse(result);
        const updatedTopics: Topic[] = parsedResult.map((t) => {
          if (t.id == topic.id) {
            return topic;
          }
          return t;
        });
        sessionStorage.setItem(
          this.guestSessionStorageTopicsKey,
          JSON.stringify(updatedTopics)
        );
      }
      return;
    }

    return fetch(`${this.topicsRoute}/${topic.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: topic.name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error(`Failed to update topic: ${response.statusText}`);
        }
      })
      .catch((error) => console.error("Failed to update topic:", error));
  }

  // Deleting a topic also involves deleting all flashcards associated with that topic.
  async deleteTopic(topic: Topic): Promise<void> {
    // If its a guest user, use session storage.
    const user: User = getUser();
    if (user && user.userType == "guest") {
      // Get the result from session storage.
      const result: string | null = sessionStorage.getItem(
        this.guestSessionStorageTopicsKey
      );
      // If its null, throw an error.
      if (!result) {
        throw new Error(
          "There are no topics set in session storage for the guest user!"
        );
      } else {
        // Parse the JSON, delete the correct topic, then re-set the topics.
        const parsedResult: Topic[] = JSON.parse(result);
        const updatedTopics: Topic[] = parsedResult.filter(
          (t) => t.id != topic.id
        );
        sessionStorage.setItem(
          this.guestSessionStorageTopicsKey,
          JSON.stringify(updatedTopics)
        );
      }
      return;
    }

    fetch(`${this.topicsRoute}/${topic.id}`, {
      method: "DELETE",
    }).catch((error) => console.error("Failed to delete topic:", error));
  }
}

const topicService: TopicService = new TopicService();
export default topicService;
