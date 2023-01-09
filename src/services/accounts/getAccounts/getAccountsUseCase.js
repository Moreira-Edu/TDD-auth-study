import database from "../../../database/index.js";

class GetAccountsUseCase {
  async execute() {
    const accounts = await database("accounts").select();

    return accounts;
  }
}

export default GetAccountsUseCase;
