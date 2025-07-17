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
import {
  BarChart,
  Truck,
  Users,
  Lightbulb,
  FileText,
  ShoppingCart,
} from "lucide-react"

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
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <div>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b md:justify-end">
          <SidebarTrigger className="md:hidden" />
          <div />
        </header>
        <SidebarInset>
            {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
