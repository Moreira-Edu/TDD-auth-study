import database from "../../../database/index.js";

class CreateUserUseCase {
  async execute({ name, email, password }) {
    const user = await database("users")
      .insert(
        { name, email, password },
        ["id", "name", "email"],
      );

    return user;
  }
}

export default CreateUserUseCase;
