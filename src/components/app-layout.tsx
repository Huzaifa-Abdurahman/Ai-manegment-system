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

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Dashboard", icon: BarChart },
    { href: "/deliveries", label: "Deliveries", icon: Truck },
    { href: "/contacts", label: "Contacts", icon: Users },
    { href: "/ai-suggestions", label: "AI Suggestions", icon: Lightbulb },
    { href: "/reports", label: "Reports", icon: FileText },
  ];

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

        <nav className="p-4 space-y-1">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition ${
                pathname === href ? "bg-muted font-semibold" : ""
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">Welcome Back!</div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
