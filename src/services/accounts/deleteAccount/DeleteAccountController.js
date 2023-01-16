import DeleteAccountUseCase from "./DeleteAccountUseCase.js";

class DeleteAccountController {
  async handle(req, res, next) {
    const { id } = req.params;

    try {
      const deleteAccount = new DeleteAccountUseCase();
      await deleteAccount.execute({ id });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default DeleteAccountController;
