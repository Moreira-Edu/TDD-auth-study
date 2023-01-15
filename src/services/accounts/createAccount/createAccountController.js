import CreateAccountUseCase from "./createAccountUseCase.js";

class CreateAccountController {
  async handle(req, res, next) {
    const { name } = req.body;
    const { id } = req.user;
    const createAccount = new CreateAccountUseCase();

    try {
      const account = await createAccount
        .execute({ name, user_id: id });

      res.status(201).json(account[0]);
    } catch (error) {
      next(error);
    }
  }
}

export default CreateAccountController;
