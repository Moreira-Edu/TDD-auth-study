import database from "../../../database/index.js";

class GetUserUseCase {
  async execute(id) {
    const user = await database("users")
      .where({ id }).first();
    return user;
  }
}

export default GetUserUseCase;
