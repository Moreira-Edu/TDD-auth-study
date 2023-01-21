import database from "../../../database/index.js";

class GetTransfersUseCase {
  async execute(userId) {
    const transfers = await database("transfers")
      .where({ user_id: userId }).select();

    return transfers;
  }
}

export default GetTransfersUseCase;
