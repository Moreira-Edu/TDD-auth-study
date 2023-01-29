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
    const [newTransfer] = await database("transfers").insert({
      description,
      user_id,
      acc_origin_id,
      acc_destiny_id,
      amount,
      date,
    }, "*");

    const transactions = [
      {
        description: `Transfer from origin acc ${newTransfer.acc_origin_id}`,
        date: newTransfer.date,
        amount: newTransfer.amount * -1,
        type: "O",
        acc_id: newTransfer.acc_origin_id,
        transfer_id: newTransfer.id,
        status: true,
      },
      {
        description: `Transfer to destiny acc ${newTransfer.acc_destiny_id}`,
        date: newTransfer.date,
        amount: newTransfer.amount,
        type: "I",
        acc_id: newTransfer.acc_destiny_id,
        transfer_id: newTransfer.id,
        status: true,
      },
    ];
    await database("transactions")
      .insert(transactions);

    return newTransfer;
  }
}

export default CreateTransfersUseCase;
