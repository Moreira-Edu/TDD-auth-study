/* eslint-disable import/prefer-default-export */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const fiveDaysLater = new Date();
fiveDaysLater.setDate(
  fiveDaysLater.getDate() + 5,
);
const fiveDaysEarly = new Date();
fiveDaysEarly.setDate(
  fiveDaysEarly.getDate() - 5,
);

export async function seed(knex) {
  return Promise.all([
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
      {
        id: 30100,
        name: "User5",
        email: "user5@email.com",
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
      {
        id: 30100,
        name: "Saldo principal user 5",
        user_id: 30100,
      },
      {
        id: 30101,
        name: "Saldo alternativo user 5",
        user_id: 30100,
      },
    ]),
    await knex("transfers").insert([
      {
        id: 30100,
        description: "Transfer user 1",
        user_id: 30100,
        acc_origin_id: 30100,
        acc_destiny_id: 30101,
        amount: 200,
        date: new Date(),
      },
      {
        id: 20100,
        description: "Transfer user 2",
        user_id: 30100,
        acc_origin_id: 20000,
        acc_destiny_id: 20001,
        amount: 300,
        date: new Date(),
      },
    ]),
    knex("transactions").insert([
      {
        description: "Transfer",
        date: new Date(),
        amount: 200,
        type: "I",
        acc_id: 30100,
        status: true,
      },
      {
        description: "Transfer",
        date: new Date(),
        amount: 200,
        type: "I",
        acc_id: 30100,
        status: true,
      },
      {
        description: "Transfer",
        date: new Date(),
        amount: 200,
        type: "I",
        acc_id: 30100,
        status: false,
      },
      {
        description: "Transfer",
        date: fiveDaysEarly,
        amount: 200,
        type: "I",
        acc_id: 30100,
        status: true,
      },
      {
        description: "Transfer",
        date: fiveDaysLater,
        amount: 200,
        type: "I",
        acc_id: 30100,
        status: true,
      },
      {
        description: "Transfer",
        date: new Date(),
        amount: -50,
        type: "O",
        acc_id: 30100,
        status: true,
      },
      {
        description: "Transfer",
        date: new Date(),
        amount: 100,
        type: "I",
        acc_id: 30100,
        status: true,
      },
      {
        description: "Transfer",
        date: new Date(),
        amount: -100,
        type: "O",
        acc_id: 30101,
        status: true,
      },
      {
        description: "Transfer",
        date: new Date(),
        amount: 100,
        type: "I",
        acc_id: 20100,
        status: true,
      },
      {
        description: "Transfer",
        date: new Date(),
        amount: -100,
        type: "O",
        acc_id: 20101,
        status: true,
      },
    ]),
  ]);
}
