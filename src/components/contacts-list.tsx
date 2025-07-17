"use client";

import { useContacts, Contact } from "@/lib/storage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ContactsList() {
  const { contacts } = useContacts();
  
  if (contacts.length === 0) {
    return <p>No contacts found. Add a delivery to automatically create a contact.</p>
  }

  return (
    <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {contacts.map((c: Contact) => (
                <TableRow key={c.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>{c.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{c.name}</span>
                        </div>
                    </TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.address}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
