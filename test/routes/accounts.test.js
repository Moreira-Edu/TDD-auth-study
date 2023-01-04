/* eslint-disable no-unused-vars */
import supertest from "supertest";
import app from "../../src/app.js";
import database from "../../src/database/index.js";

const agent = supertest(app);

describe("account route behavior", () => {
  const BASE_URL = "/accounts";
  let user;

  beforeAll(async () => {
    const result = await database("users").insert(
      {
        name: "User account",
        email: `${Date.now()}@email.com`,
        password: "12359@oi",
      }, "*",
    );
    user = { ...result[0] };
  });

  test("should register a new account successfully", async () => {
    const { status, body } = await agent.post(BASE_URL)
      .send({ name: "Acc #1", user_id: user.id });

    expect(status).toBe(201);
    expect(body.name).toBe("Acc #1");
  });

  test("should not register a new account without name", async () => {
    const { status, body } = await agent.post(BASE_URL)
      .send({ user_id: user.id });

    expect(status).toBe(400);
    expect(body.error).toBe("Nome é um atributo obrigatório");
  });

  test.todo("should not register a new account with duplicate name");

  test("should list all accounts", async () => {
    await database("accounts")
      .insert({ name: "Acc #2", user_id: user.id });

    const { status, body } = await agent.get(BASE_URL);

    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  test.todo("should list only the account of the user");

  test("should get a list by ID", async () => {
    const acc = await database("accounts")
      .insert({ name: "Acc by id", user_id: user.id }, ["id"]);

    const { status, body } = await agent.get(`${BASE_URL}/${acc[0].id}`);

    expect(status).toBe(200);
    expect(body.name).toBe("Acc by id");
    expect(body.user_id).toBe(user.id);
  });

  test.todo("should not get an account of another user");

  test("should update an account", async () => {
    const acc = await database("accounts")
      .insert({ name: "Acc to update", user_id: user.id }, ["id"]);

    const { status, body } = await agent.put(`${BASE_URL}/${acc[0].id}`)
      .send({ name: "Acc updated" });

    expect(status).toBe(200);
    expect(body.name).toBe("Acc updated");
  });

  test.todo("should not update an account of another user");

  test("should delete an account", async () => {
    const acc = await database("accounts")
      .insert({ name: "Acc to update", user_id: user.id }, ["id"]);

    const { status } = await agent.delete(`${BASE_URL}/${acc[0].id}`);

    expect(status).toBe(204);
  });
});
