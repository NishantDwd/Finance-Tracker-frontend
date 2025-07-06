"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { api } from "@/app/lib/api";

type DataPoint = {
  _id: number;
  total: number;
};

export default function MonthlyExpensesChart({ year }: { year: number }) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/analytics/monthly-expenses", { params: { year } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [year]);

  const months = [
    "",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Monthly Expenses ({year})</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.map(d => ({ ...d, month: months[d._id] }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}