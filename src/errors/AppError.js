class AppError {
  statusCode;

  message;

  constructor(message, status = 400) {
    this.statusCode = status;
    this.message = message;
  }
}

export default AppError;
