import UpdateTransactionsUseCase from "./UpdateTransactionsUseCase.js";

class UpdateTransactionsController {
  async handle(req, res, next) {
    const { id } = req.params;
    const values = req.body;
    const updateTransactions = new UpdateTransactionsUseCase();

    try {
      const transaction = await updateTransactions.execute(id, values);

      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

export default UpdateTransactionsController;
