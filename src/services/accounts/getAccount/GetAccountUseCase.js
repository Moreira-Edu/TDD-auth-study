import database from "../../../database/index.js";

class GetAccountUseCase {
  async execute({ id }) {
    const account = await database("accounts")
      .where({ id }).first();

    return account;
  }
}

export default GetAccountUseCase;
