import bcrypt from "bcrypt";

function getHashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export default getHashPassword;
