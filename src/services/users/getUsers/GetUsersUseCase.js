import database from "../../../database/index.js";

class GetUsersUseCase {
  async execute() {
    const users = await database("users")
      .select(["id", "name", "email"]);

    return users;
  }
}

export default GetUsersUseCase;
