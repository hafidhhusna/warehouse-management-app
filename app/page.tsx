"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function HomePage() {
  const [items, setItems] = useState<any[]>([]); // State untuk menyimpan data barang
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Menyimpan total halaman

  // Fetch data saat komponen pertama kali dimuat atau saat halaman berubah
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Menambahkan parameter page dan limit ke URL query string
        const response = await fetch(
          `/api/items?page=${currentPage}&limit=10`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data.items); // Menyimpan data barang ke state
        setTotalPages(data.totalPages); // Menyimpan total halaman untuk navigasi
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems(); // Memanggil fungsi fetch saat komponen dimuat atau saat halaman berubah
  }, [currentPage]); // Dependensi pada currentPage agar fetch data baru saat halaman berubah

  // Handle submit untuk form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    const quantityInt = parseInt(quantity, 10);

    if (isNaN(quantityInt)) {
      setErrorMessage("Jumlah barang tidak boleh kosong!");
      return;
    } else if (quantityInt < 0) {
      setErrorMessage("Jumlah barang tidak boleh 0!");
      return;
    } else if (quantityInt > 100) {
      setErrorMessage("Jumlah barang tidak boleh melebihi 100!");
      return;
    }

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, quantity: quantityInt }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Gagal mencatat barang.");
      }

      // Reset form setelah berhasil submit
      setName("");
      setQuantity("");

      // Memperbarui data barang dengan memanggil API lagi untuk memperbarui list
      setItems((prevItems) => [result, ...prevItems]); // Menambahkan item baru ke state
    } catch (error: any) {
      setErrorMessage(error.message || "Gagal mencatat barang.");
    }
  }

  // Fungsi untuk mengganti halaman
  const handlePageChange = (page: number) => {
    // Pastikan halaman berada dalam rentang yang valid
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update halaman
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nama Barang"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
        />
        <Input
          type="number"
          placeholder="Jumlah"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min={NaN}
        />
        {errorMessage && (
          <Alert variant="destructive">
            {errorMessage} {/* Pesan error langsung di dalam Alert */}
          </Alert>
        )}
        <Button type="submit">Catat Barang</Button>
      </form>

      <section>
        <h2 className="text-xl font-semibold mb-2">Barang Masuk Terbaru</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{(currentPage - 1) * 10 + idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="flex justify-between">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </section>
    </main>
  );
}
