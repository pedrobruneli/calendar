"use client";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { HourSelection } from "./components/hour-selection";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";

type CalendarProps = {
  params: {
    id: string;
  };
};

export default function CalendarPage({ params }: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>();
  const router = useRouter();

  const getUser = async () => {
    const response = await fetch(`${API_URL}/users/${params.id}`);
    if (!response.ok) {
      router.push("/404");
    }
    return await response.json();
  };

  useQuery({
    queryKey: ["user", params.id],
    queryFn: getUser,
  });

  return (
    <div className="flex flex-col gap-3 items-start p-6 w-full h-full">
      <h1 className="text-lg font-bold">Select a date</h1>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="self-center"
        fromDate={new Date()}
      ></Calendar>
      <ScrollArea className="w-full px-4">
        {date && (
          <HourSelection
            date={date}
            onNext={(hourDate) => {
              router.push(`/calendar/${params.id}/${hourDate.toISOString()}`);
            }}
          ></HourSelection>
        )}
      </ScrollArea>
    </div>
  );
}
