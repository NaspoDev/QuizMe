// Topic service. Handles all server related Topics operations.

// The Topic interface, used to create Topics.
export interface Topic {
  id: string;
  name: string;
  numberOfFlashcards: number;
}

// filler data
const topics: Topic[] = [
  { id: "1", name: "OOP", numberOfFlashcards: 10 },
  {
    id: "2",
    name: "Design Patterns",
    numberOfFlashcards: 8,
  },
  { id: "3", name: "System Design", numberOfFlashcards: 23 },
];

class TopicService {
  async getUserTopics(userId: string): Promise<Topic[]> {
    // TODO: implementation
    console.log(userId);
    return topics;
  }

  async getTopic(topicId: string): Promise<Topic | null> {
    // TODO: implementation
    console.log(topicId);
    for (const topic of topics) {
      if (topic.id == topicId) {
        return topic;
      }
    }

    return null;
  }

  async createTopic(topic: Topic): Promise<void> {
    // TODO: implementation
    console.log("New topic created on the server!");
    console.log(topic);
  }
}

const topicService: TopicService = new TopicService();
export default topicService;
