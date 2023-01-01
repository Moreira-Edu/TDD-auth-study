import supertest from "supertest";
import app from "../../src/app.js";

const agent = supertest(app);
describe("user route behavior", () => {
  test("should list all users", async () => {
    const { body, status } = await agent.get("/users");

    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  test("should register a user successfully", async () => {
    const email = `${Date.now()}@email.com`;
    const { status, body } = await agent.post("/users")
      .send({ name: "Walter Sap", email, password: "word@123" });

    expect(status).toBe(201);
    expect(body.name).toBe("Walter Sap");
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
    const { status, body } = await agent.post("users").send(user);

    expect(status).toBe(400);
    expect(body.error).toBe("E-mail é um atributo obrigatório");
  });
});
