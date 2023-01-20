import DeleteTransactionsUseCase from "./DeleteTransactionsUseCase.js";

class DeleteTransactionsController {
  async handle(req, res, next) {
    const { id } = req.params;
    const deleteTransactions = new DeleteTransactionsUseCase();

    try {
      await deleteTransactions.execute(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default DeleteTransactionsController;
