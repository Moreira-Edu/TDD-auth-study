import supertest from "supertest";
import app from "../src/app.js";

const agent = supertest(app);
describe("app behavior", () => {
  test("should respond at root", async () => {
    const { status } = await agent.get("/");
    expect(status).toBe(200);
  });
});
