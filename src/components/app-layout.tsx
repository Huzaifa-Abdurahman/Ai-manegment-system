"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-headline font-bold">Punjab Soap</h1>
            </div>
          </SidebarHeader>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/"}
                tooltip="Dashboard"
              >
                <Link href="/" className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/deliveries")}
                tooltip="Deliveries"
              >
                <Link href="/deliveries" className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  <span>Deliveries</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/contacts")}
                tooltip="Contacts"
              >
                <Link href="/contacts" className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Contacts</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/ai-suggestions")}
                tooltip="AI Suggestions"
              >
                <Link href="/ai-suggestions" className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>AI Suggestions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/reports")}
                tooltip="Reports"
              >
                <Link href="/reports" className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Reports</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>

        {/* Right Content Area */}
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b md:justify-end">
            <SidebarTrigger className="md:hidden" />
            <div className="font-semibold hidden md:block">Welcome Back!</div>
          </header>

          <SidebarInset>
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
