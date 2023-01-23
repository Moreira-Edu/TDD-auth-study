import database from "../../database/index.js";
import AppError from "../../errors/AppError.js";

class TransferValidation {
  async execute({
    description,
    user_id,
    acc_origin_id,
    acc_destiny_id,
    amount,
    date,
  }) {
    if (!description) throw new AppError("Descrição é um atributo obrigatório");
    if (!amount) throw new AppError("Valor da transferência é um atributo obrigatório");
    if (!date) throw new AppError("Data da transferência é um atributo obrigatório");
    if (!acc_origin_id) throw new AppError("ID da conta de origem é um atributo obrigatório");
    if (!acc_destiny_id) throw new AppError("ID da conta destino é um atributo obrigatório");
    if (acc_origin_id === acc_destiny_id) throw new AppError("Não é possível transferir para a mesma conta");

    const accounts = await database("accounts")
      .whereIn("id", [acc_destiny_id, acc_origin_id]);

    accounts.forEach((acc) => {
      if (acc.user_id !== user_id) throw new AppError("Conta não pertence ao usuário");
    });
  }
}

export default TransferValidation;
