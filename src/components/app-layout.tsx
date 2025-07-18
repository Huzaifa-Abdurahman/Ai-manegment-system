"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Truck,
  Users,
  Lightbulb,
  FileText,
  ShoppingCart,
} from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r">
        <div className="p-4 flex items-center gap-2 border-b">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">Punjab Soap</h1>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-muted ${
              pathname === "/" ? "bg-muted font-semibold" : ""
            }`}
          >
            <BarChart className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/deliveries"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-muted ${
              pathname === "/deliveries" ? "bg-muted font-semibold" : ""
            }`}
          >
            <Truck className="h-5 w-5" />
            <span>Deliveries</span>
          </Link>

          <Link
            href="/contacts"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-muted ${
              pathname === "/contacts" ? "bg-muted font-semibold" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Contacts</span>
          </Link>

          <Link
            href="/ai-suggestions"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-muted ${
              pathname === "/ai-suggestions" ? "bg-muted font-semibold" : ""
            }`}
          >
            <Lightbulb className="h-5 w-5" />
            <span>AI Suggestions</span>
          </Link>

          <Link
            href="/reports"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-muted ${
              pathname === "/reports" ? "bg-muted font-semibold" : ""
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Reports</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="p-4 border-b">
          <h2 className="text-lg font-semibold">Welcome Back!</h2>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
