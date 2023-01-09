import database from "../../../database/index.js";

class DeleteAccountUseCase {
  async execute({ id }) {
    await database("accounts").where({ id }).delete();
  }
}

export default DeleteAccountUseCase;
