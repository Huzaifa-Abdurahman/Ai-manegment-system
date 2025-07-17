"use client";

import { useDeliveries } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { DollarSign, Package, Users, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { deliveries } = useDeliveries();

  const totalSales = deliveries.reduce((acc, d) => acc + d.totalBill, 0);
  const totalDues = deliveries.reduce((acc, d) => acc + d.dueBill, 0);
  const totalPending = deliveries.reduce((acc, d) => acc + d.pendingPayment, 0);
  const uniqueShopkeepers = new Set(deliveries.map(d => d.shopkeeperName)).size;

  const salesByDate = deliveries.reduce((acc, d) => {
    const date = new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += d.totalBill;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(salesByDate)
    .map(([name, sales]) => ({ name, sales }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
    .slice(-30);

  return (
    <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold font-headline">Sales Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹{totalSales.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">All-time revenue from deliveries</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Dues</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹{totalDues.toLocaleString()}</div>
                     <p className="text-xs text-muted-foreground">Total outstanding bills</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Total payments pending</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{uniqueShopkeepers}</div>
                    <p className="text-xs text-muted-foreground">Total unique shopkeepers</p>
                </CardContent>
            </Card>
        </div>
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                            }}
                        />
                        <Legend wrapperStyle={{fontSize: "14px"}}/>
                        <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </div>
  );
}
