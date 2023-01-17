import database from "../../../database/index.js";

class GetTransactionUseCase {
  async execute(id) {
    const transaction = await database("transactions")
      .where({ id }).first();

    return transaction;
  }
}

export default GetTransactionUseCase;
