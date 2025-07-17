"use client"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Truck, Users, Lightbulb, FileText, ShoppingCart } from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart },
  { href: "/deliveries", label: "Deliveries", icon: Truck },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/ai-suggestions", label: "AI Suggestions", icon: Lightbulb },
  { href: "/reports", label: "Reports", icon: FileText },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
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
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <div>
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b md:justify-end">
            <SidebarTrigger className="md:hidden"/>
            <div className="font-semibold">Welcome Back!</div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
