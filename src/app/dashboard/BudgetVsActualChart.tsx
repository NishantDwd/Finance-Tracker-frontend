"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { api } from "@/app/lib/api";

type Budget = { category: string; amount: number };
type Expense = { _id: string; total: number };

export default function BudgetVsActualChart({ month, year }: { month: number; year: number }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/analytics/budget-vs-actual", { params: { month, year } })
      .then((res) => {
        const budgets: Budget[] = res.data.budgets;
        const expenses: Expense[] = res.data.expenses;
        // Merge budgets and expenses by category
        const categories = Array.from(new Set([
          ...budgets.map(b => b.category),
          ...expenses.map(e => e._id)
        ]));
        setData(categories.map(cat => ({
          category: cat,
          budget: budgets.find(b => b.category === cat)?.amount || 0,
          actual: expenses.find(e => e._id === cat)?.total || 0,
        })));
      })
      .finally(() => setLoading(false));
  }, [month, year]);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Budget vs Actual</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#34d399" name="Budget" />
            <Bar dataKey="actual" fill="#2563eb" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}