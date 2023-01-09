import database from "../../../database/index.js";

class GetUsersUseCase {
  async execute() {
    const users = await database("users").select();

    return users;
  }
}

export default GetUsersUseCase;
