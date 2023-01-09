import database from "../../../database/index.js";
import AppError from "../../../errors/AppError.js";

class CreateAccountUseCase {
  async execute({ name, user_id }) {
    if (!name) {
      throw new AppError("Nome é um atributo obrigatório");
    }

    const account = await database("accounts")
      .insert({ name, user_id }, "*");

    return account;
  }
}
export default CreateAccountUseCase;
