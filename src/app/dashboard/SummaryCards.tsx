"use client";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";

type Transaction = {
  amount: number;
  date: string;
  description: string;
  category: string;
};

export default function SummaryCards({ month, year }: { month: number, year: number }) {
  const [total, setTotal] = useState(0);
  const [recent, setRecent] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/analytics/category-breakdown", { params: { month, year } }),
      api.get("/analytics/recent-transactions"),
    ]).then(([catRes, recentRes]) => {
      const sum = catRes.data.reduce((acc: number, cur: any) => acc + cur.total, 0);
      setTotal(sum);
      setRecent(recentRes.data);
    }).finally(() => setLoading(false));
  }, [month, year]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded shadow">
        <div className="text-sm text-gray-600">Total Expenses</div>
        <div className="text-2xl font-bold">₹{total.toFixed(2)}</div>
      </div>
      <div className="bg-green-100 p-4 rounded shadow md:col-span-2">
        <div className="text-sm text-gray-600 mb-2">Recent Transactions</div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {recent.map((tx, idx) => (
              <li key={idx} className="flex justify-between border-b py-1 text-sm">
                <span>{tx.description}</span>
                <span>₹{tx.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}