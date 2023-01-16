import AccountValidation from "../../../utils/validation/accountValidation.js";
import UpdateAccountUseCase from "./UpdateAccountUseCase.js";

class UpdateAccountController {
  async handle(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;
    const accountValidation = new AccountValidation();
    const updateAccount = new UpdateAccountUseCase();
    try {
      await accountValidation.execute(name, userId);
      const account = await updateAccount.execute({ id, name });

      return res.status(200).json(account[0]);
    } catch (error) {
      next(error);
    }
  }
}

export default UpdateAccountController;
