import AppError from "../../errors/AppError.js";

class TransactionValidation {
  execute({
    description, date, amount, type, acc_id,
  }) {
    if (!description) {
      throw new AppError("Descrição é um atributo obrigatório");
    }
    if (!date) {
      throw new AppError("Data é um atributo obrigatório");
    }
    if (!amount) {
      throw new AppError("Valor é um atributo obrigatório");
    }
    if (!type) {
      throw new AppError("Tipo de transação é um atributo obrigatório");
    }
    if (!acc_id) {
      throw new AppError("ID da conta é um atributo obrigatório");
    }

    if (type !== "I" && type !== "O") {
      throw new AppError("Tipo de transação inválida");
    }
  }

  convertValues({ type, amount }) {
    let newAmount = amount;
    if (
      (type === "I" && amount < 0)
      || (type === "O" && amount > 0)
    ) {
      newAmount *= -1;
      return newAmount;
    }
    return amount;
  }
}

export default TransactionValidation;
