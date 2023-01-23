import UpdateTransferUseCase from "./UpdateTransferUseCase.js";

class UpdateTransferController {
  async handle(req, res, next) {
    const { id } = req.params;
    const values = req.body;
    const updateTransfer = new UpdateTransferUseCase();

    try {
      const newTransfer = await updateTransfer.execute(id, values);

      return res.status(200).json(newTransfer);
    } catch (error) {
      next(error);
    }
  }
}

export default UpdateTransferController;
