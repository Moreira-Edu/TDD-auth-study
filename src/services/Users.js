import database from "../database/index.js";

class Users {
  async getUsers(req, res) {
    const users = await database("users").select();

    res.status(200).json(users);
  }

  async createUser(req, res) {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome é um atributo obrigatório" });
    }
    if (!email) {
      return res.status(400).json({ error: "E-mail é um atributo obrigatório" });
    }
    if (!password) {
      return res.status(400).json({ error: "Senha é um atributo obrigatório" });
    }

    const userExists = await database("users").where({ email }).select();

    if (userExists && userExists.length > 0) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    const user = await database("users").insert(req.body, "*");
    return res.status(201).json(user[0]);
  }
}

export default Users;
