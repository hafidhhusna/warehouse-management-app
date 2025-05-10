import { NextRequest, NextResponse } from "next/server";
import {GET} from "../app/api/items/route";

describe('Contract Testing', () => {
    it("Should return the correct contract for items", async() => {
        const req = new NextRequest("http://localhost:3000/api/items?page=1&limit=10");
        const res = await GET(req);
        const jsonResponse = await res.json();

        expect(res.status).toBe(200);
        expect(Array.isArray(jsonResponse.items)).toBe(true);
        expect(jsonResponse.items[0]).toHaveProperty("id_item");
        expect(jsonResponse.items[0]).toHaveProperty("name");
        expect(jsonResponse.items[0]).toHaveProperty("quantity");
    });
});