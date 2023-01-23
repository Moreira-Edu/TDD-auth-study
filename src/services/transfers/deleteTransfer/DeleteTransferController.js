import DeleteTransferUseCase from "./DeleteTransferUseCase.js";

class DeleteTransferController {
  async handle(req, res, next) {
    const { id } = req.params;
    const deleteTransfer = new DeleteTransferUseCase();
    try {
      await deleteTransfer.execute(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default DeleteTransferController;
