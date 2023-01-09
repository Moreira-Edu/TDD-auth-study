import UpdateAccountUseCase from "./UpdateAccountUseCase.js";

class UpdateAccountController {
  async handle(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updateAccount = new UpdateAccountUseCase();
      const account = await updateAccount.execute({ id, name });

      res.status(200).json(account[0]);
    } catch (error) {
      next(error);
    }
  }
}

export default UpdateAccountController;
