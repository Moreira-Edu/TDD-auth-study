/* eslint-disable no-unused-vars */
import database from "../../database/index.js";
import AppError from "../../errors/AppError.js";

class AccountValidationController {
  async handle(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const account = await database("accounts")
        .where({ id }).first();

      if (account.user_id !== userId) {
        throw new AppError("Não autorizado", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default AccountValidationController;
