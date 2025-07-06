"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transactions", label: "Transactions" },
  { href: "/budgets", label: "Budgets" },
  { href: "/categories", label: "Categories" }, 
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-100 mb-6 py-3 px-4 rounded shadow flex gap-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`font-medium ${pathname.startsWith(item.href) ? "text-blue-600 underline" : "text-gray-700"}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}