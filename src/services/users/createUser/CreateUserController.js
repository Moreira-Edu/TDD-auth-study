import UserValidation from "../../../utils/validation/usersValidation.js";
import CreateUserUseCase from "./CreateUserUseCase.js";

class CreateUserController {
  async handle(req, res, next) {
    const { name, email, password } = req.body;
    const createUser = new CreateUserUseCase();
    const userValidation = new UserValidation();

    try {
      userValidation.execute({
        name, email, password,
      });

      const user = await createUser.execute({ name, email, password });

      return res.status(201).json(user[0]);
    } catch (error) {
      next(error);
    }
  }
}

export default CreateUserController;
