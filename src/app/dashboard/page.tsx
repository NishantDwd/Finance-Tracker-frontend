"use client";
import MonthlyExpensesChart from "./MonthlyExpensesChart";
import CategoryPieChart from "./CategoryPieChart";
import SummaryCards from "./SummaryCards";
import BudgetVsActualChart from "./BudgetVsActualChart";
import { useState } from "react";

export default function DashboardPage() {
  const [year] = useState(new Date().getFullYear());
  const [month] = useState(new Date().getMonth() + 1);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <SummaryCards month={month} year={year} />
      <MonthlyExpensesChart year={year} />
      <CategoryPieChart month={month} year={year} />
      <BudgetVsActualChart month={month} year={year} />
    </div>
  );
}