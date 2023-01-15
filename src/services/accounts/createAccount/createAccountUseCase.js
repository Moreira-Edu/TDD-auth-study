import database from "../../../database/index.js";

class CreateAccountUseCase {
  async execute({ name, user_id }) {
    const account = await database("accounts")
      .insert({ name, user_id }, "*");

    return account;
  }
}
export default CreateAccountUseCase;
