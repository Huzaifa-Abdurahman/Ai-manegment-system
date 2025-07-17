"use client";

import { useDeliveries, Delivery } from "@/lib/storage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DeliveriesTable() {
  const { deliveries } = useDeliveries();

  if (deliveries.length === 0) {
    return <p>No deliveries recorded yet. Add one using the form above.</p>
  }

  return (
    <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Shopkeeper</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total Bill</TableHead>
                <TableHead className="text-right">Due</TableHead>
                <TableHead className="text-right">Pending</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {deliveries.map((d: Delivery) => (
                <TableRow key={d.id}>
                    <TableCell>
                        <div className="font-medium">{new Date(d.date).toLocaleDateString()}</div>
                    </TableCell>
                    <TableCell>
                        <div className="font-medium">{d.shopkeeperName}</div>
                        <div className="text-sm text-muted-foreground">{d.phone}</div>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col gap-1">
                            {d.bars > 0 && <Badge variant="secondary">{d.bars} Bars</Badge>}
                            {d.cartoons > 0 && <Badge variant="secondary">{d.cartoons} Cartoons</Badge>}
                        </div>
                    </TableCell>
                    <TableCell className="text-right">₹{d.totalBill.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{d.dueBill.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{d.pendingPayment.toLocaleString()}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
