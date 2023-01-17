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
});
