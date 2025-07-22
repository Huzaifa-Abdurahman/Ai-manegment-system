"use client"
import DeliveryReport from "@/components/delivery-report";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <FileText />
                Daily Delivery Reports
            </CardTitle>
            <CardDescription>
                Generate a printable delivery report for your staff. The report uses AI to suggest which customers to visit and what to deliver.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <DeliveryReport />
        </CardContent>
      </Card>
    </div>
  );
}
