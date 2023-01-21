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
        id: 10000,
        name: "User1",
        email: "user@email.com",
        password: "$2b$10$jmKrlmbxayiFZyKcJZ7VOOEYQ4s6UogWAHBQRqAy.V5I7fOrINzBy",
      },
      {
        id: 20000,
        name: "User2",
        email: "user2@email.com",
        password: "$2b$10$jmKrlmbxayiFZyKcJZ7VOOEYQ4s6UogWAHBQRqAy.V5I7fOrINzBy",
      },
    ]),

    await knex("accounts").insert([
      {
        id: 10000,
        name: "Origin acc user1",
        user_id: 10000,
      },
      {
        id: 10001,
        name: "Destiny acc user1",
        user_id: 10000,
      },
      {
        id: 20000,
        name: "Origin acc user2",
        user_id: 20000,
      },
      {
        id: 20001,
        name: "Destiny acc user2",
        user_id: 20000,
      },
    ]),

    await knex("transfers").insert([
      {
        id: 10000,
        description: "Transfer user 1",
        user_id: 10000,
        acc_origin_id: 10000,
        acc_destiny_id: 10001,
        amount: 200,
        date: new Date(),
      },
      {
        id: 20000,
        description: "Transfer user 2",
        user_id: 20000,
        acc_origin_id: 20000,
        acc_destiny_id: 20001,
        amount: 300,
        date: new Date(),
      },
    ]),

    knex("transactions").insert([
      {
        description: "Transfer from origin acc 1",
        date: new Date(),
        amount: 200,
        type: "I",
        acc_id: 10001,
        transfer_id: 10000,
      },
      {
        description: "Transfer to destiny acc 1",
        date: new Date(),
        amount: -200,
        type: "O",
        acc_id: 10000,
        transfer_id: 10000,
      },
      {
        description: "Transfer from origin acc 2",
        date: new Date(),
        amount: 300,
        type: "I",
        acc_id: 20001,
        transfer_id: 20000,
      },
      {
        description: "Transfer to destiny acc 2",
        date: new Date(),
        amount: -300,
        type: "O",
        acc_id: 20000,
        transfer_id: 20000,
      },
    ]),

  ]);
}
