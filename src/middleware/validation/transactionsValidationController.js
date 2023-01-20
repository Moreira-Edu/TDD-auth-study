import AppError from "../../errors/AppError.js";
import GetTransactionsUseCase from "../../services/transactions/getTransactions/GetTransactionsUseCase.js";

class TransactionValidationController {
  async handle(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;
    const getTransactions = new GetTransactionsUseCase();

    try {
      const result = await getTransactions
        .execute(userId, { "transactions.id": id });

      if (result.length <= 0) throw new AppError("Não autorizado", 403);
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionValidationController;
