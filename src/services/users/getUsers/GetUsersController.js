import GetUsersUseCase from "./GetUsersUseCase.js";

class GetUsersController {
  async handle(req, res, next) {
    const getUsers = new GetUsersUseCase();

    try {
      const users = await getUsers.execute();

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default GetUsersController;
