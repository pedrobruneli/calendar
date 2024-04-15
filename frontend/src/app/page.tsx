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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EventsFilters } from "./components/events-filters";
import { useEventFilter } from "./components/contexts/event-filters/event-filter.context";
import { statusMapping } from "./components/contexts/event-filters/event-filter.types";
import { FinishEvent } from "./components/finish-event";
import { useQuery } from "@tanstack/react-query";

type Event = {
  id: number;
  customer: string;
  event: string;
  duration: string;
  date: Date;
  status: keyof typeof statusMapping;
};

export default function Home() {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: (): Promise<Event[]> =>
      fetch("/api/events").then((res) => res.json()),
  });

  const handleDelete = (id: number) => () => {
    /*  setEvents((events) => events.filter((event) => event.id !== id)); */
  };

  const handleFinish = (id: number) => () => {
    /*  setEvents((events) =>
      events.map((event) =>
        event.id === id ? { ...event, status: "done" } : event
      )
    ); */
  };

  const { filters } = useEventFilter();
  /*   const filteredEvents = useMemo(() => {
    return events.filter((event) => filters.includes(event.status));
  }, [events, filters]); */

  const hourFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <main className="flex flex-1 flex-col p-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Coming Events</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <EventsFilters />
            {events && events.length > 0 ? (
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
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.customer}</TableCell>
                        <TableCell>{event.event}</TableCell>
                        <TableCell>{event.duration}</TableCell>
                        <TableCell>
                          {new Intl.DateTimeFormat("en-US").format(event.date)}
                        </TableCell>
                        <TableCell>
                          {hourFormatter.format(event.date)}
                        </TableCell>
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
                          <div className="flex gap-2">
                            <DeleteEvent onDelete={handleDelete(event.id)} />
                            {event.status === "upcoming" && (
                              <FinishEvent onFinish={handleFinish(event.id)} />
                            )}{" "}
                          </div>
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