import knex from "knex";
import development from "../../knexfile.js";

const database = knex(development)
  .on("query", (query) => {
    console.log({ sql: query.sql, bindings: query.bindings && query.bindings.join(", ") });
  })
  .on("error", (error) => console.log(error));

export default database;
