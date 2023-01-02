/* eslint-disable camelcase */
import database from "../database/index.js";

class Accounts {
  async createAccount(req, res) {
    const { name, user_id } = req.body;
    const account = await database("accounts").insert({ name, user_id }, "*");

    res.status(201).json(account[0]);
  }
}

export default Accounts;
