import database from "../../../database/index.js";

class UpdateAccountUseCase {
  async execute({ id, name }) {
    const account = await database("accounts")
      .where({ id }).update({ name }, "*");

    return account;
  }
}

export default UpdateAccountUseCase;
