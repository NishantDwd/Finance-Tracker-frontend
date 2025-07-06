"use client";
import { useState } from "react";
import { api } from "@/app/lib/api";

type Props = {
  onAdd: () => void;
};

export default function AddTransactionForm({ onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/transactions", {
        amount: Number(amount),
        date,
        description,
        category,
      });
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("");
      onAdd();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="Amount"
          className="border rounded px-3 py-2"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="border rounded px-3 py-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="border rounded px-3 py-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}