// __tests__/load.test.ts
import { NextRequest } from "next/server";
import { POST , GET } from "../app/api/items/route";

describe("Load Testing", () => {
  it("should handle multiple requests simultaneously", async () => {
    const requests = [];
    for (let i = 0; i < 10000; i++) {  // Mengirim 100 permintaan secara bersamaan
      const req = new NextRequest("http://localhost/api/items?page=1&limit=10");
      requests.push(GET(req));
    }

    const responses = await Promise.all(requests);

    responses.forEach(res => {
      expect(res.status).toBe(200);
    });
  });
});
