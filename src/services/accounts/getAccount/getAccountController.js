import GetAccountUseCase from "./GetAccountUseCase.js";
import AppError from "../../../errors/AppError.js";

class GetAccountController {
  async handle(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const getAccount = new GetAccountUseCase();
      const account = await getAccount.execute({ id });

      if (account.user_id !== userId) {
        throw new AppError("Não autorizado", 403);
      }

      res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  }
}
export default GetAccountController;
