/* eslint-disable import/prefer-default-export */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  return Promise.all([
    await knex("transactions").del(),
    await knex("transfers").del(),
    await knex("accounts").del(),
    await knex("users").del(),
    await knex("users").insert([
      {
        id: 10100,
        name: "User3",
        email: "user3@email.com",
        password: "$2b$10$jmKrlmbxayiFZyKcJZ7VOOEYQ4s6UogWAHBQRqAy.V5I7fOrINzBy",
      },
      {
        id: 20100,
        name: "User4",
        email: "user4@email.com",
        password: "$2b$10$jmKrlmbxayiFZyKcJZ7VOOEYQ4s6UogWAHBQRqAy.V5I7fOrINzBy",
      },
    ]),

    await knex("accounts").insert([
      {
        id: 10100,
        name: "Saldo principal user 3",
        user_id: 10100,
      },
      {
        id: 10101,
        name: "Saldo alternativo user 3",
        user_id: 10100,
      },
      {
        id: 20100,
        name: "Saldo principal user 4",
        user_id: 20100,
      },
      {
        id: 20101,
        name: "Saldo alternativo user 4",
        user_id: 20100,
      },
    ]),
  ]);
}
