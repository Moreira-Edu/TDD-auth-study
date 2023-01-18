import database from "../../../database/index.js";

class UpdateTransactionsUseCase {
  async execute(id, values = {}) {
    const transaction = await database("transactions")
      .where({ id }).update(values, "*");

    return transaction;
  }
}

export default UpdateTransactionsUseCase;
