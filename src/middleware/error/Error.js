/* eslint-disable no-unused-vars */
import AppError from "../../errors/AppError.js";

class Error {
  static handle(error, req, res, next) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
}

export default Error;
