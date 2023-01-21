import GetTransfersUseCase from "./GetTransfersUseCase.js";

class GetTransfersController {
  async handle(req, res, next) {
    const { id } = req.user;
    const getTransfers = new GetTransfersUseCase();
    try {
      const transfers = await getTransfers.execute(id);

      return res.status(200).json(transfers);
    } catch (error) {
      next(error);
    }
  }
}

export default GetTransfersController;
