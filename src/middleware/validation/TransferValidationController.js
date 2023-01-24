import database from "../../database/index.js";
import AppError from "../../errors/AppError.js";

class TransferValidationController {
  async handle(req, res, next) {
    const { id } = req.params;
    const userId = Number(req.user.id);
    try {
      const transfer = await database("transfers")
        .where({ id }).first();

      if (transfer.user_id !== userId) {
        throw new AppError("Não autorizado", 403);
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
}

export default TransferValidationController;
