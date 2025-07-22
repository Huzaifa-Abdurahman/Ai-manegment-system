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

  // Log pathname for debugging
  console.log("Current pathname:", pathname);

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
          {[
            { href: "/", label: "Dashboardcez            Dashboard", icon: BarChart },
            { href: "/deliveries", label: "Deliveries", icon: Truck },
            { href: "/contacts", label: "Contacts", icon: Users },
            { href: "/ai-suggestions", label: "AI Suggestions", icon: Lightbulb },
            { href: "/reports", label: "Reports", icon: FileText },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-muted ${
                pathname === href ? "bg-muted font-semibold" : ""
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
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
