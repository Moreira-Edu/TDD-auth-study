import database from "../../../database/index.js";

class GetBalanceUseCase {
  async execute(user_id) {
    const balance = await database("transactions as t")
      .sum("amount")
      .join("accounts as acc", "acc.id", "=", "t.acc_id")
      .where({ user_id, status: true })
      .where("date", "<=", new Date())
      .select("acc.id")
      .groupBy("acc.id")
      .orderBy("acc.id");

    return balance;
  }
}

export default GetBalanceUseCase;
