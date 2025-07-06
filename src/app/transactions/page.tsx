"use client";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import AddTransactionForm from "./AddTransactionForm";

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});

  const reload = () => {
    setLoading(true);
    setError(null);
    api
      .get("/transactions")
      .then((res) => setTransactions(res.data.transactions))
      .catch(() => setError("Failed to load transactions"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this transaction?")) return;
    await api.delete(`/transactions/${id}`);
    reload();
  };

  const startEdit = (tx: Transaction) => {
    setEditingId(tx._id);
    setEditData({
      amount: tx.amount,
      date: tx.date.slice(0, 10),
      description: tx.description,
      category: tx.category,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id: string) => {
    await api.put(`/transactions/${id}`, {
      ...editData,
      amount: Number(editData.amount),
    });
    setEditingId(null);
    setEditData({});
    reload();
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <AddTransactionForm onAdd={reload} />
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                {editingId === tx._id ? (
                  <>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="date"
                        name="date"
                        value={editData.date as string}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        name="description"
                        value={editData.description as string}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        name="category"
                        value={editData.category as string}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-right">
                      <input
                        type="number"
                        name="amount"
                        value={editData.amount as number}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full text-right"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEditSave(tx._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </button>
                    </td>
                </>
                ) : (
                  <>
                    <td className="py-2 px-4 border-b">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{tx.description}</td>
                    <td className="py-2 px-4 border-b">{tx.category}</td>
                    <td className="py-2 px-4 border-b text-right">
                      ₹{tx.amount.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                      className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                        onClick={() => startEdit(tx)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(tx._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
             </tbody>
        </table>
      )}
    </div>
  );
}