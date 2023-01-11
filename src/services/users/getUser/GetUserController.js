import GetUserUseCase from "./GetUserUseCase.js";

class GetUserController {
  async handle(req, res, next) {
    const { id } = req.params;

    try {
      const getUser = new GetUserUseCase();
      const user = await getUser.execute(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default GetUserController;
