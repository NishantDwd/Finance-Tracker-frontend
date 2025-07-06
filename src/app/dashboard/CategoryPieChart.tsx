"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { api } from "@/app/lib/api";

type DataPoint = {
  _id: string;
  total: number;
};

const COLORS = [
  "#2563eb", "#10b981", "#f59e42", "#ef4444", "#a78bfa",
  "#f472b6", "#facc15", "#38bdf8", "#34d399", "#fb7185"
];

export default function CategoryPieChart({ month, year }: { month: number, year: number }) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/analytics/category-breakdown", { params: { month, year } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [month, year]);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, idx) => (
                <Cell key={entry._id} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}