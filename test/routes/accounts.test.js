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

  test("should list all accounts", async () => {
    await database("accounts")
      .insert({ name: "Acc #2", user_id: user.id });

    const { status, body } = await agent.get(BASE_URL);

    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });
});
