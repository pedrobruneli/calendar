"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteEvent } from "./components/delete-event";
import { useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([
    {
      id: 1,
      customer: "John Doe",
      event: "Meeting",
      duration: "30 minutes",
      date: "01/05/2024",
      hour: "10:00",
    },
    {
      id: 2,
      customer: "Another guy",
      event: "Meeting",
      duration: "30 minutes",
      date: "01/05/2024",
      hour: "11:00",
    },
  ]);

  const handleDelete = (id: number) => () => {
    setEvents((events) => events.filter((event) => event.id !== id));
  };

  return (
    <main className="flex flex-1 flex-col p-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Coming Events</h2>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Hour</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.customer}</TableCell>
                    <TableCell>{event.event}</TableCell>
                    <TableCell>{event.duration}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.hour}</TableCell>
                    <TableCell>
                      <DeleteEvent onDelete={handleDelete(event.id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <span>No events to show...</span>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
