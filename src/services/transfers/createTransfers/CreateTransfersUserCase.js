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

    const transactions = [
      {
        description: `Transfer from origin acc ${newTransfer[0].acc_origin_id}`,
        date: newTransfer[0].date,
        amount: newTransfer[0].amount * -1,
        type: "O",
        acc_id: newTransfer[0].acc_origin_id,
        transfer_id: newTransfer[0].id,
      },
      {
        description: `Transfer to destiny acc ${newTransfer[0].acc_destiny_id}`,
        date: newTransfer[0].date,
        amount: newTransfer[0].amount,
        type: "I",
        acc_id: newTransfer[0].acc_destiny_id,
        transfer_id: newTransfer[0].id,
      },
    ];
    await database("transactions")
      .insert(transactions);

    return newTransfer;
  }
}

export default CreateTransfersUseCase;
