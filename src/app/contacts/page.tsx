"use client"
  import ContactsList from "@/components/contacts-list";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ContactsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Customer Contacts</CardTitle>
            <CardDescription>A list of all your shopkeepers and their contact information.</CardDescription>
        </CardHeader>
        <CardContent>
            <ContactsList />
        </CardContent>
      </Card>
    </div>
  );
}
