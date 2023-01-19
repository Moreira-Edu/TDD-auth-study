import CreateTransactionsUseCase from "./CreateTransactionsUseCase.js";

class CreateTransactionsController {
  async handle(req, res, next) {
    const newTransaction = req.body;
    const createTransaction = new CreateTransactionsUseCase();

    try {
      if ((newTransaction.type === "I" && newTransaction.amount < 0)
        || (newTransaction.type === "O" && newTransaction.amount > 0)) {
        newTransaction.amount *= -1;
      }

      const transaction = await createTransaction
        .execute(newTransaction);

      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

export default CreateTransactionsController;
