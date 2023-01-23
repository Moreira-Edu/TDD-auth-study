import database from "../../../database/index.js";

class GetTransferUseCase {
  async execute(id) {
    const transfer = await database("transfers")
      .where({ id }).first();

    return transfer;
  }
}

export default GetTransferUseCase;
