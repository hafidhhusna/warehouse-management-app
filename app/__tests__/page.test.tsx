// __tests__/page.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../page";

import "@testing-library/jest-dom";

// Mock fetch global
global.fetch = jest.fn();

// Setup default mocked data
const mockItems = [
  {
    name: "Pensil",
    quantity: 10,
    createdAt: new Date().toISOString(),
  },
];

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form and initial elements", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: mockItems, totalPages: 1 }),
    });

    render(<HomePage />);

    // Tunggu hingga data di-load dan elemen tabel muncul
    await waitFor(() => {
      expect(screen.getByText("Barang Masuk Terbaru")).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText("Nama Barang")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jumlah")).toBeInTheDocument();
    expect(screen.getByText("Catat Barang")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
  });

  it("shows error message if quantity is not a number", async () => {
    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText("Nama Barang"), {
      target: { value: "Pulpen" },
    });
    fireEvent.change(screen.getByPlaceholderText("Jumlah"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Catat Barang"));

    await waitFor(() => {
      expect(
        screen.getByText("Jumlah barang tidak boleh kosong!")
      ).toBeInTheDocument();
    });
  });

  it("handles form submission and updates list", async () => {
    // First GET request
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [], totalPages: 1 }),
    });

    render(<HomePage />);

    // Wait for first load
    await waitFor(() => {
      expect(screen.getByText("Barang Masuk Terbaru")).toBeInTheDocument();
    });

    // Fill form
    fireEvent.change(screen.getByPlaceholderText("Nama Barang"), {
      target: { value: "Buku" },
    });
    fireEvent.change(screen.getByPlaceholderText("Jumlah"), {
      target: { value: "5" },
    });

    // POST request response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: "Buku",
        quantity: 5,
        createdAt: new Date().toISOString(),
      }),
    });

    fireEvent.click(screen.getByText("Catat Barang"));

    // Ensure new item appears
    await waitFor(() => {
      expect(screen.getByText("Buku")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("shows error if quantity exceeds 100", async () => {
    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText("Nama Barang"), {
      target: { value: "Laptop" },
    });
    fireEvent.change(screen.getByPlaceholderText("Jumlah"), {
      target: { value: "101" },
    });

    fireEvent.click(screen.getByText("Catat Barang"));

    await waitFor(() => {
      expect(
        screen.getByText("Jumlah barang tidak boleh melebihi 100!")
      ).toBeInTheDocument();
    });
  });

  it("disables Next button when on last page", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: mockItems, totalPages: 1 }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    });

    expect(screen.getByText("Next")).toBeDisabled();
    expect(screen.getByText("Previous")).toBeDisabled();
  });
});
