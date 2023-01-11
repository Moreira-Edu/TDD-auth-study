import database from "../../../database/index.js";
import AppError from "../../../errors/AppError.js";

class CreateUserUseCase {
  async execute({ name, email, password }) {
    const userExists = await database("users")
      .where({ email }).select();

    if (userExists && userExists.length > 0) {
      throw new AppError("E-mail já cadastrado");
    }

    const user = await database("users")
      .insert(
        { name, email, password },
        ["id", "name", "email"],
      );

    return user;
  }
}

export default CreateUserUseCase;
