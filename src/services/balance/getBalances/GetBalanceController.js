import GetBalanceUseCase from "./GetBalanceUseCase.js";

class GetBalanceController {
  async handle(req, res, next) {
    const { id } = req.user;
    const getBalance = new GetBalanceUseCase();

    try {
      const balance = await getBalance.execute(id);

      return res.status(200).json(balance);
    } catch (error) {
      next(error);
    }
  }
}

export default GetBalanceController;
