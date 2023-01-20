import TransactionValidation from "../../../utils/validation/transactionValidation.js";
import CreateTransactionsUseCase from "./CreateTransactionsUseCase.js";

class CreateTransactionsController {
  async handle(req, res, next) {
    const newTransaction = req.body;
    const createTransaction = new CreateTransactionsUseCase();
    const transactionValidation = new TransactionValidation();

    try {
      transactionValidation.execute(newTransaction);
      newTransaction.amount = transactionValidation
        .convertValues(newTransaction);

      const transaction = await createTransaction
        .execute(newTransaction);

      return res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

export default CreateTransactionsController;
