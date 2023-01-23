import database from "../../../database/index.js";

class UpdateTransferUseCase {
  async execute(id, values = {}) {
    await database("transactions")
      .where({ transfer_id: id }).del();

    const [newTransfer] = await database("transfers")
      .where({ id }).update(values, "*");

    const transactions = [
      {
        description: `Transfer from origin acc ${newTransfer.acc_origin_id}`,
        date: newTransfer.date,
        amount: newTransfer.amount * -1,
        type: "O",
        acc_id: newTransfer.acc_origin_id,
        transfer_id: id,
      },
      {
        description: `Transfer to destiny acc ${newTransfer.acc_destiny_id}`,
        date: newTransfer.date,
        amount: newTransfer.amount,
        type: "I",
        acc_id: newTransfer.acc_destiny_id,
        transfer_id: id,
      },
    ];

    await database("transactions").insert(transactions);

    return newTransfer;
  }
}

export default UpdateTransferUseCase;
