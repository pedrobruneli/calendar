"use client";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { HourSelection } from "./components/hour-selection";
import { useRouter } from "next/navigation";

type CalendarProps = {
  params: {
    id: string;
  };
};

export default function CalendarPage({ params }: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 items-start p-6 w-full h-full">
      <h1 className="text-lg font-bold">Selecione uma data</h1>
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
