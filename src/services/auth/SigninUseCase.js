import jwt from "jwt-simple";
import bcrypt from "bcrypt";
import database from "../../database/index.js";

class SigninUseCase {
  async execute(email, password) {
    const user = await database("users")
      .where({ email }).first();

    if (bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.encode(payload, process.env.SECRET);

      return token;
    }
  }
}

export default SigninUseCase;
