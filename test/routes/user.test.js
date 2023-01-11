import supertest from "supertest";
import app from "../../src/app.js";

const agent = supertest(app);

describe("user route behavior", () => {
  const email = `${Date.now()}@email.com`;

  test("should register a user successfully", async () => {
    const { status, body } = await agent.post("/users")
      .send(
        {
          name: "Walter Sap",
          email,
          password: "word@123",
        },
      );

    expect(status).toBe(201);
    expect(body.name).toBe("Walter Sap");
    expect(body).not.toHaveProperty("password");
  });

  test("should list all users", async () => {
    const { body, status } = await agent.get("/users");

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
      );

    expect(status).toBe(201);
    const { id } = body;

    const { body: { password } } = await agent.get(`/users/${id}`);

    expect(password).not.toBeUndefined();
    expect(password).not.toBe("12345");
  });

  test("should not register a user without name", async () => {
    const user = {
      email: "email@email.com",
      password: "1234oi",
    };
    const { status, body } = await agent.post("/users").send(user);

    expect(status).toBe(400);
    expect(body.error).toBe("Nome é um atributo obrigatório");
  });

  test("should not register a user without email", async () => {
    const user = {
      name: "John Doe",
      password: "122345",
    };
    const { status, body } = await agent.post("/users").send(user);

    expect(status).toBe(400);
    expect(body.error).toBe("E-mail é um atributo obrigatório");
  });
  test("should not register a user without password", async () => {
    const user = {
      name: "John Doe",
      email: "doe@email.com",
    };
    const { status, body } = await agent.post("/users").send(user);

    expect(status).toBe(400);
    expect(body.error).toBe("Senha é um atributo obrigatório");
  });
  test("should not register a user with a registered email", async () => {
    const user = {
      name: "John Doe",
      email,
      password: "2313@312321",
    };
    const { status, body } = await agent.post("/users").send(user);

    expect(status).toBe(400);
    expect(body.error).toBe("E-mail já cadastrado");
  });
});
