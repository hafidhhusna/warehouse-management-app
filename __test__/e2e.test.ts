// __tests__/e2e.test.ts
import { NextRequest, NextResponse } from "next/server";
import { POST } from "../app/api/items/route";
import { GET } from "../app/api/items/route";

describe("End-to-End Testing", () => {
  it("should create an item and retrieve it correctly", async () => {
    const newItem = { name: "New Item", quantity: 10 };

    // POST request untuk membuat item baru
    const postReq = new NextRequest("http://localhost/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    const postRes = await POST(postReq);
    const postResponse = await postRes.json();

    expect(postRes.status).toBe(201);
    expect(postResponse.name).toBe(newItem.name);
    expect(postResponse.quantity).toBe(newItem.quantity);

    // GET request untuk memastikan item ada dalam daftar
    const getReq = new NextRequest("http://localhost/api/items?page=1&limit=10");
    const getRes = await GET(getReq);
    const getResponse = await getRes.json();

    expect(getRes.status).toBe(200);
    const itemFromList = getResponse.items.find(item => item.id === postResponse.id);
    expect(itemFromList).not.toBeUndefined();
    expect(itemFromList?.name).toBe(newItem.name);
  });
});
