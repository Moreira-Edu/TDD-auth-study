import database from "../../../database/index.js";

class DeleteTransactionsUseCase {
  async execute(id) {
    await database("transactions")
      .where({ id }).delete();
  }
}

export default DeleteTransactionsUseCase;
