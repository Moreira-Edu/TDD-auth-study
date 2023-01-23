import TransferValidation from "../../../utils/validation/transferValidation.js";
import CreateTransfersUseCase from "./CreateTransfersUserCase.js";

class CreateTransfersController {
  async handle(req, res, next) {
    const { id } = req.user;
    const createTransfer = new CreateTransfersUseCase();
    const transferValidation = new TransferValidation();

    try {
      await transferValidation.execute(req.body);
      const newTransfers = await createTransfer
        .execute({ ...req.body, user_id: id });

      return res.status(201).json(newTransfers);
    } catch (error) {
      next(error);
    }
  }
}

export default CreateTransfersController;
