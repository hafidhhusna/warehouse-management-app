import { GET, POST } from "@/app/api/items/route";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    item: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe("API: /api/items", () => {
  describe("GET", () => {
    it("should return paginated items", async () => {
      (prisma.item.findMany as jest.Mock).mockResolvedValue([
        { id: 1, name: "Item A", quantity: 10 }
      ]);
      (prisma.item.count as jest.Mock).mockResolvedValue(1);

      const req = new Request("http://localhost/api/items?page=1&limit=10");
      const res = await GET(req as unknown as NextRequest);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.items.length).toBe(1);
      expect(data.totalPages).toBe(1);
      expect(data.currentPage).toBe(1);
    });

    it("should use default pagination when query params are missing", async () => {
      (prisma.item.findMany as jest.Mock).mockResolvedValue([
        { id: 2, name: "Item B", quantity: 20 }
      ]);
      (prisma.item.count as jest.Mock).mockResolvedValue(1);

      const req = new Request("http://localhost/api/items");
      const res = await GET(req as unknown as NextRequest);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.items.length).toBe(1);
      expect(data.totalPages).toBe(1);
      expect(data.currentPage).toBe(1); // default is page 1
    });

  it("should handle internal server error", async () => {
    (prisma.item.findMany as jest.Mock).mockRejectedValue(new Error("DB Error"));
    (prisma.item.count as jest.Mock).mockResolvedValue(0);

    const req = new Request("http://localhost/api/items?page=1&limit=10");
    const res = await GET(req as unknown as NextRequest);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Gagal Memuat Data");
  });

  it("should handle invalid query parameters gracefully", async () => {
    (prisma.item.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.item.count as jest.Mock).mockResolvedValue(0);

    const req = new Request("http://localhost/api/items?page=abc&limit=xyz");
    const res = await GET(req as unknown as NextRequest);
    const data = await res.json();

    expect(res.status).toBe(200); // fallback ke default values
    expect(data.currentPage).toBe(1);
    expect(data.totalPages).toBe(0);
  });
});


  describe("POST", () => {
    it("should create a new item", async () => {
      const mockItem = { id: 1, name: "Item A", quantity: 5 };
      (prisma.item.create as jest.Mock).mockResolvedValue(mockItem);

      const req = new Request("http://localhost/api/items", {
        method: "POST",
        body: JSON.stringify({ name: "Item A", quantity: 5 }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req as NextRequest);
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data).toEqual(mockItem);
    });

    it("should return 400 if invalid payload", async () => {
      const req = new Request("http://localhost/api/items", {
        method: "POST",
        body: JSON.stringify({ name: "", quantity: -1 }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req as unknown as NextRequest);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("Nama Barang Wajib diisi dan Jumlah Harus Angka Positif");
    });
  });
});

