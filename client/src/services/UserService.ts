// User service. Handles all server related user operations.

import { User } from "../utility/user-utility";

class UserService {
  // Tries to create a new user with the user provided if they don't exist.
  async createUserIfDoesNotExist(user: User): Promise<void> {
    // TODO: implementation...
  }
}

const userService: UserService = new UserService();
export default userService;
