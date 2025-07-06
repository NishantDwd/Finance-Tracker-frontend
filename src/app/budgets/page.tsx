"use client";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";

type Budget = {
  _id: string;
  category: string;
  amount: number;
  month: number;
  year: number;
};

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());

  const reload = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      api.get("/budgets", { params: { month, year } }),
      api.get("/categories"),
    ])
      .then(([budgetsRes, categoriesRes]) => {
        setBudgets(budgetsRes.data);
        setCategories(categoriesRes.data.map((c: any) => c.name));
      })
      .catch(() => setError("Failed to load budgets or categories"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/budgets", {
        category,
        amount: Number(amount),
        month,
        year,
      });
      setAmount("");
      setCategory("");
      reload();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add budget");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this budget?")) return;
    await api.delete(`/budgets/${id}`);
    reload();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Budgets ({month}/{year})</h1>
      <form onSubmit={handleAdd} className="mb-6 bg-white p-4 rounded shadow flex gap-2 flex-wrap">
        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          className="border rounded px-3 py-2"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add/Update
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map(budget => (
              <tr key={budget._id}>
                <td className="py-2 px-4 border-b">{budget.category}</td>
                <td className="py-2 px-4 border-b">₹{budget.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(budget._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}