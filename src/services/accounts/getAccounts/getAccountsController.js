import GetAccountsUseCase from "./getAccountsUseCase.js";

class GetAccountsController {
  async handle(req, res, next) {
    try {
      const getAccount = new GetAccountsUseCase();
      const accounts = await getAccount.execute();

      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  }
}

export default GetAccountsController;
