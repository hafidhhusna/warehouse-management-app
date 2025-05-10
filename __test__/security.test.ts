// __tests__/security.test.ts
import {POST} from "@/app/api/items/route";
import { NextRequest } from "next/server";

describe("Security Testing", () => {
  it("should reject malicious inputs like XSS", async () => {
    const maliciousItem = { name: "<script>alert('XSS')</script>", quantity: 10 };

    const req = new Request("http://localhost/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maliciousItem),
    });
    const res = await POST(req as any);
    const jsonResponse = await res.json();

    // Memastikan input berbahaya ditolak
    expect(res.status).toBe(400);
    expect(jsonResponse.error).toBeDefined();
  });
});
