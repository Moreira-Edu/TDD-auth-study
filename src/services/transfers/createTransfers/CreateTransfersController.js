import CreateTransfersUseCase from "./CreateTransfersUserCase.js";

class CreateTransfersController {
  async handle(req, res, next) {
    const { id } = req.user;
    const createTransfer = new CreateTransfersUseCase();

    try {
      const newTransfers = await createTransfer.execute({ ...req.body, user_id: id });
      return res.status(200).json(newTransfers);
    } catch (error) {
      next(error);
    }
  }
}

export default CreateTransfersController;
