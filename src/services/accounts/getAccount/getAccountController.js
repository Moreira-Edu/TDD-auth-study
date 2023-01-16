import GetAccountUseCase from "./GetAccountUseCase.js";

class GetAccountController {
  async handle(req, res, next) {
    const { id } = req.params;

    try {
      const getAccount = new GetAccountUseCase();
      const account = await getAccount.execute({ id });

      res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  }
}
export default GetAccountController;
