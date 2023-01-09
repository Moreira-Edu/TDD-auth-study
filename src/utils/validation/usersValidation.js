import AppError from "../../errors/AppError.js";

class UserValidation {
  execute({
    name, email, password,
  }) {
    if (!name) {
      throw new AppError("Nome é um atributo obrigatório");
    }
    if (!email) {
      throw new AppError("E-mail é um atributo obrigatório");
    }
    if (!password) {
      throw new AppError("Senha é um atributo obrigatório");
    }
  }
}

export default UserValidation;
