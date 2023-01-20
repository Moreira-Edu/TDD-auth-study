/* eslint-disable no-unused-vars */
import jwt from "jwt-simple";
import supertest from "supertest";
import app from "../../src/app.js";
import database from "../../src/database/index.js";
import getHashPassword from "../../src/utils/passwordHash/hashPassword.js";

describe("transactions route behavior", () => {
  const agent = supertest(app);
  const BASE_URL = "/transactions";
  let user;
  let user2;
  let accUser;
  let accUser2;

  beforeAll(async () => {
    await database("transactions").del();
    await database("accounts").del();
    await database("users").del();

    [user, user2] = await database("users")
      .insert([
        {
          name: "User1",
          email: "user@email.com",
          password: getHashPassword("123456"),
        },
        {
          name: "User2",
          email: "user2@email.com",
          password: getHashPassword("123456"),
        },
      ], ["id", "name", "email"]);

    user.token = jwt.encode(user, process.env.SECRET);

    [accUser, accUser2] = await database("accounts")
      .insert([
        { name: "Acc #1", user_id: user.id },
        { name: "Acc #2", user_id: user2.id },
      ], "*");
  });

  test("should list only the users transactions", async () => {
    await database("transactions").insert([
      {
        description: "T1",
        date: new Date(),
        amount: 150,
        type: "I",
        acc_id: accUser.id,
      },
      {
        description: "T2",
        date: new Date(),
        amount: 300,
        type: "O",
        acc_id: accUser2.id,
      },
    ]);

    const { body, status } = await agent.get(BASE_URL)
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0].description).toBe("T1");
  });

  test("should register a transaction", async () => {
    const { status, body } = await agent.post(BASE_URL)
      .send({
        description: "new T",
        date: new Date(),
        amount: 330,
        type: "I",
        acc_id: accUser.id,
      })
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(200);
    expect(body[0].description).toBe("new T");
  });

  test("should not register a transaction without description",
    async () => {
      const { body, status } = await agent.post(BASE_URL)
        .send({
          date: new Date(),
          amount: 330,
          type: "I",
          acc_id: accUser.id,
        }).set("authorization", `bearer ${user.token}`);

      expect(body.error).toBe("Descrição é um atributo obrigatório");
      expect(status).toBe(400);
    });

  test("should not register a transaction without amount",
    async () => {
      const { body, status } = await agent.post(BASE_URL)
        .send({
          description: "new T",
          date: new Date(),
          type: "I",
          acc_id: accUser.id,
        }).set("authorization", `bearer ${user.token}`);

      expect(body.error).toBe("Valor é um atributo obrigatório");
      expect(status).toBe(400);
    });

  test("should not register a transaction without date",
    async () => {
      const { body, status } = await agent.post(BASE_URL)
        .send({
          description: "new T",
          amount: 330,
          type: "I",
          acc_id: accUser.id,
        }).set("authorization", `bearer ${user.token}`);

      expect(body.error).toBe("Data é um atributo obrigatório");
      expect(status).toBe(400);
    });

  test("should not register a transaction without account",
    async () => {
      const { body, status } = await agent.post(BASE_URL)
        .send({
          description: "new T",
          date: new Date(),
          amount: 330,
          type: "I",
        }).set("authorization", `bearer ${user.token}`);

      expect(body.error).toBe("ID da conta é um atributo obrigatório");
      expect(status).toBe(400);
    });

  test("should not register a transaction without type",
    async () => {
      const { body, status } = await agent.post(BASE_URL)
        .send({
          description: "new T",
          date: new Date(),
          amount: 330,
          acc_id: accUser.id,
        }).set("authorization", `bearer ${user.token}`);

      expect(body.error).toBe("Tipo de transação é um atributo obrigatório");
      expect(status).toBe(400);
    });

  test("should not register a transaction with a invalid type",
    async () => {
      const { body, status } = await agent.post(BASE_URL)
        .send({
          description: "new T",
          date: new Date(),
          amount: 330,
          type: "E",
          acc_id: accUser.id,
        }).set("authorization", `bearer ${user.token}`);

      expect(body.error).toBe("Tipo de transação inválida");
      expect(status).toBe(400);
    });

  test("Incoming transactions should convert to a positive value",
    async () => {
      const { status, body } = await agent.post(BASE_URL)
        .send({
          description: "new T",
          date: new Date(),
          amount: -330,
          type: "I",
          acc_id: accUser.id,
        })
        .set("authorization", `bearer ${user.token}`);

      expect(status).toBe(200);
      expect(body[0].amount).toBe("330.00");
    });

  test("Outgoing transactions should convert to a negative value",
    async () => {
      const { status, body } = await agent.post(BASE_URL)
        .send({
          description: "new T",
          date: new Date(),
          amount: 330,
          type: "O",
          acc_id: accUser.id,
        })
        .set("authorization", `bearer ${user.token}`);

      expect(status).toBe(200);
      expect(body[0].amount).toBe("-330.00");
    });

  test("should get a transaction by ID", async () => {
    const transaction = await database("transactions")
      .insert({
        description: "T by ID",
        date: new Date(),
        amount: 470,
        type: "I",
        acc_id: accUser.id,
      }, "*");

    const { body, status } = await agent
      .get(`${BASE_URL}/${transaction[0].id}`)
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(200);
    expect(body.description).toBe("T by ID");
  });

  test("should update a transaction", async () => {
    const transaction = await database("transactions")
      .insert({
        description: "T to update",
        date: new Date(),
        amount: 470,
        type: "I",
        acc_id: accUser.id,
      }, "*");

    const { body, status } = await agent
      .put(`${BASE_URL}/${transaction[0].id}`)
      .set("authorization", `bearer ${user.token}`)
      .send({ type: "O" });

    expect(status).toBe(200);
    expect(body[0].type).toBe("O");
  });

  test("should delete a transaction", async () => {
    const transaction = await database("transactions")
      .insert({
        description: "T to update",
        date: new Date(),
        amount: 470,
        type: "I",
        acc_id: accUser.id,
      }, "*");

    const { status } = await agent
      .delete(`${BASE_URL}/${transaction[0].id}`)
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(204);
  });

  test("should not delete a transaction of another user",
    async () => {
      const transaction = await database("transactions")
        .insert({
          description: "T to update",
          date: new Date(),
          amount: 470,
          type: "I",
          acc_id: accUser2.id,
        }, "*");

      const { status, body } = await agent
        .delete(`${BASE_URL}/${transaction[0].id}`)
        .set("authorization", `bearer ${user.token}`);

      expect(status).toBe(403);
      expect(body.error).toBe("Não autorizado");
    });
});
