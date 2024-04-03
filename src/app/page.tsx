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
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EventsFilters } from "./components/events-filters";
import {
  EventFilterProvider,
  useEventFilter,
} from "./components/contexts/event-filter-context";

export const statusMapping = {
  upcoming: {
    label: "Em breve",
    color: "bg-yellow-400",
  },
  done: {
    label: "Concluído",
    color: "bg-green-400",
  },
  canceled: {
    label: "Cancelado",
    color: "bg-red-400",
  },
};

type Event = {
  id: number;
  customer: string;
  event: string;
  duration: string;
  date: string;
  hour: string;
  status: keyof typeof statusMapping;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      customer: "John Doe",
      event: "Meeting",
      duration: "30 minutes",
      date: "01/05/2024",
      hour: "10:00",
      status: "upcoming",
    },
    {
      id: 2,
      customer: "Another guy",
      event: "Meeting",
      duration: "30 minutes",
      date: "01/05/2024",
      hour: "11:00",
      status: "canceled",
    },
    {
      id: 3,
      customer: "Jane Doe",
      event: "Meeting",
      duration: "30 minutes",
      date: "01/05/2024",
      hour: "12:00",
      status: "done",
    },
  ]);

  const handleDelete = (id: number) => () => {
    setEvents((events) => events.filter((event) => event.id !== id));
  };

  const { filters } = useEventFilter();
  const filteredEvents = useMemo(() => {
    return events.filter((event) => filters.includes(event.status));
  }, [events, filters]);

  return (
    <main className="flex flex-1 flex-col p-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Coming Events</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <EventsFilters />
            {filteredEvents.length > 0 ? (
              <div className="flex flex-col gap-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Hour</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.customer}</TableCell>
                        <TableCell>{event.event}</TableCell>
                        <TableCell>{event.duration}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.hour}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              statusMapping[event.status].color,
                              "hover:bg-opacity-80 text-primary-foreground"
                            )}
                          >
                            {statusMapping[event.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DeleteEvent onDelete={handleDelete(event.id)} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <span>No events to show...</span>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
