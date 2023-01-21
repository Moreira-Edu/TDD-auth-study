import supertest from "supertest";
import app from "../../src/app.js";
import database from "../../src/database/index.js";

const agent = supertest(app);

describe("Transfer route behavior", () => {
  const BASE_URL = "/transfers";
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDAwIiwibmFtZSI6IlVzZXIxIiwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSJ9.KEriKNT1g5_0Zpbkc5fE9FaXpct7JKgfDrTjF1saWo4";

  beforeAll(async () => {
    await database.seed.run();
  });
  test("should get only users transfers", async () => {
    const { body, status } = await agent.get(BASE_URL)
      .set("authorization", `bearer ${TOKEN}`);
    expect(status).toBe(200);
    expect(body.length).toBe(1);
    expect(body[0].description).toBe("Transfer user 1");
  });

  test("should register a transfer", async () => {
    const { body, status } = await agent.post(BASE_URL)
      .set("authorization", `bearer ${TOKEN}`)
      .send({
        description: "Regular transfer",
        user_id: 10000,
        acc_origin_id: 10000,
        acc_destiny_id: 10001,
        amount: 100,
        date: new Date(),
      });

    expect(status).toBe(200);
    expect(body[0].description).toBe("Regular transfer");

    const transactions = await database("transactions")
      .where({ transfer_id: body[0].id }).select();

    expect(transactions).toHaveLength(2);
    expect(transactions[0].description).toBe("Transfer from origin acc 10000");
    expect(transactions[1].description).toBe("Transfer to destiny acc 10001");
    expect(transactions[0].amount).toBe("-100.00");
    expect(transactions[1].amount).toBe("100.00");
    expect(transactions[0].acc_id).toBe(10000);
    expect(transactions[1].acc_id).toBe(10001);
  });
});
