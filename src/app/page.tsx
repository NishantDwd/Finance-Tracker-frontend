"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">Welcome to Finance Tracker</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Track your expenses, manage budgets, and visualize your financial health with interactive charts and analytics.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/dashboard">
          <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">Go to Dashboard</span>
        </Link>
        <Link href="/transactions">
          <span className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">Transactions</span>
        </Link>
        <Link href="/budgets">
          <span className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition">Budgets</span>
        </Link>
        <Link href="/categories">
          <span className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition">Categories</span>
        </Link>
      </div>
      <div className="mt-10 text-gray-400 text-sm">
        Made with <span className="text-red-500">♥</span> Nishant
      </div>
    </div>
  );
}