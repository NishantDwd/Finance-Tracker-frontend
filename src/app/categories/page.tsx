"use client";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";

type Category = {
  _id: string;
  name: string;
  color: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#8884d8");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = () => {
    setLoading(true);
    setError(null);
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/categories", { name, color });
      setName("");
      setColor("#8884d8");
      reload();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    reload();
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat._id);
    setName(cat.name);
    setColor(cat.color);
  };

  const handleEditSave = async (id: string) => {
    try {
      await api.put(`/categories/${id}`, { name, color });
      setEditingId(null);
      setName("");
      setColor("#8884d8");
      reload();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update category");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setName("");
    setColor("#8884d8");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <form onSubmit={editingId ? (e) => { e.preventDefault(); handleEditSave(editingId); } : handleAdd}
        className="mb-6 bg-white p-4 rounded shadow flex gap-2 flex-wrap items-center">
        <input
          type="text"
          placeholder="Category Name"
          className="border rounded px-3 py-2"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          className="w-10 h-10 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Save" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={handleEditCancel}
          >
            Cancel
          </button>
        )}
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Color</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat._id}>
                <td className="py-2 px-4 border-b">{cat.name}</td>
                <td className="py-2 px-4 border-b">
                  <span className="inline-block w-6 h-6 rounded" style={{ background: cat.color }} />
                  <span className="ml-2">{cat.color}</span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                    onClick={() => startEdit(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(cat._id)}
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