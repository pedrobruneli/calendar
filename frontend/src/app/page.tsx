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
import { API_URL } from "@/lib/constants";
import ms from "ms";
import { useToast } from "@/components/ui/use-toast";
import { TableBodySkeleton } from "@/components/table-body-skeleton";

type Schedule = {
  id: string;
  name: string;
  email: string;
  phone: string;
  observations: string;
  startDate: string;
  endDate: string;
  status: keyof typeof statusMapping;
};

type ScheduleTable = Schedule & {
  startDate: Date;
  endDate: Date;
  duration: string;
  date: string;
};

export default function Home() {
  const { toast } = useToast();

  const getEvents = async (): Promise<ScheduleTable[]> => {
    const response = await fetch(`${API_URL}/schedule`);
    if (!response.ok) {
      throw new Error("Error fetching events");
    }
    const data = await response.json();
    return data.map((event: Schedule) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      return {
        ...event,
        startDate,
        endDate,
        duration: ms(endDate.getTime() - startDate.getTime()),
        date: new Intl.DateTimeFormat("en-US").format(startDate),
      };
    });
  };

  const {
    data: events,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: (): Promise<ScheduleTable[]> => getEvents(),
    retry: (failureCount, error) => {
      if (failureCount === 3) {
        toast({
          title: "Error",
          description: "Error fetching events",
          variant: "destructive",
        });
        return false;
      }
      return true;
    },
  });

  const handleDelete = (id: string) => async () => {
    await fetch(`${API_URL}/schedule/${id}`, {
      method: "DELETE",
    }).catch(() => {
      toast({
        title: "Error",
        description: "Error deleting event",
        variant: "destructive",
      });
    });
    refetch();
  };

  const handleFinish = (id: string) => async () => {
    await fetch(`${API_URL}/schedule/${id}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => {
      toast({
        title: "Error",
        description: "Error finishing event",
        variant: "destructive",
      });
    });
    refetch();
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
            <div className="flex flex-col gap-2">
              {((events && events.length > 0) || isLoading) && !error && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Hour</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  {isLoading && <TableBodySkeleton colLength={5} />}
                  {!isLoading && events && (
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.name}</TableCell>
                          <TableCell>{event.duration}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>
                            {hourFormatter.format(event.startDate)}
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
                                <FinishEvent
                                  onFinish={handleFinish(event.id)}
                                />
                              )}{" "}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              )}
            </div>
            {(events && events.length === 0 && !isLoading) ||
              (error && <span>No events to show...</span>)}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
