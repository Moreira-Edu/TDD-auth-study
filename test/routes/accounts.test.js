/* eslint-disable no-unused-vars */
import supertest from "supertest";
import jwt from "jwt-simple";
import app from "../../src/app.js";
import database from "../../src/database/index.js";

const agent = supertest(app);

describe("account route behavior", () => {
  const BASE_URL = "/accounts";
  let user;
  let user2;

  beforeEach(async () => {
    const result = await database("users").insert(
      {
        name: "User account",
        email: `${Date.now()}@email.com`,
        password: "12359@oi",
      }, "*",
    );
    user = { ...result[0] };
    const result2 = await database("users").insert(
      {
        name: "User account 2",
        email: `${Date.now()}@email.com`,
        password: "12359@oi",
      }, "*",
    );

    user = { ...result[0] };
    user.token = jwt.encode(user, process.env.SECRET);
    user2 = { ...result2[0] };
  });

  test("should register a new account successfully", async () => {
    const { status, body } = await agent.post(BASE_URL)
      .set("authorization", `bearer ${user.token}`)
      .send({ name: "Acc user #1" });

    expect(status).toBe(201);
    expect(body.name).toBe("Acc user #1");
  });

  test("should not register a new account without name", async () => {
    const { status, body } = await agent.post(BASE_URL)
      .set("authorization", `bearer ${user.token}`)
      .send({});

    expect(status).toBe(400);
    expect(body.error).toBe("Nome é um atributo obrigatório");
  });

  test.todo("should not register a new account with duplicate name");

  test("should list only the account of the user", async () => {
    await database("accounts").insert([
      { name: "Acc user #1", user_id: user.id },
      { name: "Acc user #2", user_id: user2.id },
    ]);

    const { status, body } = await agent.get(BASE_URL)
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(200);
    expect(body.length).toBe(1);
    expect(body[0].name).toBe("Acc user #1");
  });

  test("should get a list by ID", async () => {
    const acc = await database("accounts")
      .insert({ name: "Acc by id", user_id: user.id }, ["id"]);

    const { status, body } = await agent.get(`${BASE_URL}/${acc[0].id}`)
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(200);
    expect(body.name).toBe("Acc by id");
    expect(body.user_id).toBe(user.id);
  });

  test.todo("should not get an account of another user");

  test("should update an account", async () => {
    const acc = await database("accounts")
      .insert({ name: "Acc to update", user_id: user.id }, ["id"]);

    const { status, body } = await agent.put(`${BASE_URL}/${acc[0].id}`)
      .set("authorization", `bearer ${user.token}`)
      .send({ name: "Acc updated" });

    expect(status).toBe(200);
    expect(body.name).toBe("Acc updated");
  });

  test.todo("should not update an account of another user");

  test("should delete an account", async () => {
    const acc = await database("accounts")
      .insert({ name: "Acc to update", user_id: user.id }, ["id"]);

    const { status } = await agent.delete(`${BASE_URL}/${acc[0].id}`)
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(204);
  });
});
