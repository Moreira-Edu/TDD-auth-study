import CreateAccountUseCase from "./createAccountUseCase.js";

class CreateAccountController {
  async handle(req, res, next) {
    const { name, user_id } = req.body;
    const createAccount = new CreateAccountUseCase();

    try {
      const account = await createAccount.execute({ name, user_id });

      res.status(201).json(account[0]);
    } catch (error) {
      next(error);
    }
  }
}

export default CreateAccountController;
