import GetTransactionUseCase from "./GetTransactionUseCase.js";

class GetTransactionController {
  async handle(req, res, next) {
    const { id } = req.params;
    const getTransaction = new GetTransactionUseCase();

    try {
      const transaction = await getTransaction.execute(id);
      return res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

export default GetTransactionController;
