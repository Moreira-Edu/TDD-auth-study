import supertest from "supertest";
import app from "../../src/app.js";

describe("Auth route behavior", () => {
  const agent = supertest(app);

  test("should receive token when login", async () => {
    const email = `${Date.now()}@email.com`;
    await agent.post("/users")
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
});
