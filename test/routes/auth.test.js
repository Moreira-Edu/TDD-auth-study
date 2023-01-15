import supertest from "supertest";
import app from "../../src/app.js";

describe("Auth route behavior", () => {
  const agent = supertest(app);

  test("should create through signup", async () => {
    const { status, body } = await agent.post("/auth/signup")
      .send({
        name: "John Doe",
        email: `${Date.now()}@email.com`,
        password: "123456",
      });

    expect(status).toBe(201);
    expect(body.name).toBe("John Doe");
    expect(body).not.toHaveProperty("password");
  });

  test("should receive token when login", async () => {
    const email = `${Date.now()}@email.com`;
    await agent.post("/auth/signup")
      .send({
        name: "John Doe",
        email,
        password: "12345",
      });

    const { body, status } = await agent
      .post("/auth/signin")
      .send({ email, password: "12345" });

    expect(status).toBe(200);
    expect(body).toHaveProperty("token");
  });

  test("should not auth user with wrong password", async () => {
    const email = `${Date.now()}@email.com`;
    await agent.post("/users")
      .send({
        name: "John Doe",
        email,
        password: "12345",
      });

    const { body, status } = await agent
      .post("/auth/signin")
      .send({ email, password: "78569" });

    expect(status).toBe(400);
    expect(body.error).toBe("Usuário ou senha inválido");
  });

  test("should not auth user with wrong email", async () => {
    const email = `${Date.now()}@email.com`;
    await agent.post("/users")
      .send({
        name: "John Doe",
        email,
        password: "12345",
      });

    const { body, status } = await agent
      .post("/auth/signin")
      .send({ email: "tryingNew@email.com", password: "12345" });

    expect(status).toBe(400);
    expect(body.error).toBe("Usuário ou senha inválido");
  });

  test("should not access api routes without valid tokens", async () => {
    const { status } = await agent.get("/users");

    expect(status).toBe(401);
  });
});
