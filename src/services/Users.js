import database from "../database/index.js";

class Users {
  async getUsers(req, res) {
    const users = await database("users").select();

    res.status(200).json(users);
  }

  async createUser(req, res) {
    if (!req.body.name) res.status(400).json({ error: "Nome é um atributo obrigatório" });
    const user = await database("users").insert(req.body, "*");
    res.status(201).json(user[0]);
  }
}

export default Users;
