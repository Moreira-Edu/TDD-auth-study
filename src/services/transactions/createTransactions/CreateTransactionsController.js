import CreateTransactionsUseCase from "./CreateTransactionsUseCase.js";

class CreateTransactionsController {
  async handle(req, res, next) {
    const newTransaction = req.body;
    const createTransaction = new CreateTransactionsUseCase();

    try {
      const transaction = await createTransaction
        .execute(newTransaction);

      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

export default CreateTransactionsController;
