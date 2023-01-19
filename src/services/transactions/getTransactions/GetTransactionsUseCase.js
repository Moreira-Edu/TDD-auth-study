import database from "../../../database/index.js";

class GetTransactionsUseCase {
  async execute(user_id, filter = {}) {
    const transactions = await database("transactions")
      .join("accounts", "accounts.id", "acc_id")
      .where(filter)
      .where("accounts.user_id", "=", user_id)
      .select();

    return transactions;
  }
}

export default GetTransactionsUseCase;
