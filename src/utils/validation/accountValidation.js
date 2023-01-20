import AppError from "../../errors/AppError.js";
import database from "../../database/index.js";

class AccountValidation {
  async execute(name, user_id) {
    if (!name) {
      throw new AppError("Nome é um atributo obrigatório");
    }
    const accountExists = await database("accounts")
      .where({ name, user_id });

    if (accountExists && accountExists.length > 0) {
      throw new AppError("Já existe uma conta com este nome");
    }
  }

  async checkTransactions(acc_id) {
    const transactionExists = await database("transactions")
      .where({ acc_id }).first();

    if (transactionExists) throw new AppError("Esta conta possui transações associadas");
  }
}

export default AccountValidation;
