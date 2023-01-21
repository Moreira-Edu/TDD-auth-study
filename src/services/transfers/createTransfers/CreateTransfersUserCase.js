import database from "../../../database/index.js";

class CreateTransfersUseCase {
  async execute(
    {
      description,
      user_id,
      acc_origin_id,
      acc_destiny_id,
      amount,
      date,
    },
  ) {
    const newTransfer = await database("transfers").insert({
      description,
      user_id,
      acc_origin_id,
      acc_destiny_id,
      amount,
      date,
    }, "*");

    return newTransfer;
  }
}

export default CreateTransfersUseCase;
