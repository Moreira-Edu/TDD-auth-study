import supertest from "supertest";
import jwt from "jwt-simple";
import app from "../../src/app.js";
import database from "../../src/database/index.js";

const agent = supertest(app);

describe("user route behavior", () => {
  let user;
  const email = `${Date.now()}@email.com`;

  beforeAll(async () => {
    const result = await database("users")
      .insert(
        {
          name: "Sally Matthew",
          email,
          password: "123456",
        }, "*",
      );

    user = { ...result[0] };

    user.token = jwt.encode(user, process.env.SECRET);
  });

  test("should register a user successfully", async () => {
    const { status, body } = await agent.post("/users")
      .set("authorization", `bearer ${user.token}`)
      .send(
        {
          name: "Walter Sap",
          email: `${Date.now()}@email.com`,
          password: "word@123",
        },
      );
    expect(status).toBe(201);
    expect(body.name).toBe("Walter Sap");
    expect(body).not.toHaveProperty("password");
  });

  test("should list all users", async () => {
    const { body, status } = await agent.get("/users")
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  test("should store a encrypted password", async () => {
    const { body, status } = await agent.post("/users")
      .send(
        {
          name: "Walter ked",
          email: `${Date.now()}@email.com`,
          password: "12345",
        },
      ).set("authorization", `bearer ${user.token}`);

    expect(status).toBe(201);
    const { id } = body;

    const { body: { password } } = await agent.get(`/users/${id}`)
      .set("authorization", `bearer ${user.token}`);

    expect(password).not.toBeUndefined();
    expect(password).not.toBe("12345");
  });

  test("should not register a user without name", async () => {
    const { status, body } = await agent.post("/users")
      .send({
        email: "email@email.com",
        password: "1234oi",
      })
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(400);
    expect(body.error).toBe("Nome é um atributo obrigatório");
  });

  test("should not register a user without email", async () => {
    const { status, body } = await agent.post("/users")
      .send({
        name: "John Doe",
        password: "122345",
      })
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(400);
    expect(body.error).toBe("E-mail é um atributo obrigatório");
  });
  test("should not register a user without password", async () => {
    const { status, body } = await agent.post("/users")
      .send({
        name: "John Doe",
        email: "doe@email.com",
      })
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(400);
    expect(body.error).toBe("Senha é um atributo obrigatório");
  });

  test("should not register a user with a registered email", async () => {
    const { status, body } = await agent.post("/users")
      .send({
        name: "John Doe",
        email,
        password: "2313@312321",
      })
      .set("authorization", `bearer ${user.token}`);

    expect(status).toBe(400);
    expect(body.error).toBe("E-mail já cadastrado");
  });
});
