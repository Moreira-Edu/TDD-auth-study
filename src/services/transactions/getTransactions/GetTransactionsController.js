import GetTransactionsUseCase from "./GetTransactionsUseCase.js";

class GetTransactionsController {
  async handle(req, res, next) {
    const { id } = req.user;
    const getTransaction = new GetTransactionsUseCase();

    try {
      const transactions = await getTransaction.execute(id);

      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }
}

export default GetTransactionsController;
