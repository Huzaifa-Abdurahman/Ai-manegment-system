"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDeliveries } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

const deliveryFormSchema = z.object({
  shopkeeperName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  bars: z.coerce.number().min(0, { message: "Cannot be negative." }),
  cartoons: z.coerce.number().min(0, { message: "Cannot be negative." }),
  totalBill: z.coerce.number().min(0, { message: "Cannot be negative." }),
  dueBill: z.coerce.number().min(0, { message: "Cannot be negative." }),
  pendingPayment: z.coerce.number().min(0, { message: "Cannot be negative." }),
});

type DeliveryFormValues = z.infer<typeof deliveryFormSchema>;

export default function DeliveryForm() {
  const { addDelivery } = useDeliveries();
  const { toast } = useToast();

  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      shopkeeperName: "",
      phone: "",
      address: "",
      bars: 0,
      cartoons: 0,
      totalBill: 0,
      dueBill: 0,
      pendingPayment: 0,
    },
  });

  function onSubmit(data: DeliveryFormValues) {
    addDelivery(data);
    toast({
      title: "Delivery Added",
      description: `Delivery for ${data.shopkeeperName} has been successfully recorded.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
            <FormField
            control={form.control}
            name="shopkeeperName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Shopkeeper Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. 9876543210" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. 123 Main St" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
                control={form.control}
                name="bars"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>No. of Bars</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="cartoons"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>No. of Cartoons</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="totalBill"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Total Bill (₹)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="dueBill"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Due Bill (₹)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="pendingPayment"
                render={({ field }) => (
                    <FormItem className="md:col-span-2 lg:col-span-1">
                    <FormLabel>Pending Payment (₹)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <Button type="submit">Add Delivery</Button>
      </form>
    </Form>
  );
}
