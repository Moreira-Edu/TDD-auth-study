import AppError from "../../errors/AppError.js";
import database from "../../database/index.js";

class UserValidation {
  async execute({
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
    const userExists = await database("users")
      .where({ email }).select();

    if (userExists && userExists.length > 0) {
      throw new AppError("E-mail já cadastrado");
    }
  }
}

export default UserValidation;
