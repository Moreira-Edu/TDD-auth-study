import SigninUseCase from "./SigninUseCase.js";

class SigninController {
  async handle(req, res, next) {
    const { email, password } = req.body;

    const signinUseCase = new SigninUseCase();
    try {
      const token = await signinUseCase.execute(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default SigninController;
