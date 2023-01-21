/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return Promise.all([
    knex.schema.createTable("transfers", (t) => {
      t.increments("id").primary();
      t.string("description").notNullable();
      t.date("date").notNullable();
      t.decimal("amount", 15, 2).notNullable();
      t.integer("acc_origin_id").references("id")
        .inTable("accounts").notNullable();
      t.integer("acc_destiny_id").references("id")
        .inTable("accounts").notNullable();
      t.integer("user_id").references("id")
        .inTable("users").notNullable();
    }),
    knex.schema.table("transactions", (t) => {
      t.integer("transfer_id").references("id")
        .inTable("transfers");
    }),
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return Promise.all([
    knex.schema.table("transactions", (t) => {
      t.dropColumn("transfer_id");
    }),
    knex.schema.dropTable("transfers"),
  ]);
}
