import database from "../../../database/index.js";

class CreateTransactionsUseCase {
  async execute(transaction) {
    const newTransaction = await database("transactions")
      .insert(transaction, "*");

    return newTransaction;
  }
}

export default CreateTransactionsUseCase;
