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
});
