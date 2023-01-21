// Update with your config settings.
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const development = {
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "finmanager",
  },
  migrations: {
    directory: "src/database/migrations",
  },
  seeds: {
    directory: "src/database/seeds",
  },
};

export default development;
