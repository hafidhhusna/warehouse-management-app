"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HomePage() {
  const [items, setItems] = useState<any[]>([]); // State untuk menyimpan data barang
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data); // Menyimpan data ke state
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems(); // Memanggil fungsi fetch saat komponen dimuat
  }, []); // Array kosong untuk hanya menjalankan useEffect sekali saat komponen dimuat

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    const quantityInt = parseInt(quantity, 10);

    if (isNaN(quantityInt)) {
      setErrorMessage("Jumlah barang tidak boleh kosong!");
      return;
    } else if (quantityInt < 1) {
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

      // Memperbarui data barang dengan memanggil API lagi
      setItems((prevItems) => [...prevItems, result]); // Menambahkan item baru ke state
    } catch (error: any) {
      setErrorMessage(error.message || "Gagal mencatat barang.");
    }
  }

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
          min={1}
        />
        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <Button type="submit">Catat Barang</Button>
      </form>

      <section>
        <h2 className="text-xl font-semibold mb-2">Barang Masuk Terbaru</h2>
        <div className="space-y-2">
          {items?.map((item, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <p>
                  <strong>{item.name}</strong> — {item.quantity} pcs
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
