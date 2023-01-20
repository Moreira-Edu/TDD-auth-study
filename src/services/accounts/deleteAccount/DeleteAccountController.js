import AccountValidation from "../../../utils/validation/accountValidation.js";
import DeleteAccountUseCase from "./DeleteAccountUseCase.js";

class DeleteAccountController {
  async handle(req, res, next) {
    const { id } = req.params;
    const deleteAccount = new DeleteAccountUseCase();
    const accountValidation = new AccountValidation();

    try {
      await accountValidation.checkTransactions(id);
      await deleteAccount.execute({ id });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default DeleteAccountController;
