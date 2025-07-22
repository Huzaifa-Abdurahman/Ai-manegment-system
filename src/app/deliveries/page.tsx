"use client"
import DeliveryForm from "@/components/delivery-form";
import DeliveriesTable from "@/components/deliveries-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DeliveriesPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">New Delivery Entry</CardTitle>
            <CardDescription>Enter the details for a new delivery.</CardDescription>
        </CardHeader>
        <CardContent>
            <DeliveryForm />
        </CardContent>
      </Card>
      
      <Separator />

      <Card>
         <CardHeader>
            <CardTitle className="font-headline">Delivery History</CardTitle>
            <CardDescription>View all past deliveries.</CardDescription>
        </CardHeader>
        <CardContent>
            <DeliveriesTable />
        </CardContent>
      </Card>
    </div>
  );
}
