import database from "../../../database/index.js";

class GetAccountsUseCase {
  async execute(id) {
    const accounts = await database("accounts")
      .where({ user_id: id });

    return accounts;
  }
}

export default GetAccountsUseCase;
