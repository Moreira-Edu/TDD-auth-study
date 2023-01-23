import GetTransferUseCase from "./GetTransferUseCase.js";

class GetTransferController {
  async handle(req, res, next) {
    const { id } = req.params;
    const getTransfer = new GetTransferUseCase();

    try {
      const transfer = await getTransfer
        .execute(id);

      return res.status(200).json(transfer);
    } catch (error) {
      next(error);
    }
  }
}

export default GetTransferController;
