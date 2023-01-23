import database from "../../../database/index.js";

class DeleteTransferUseCase {
  async execute(id) {
    await database("transactions")
      .where({ transfer_id: id }).del();

    await database("transfers")
      .where({ id }).del();
  }
}

export default DeleteTransferUseCase;
