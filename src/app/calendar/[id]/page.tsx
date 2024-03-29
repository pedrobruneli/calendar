"use client";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { HourSelection } from "./components/hour-selection";

type CalendarProps = {
  params: {
    id: string;
  };
};

export default function CalendarPage({ params }: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <main className="h-dvh flex items-center justify-center">
      <Card className="flex w-11/12 max-w-[800px] max-h-[700px] flex-1">
        <ScrollArea className="w-full">
          <div className="flex flex-col gap-3 border-r border-border p-6">
            <h1 className="text-xl font-bold">1:1 Bruneli</h1>
            <div className="flex items-center gap-2">
              <Clock color="rgba(26,26,26,0.61)" size={20}></Clock>
              <span>30 min</span>
            </div>
            <div>
              {[...new Array(20)].map((item, index) => {
                return (
                  <>
                    <p key={index}>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Qui officia voluptate ea eius aliquid ipsam ut
                      veritatisasdasdssad quas! Necessitatibus nihil, est nulla
                      dicta a molestias corrupti voluptatibus eius
                      exercitationem quos.
                    </p>
                  </>
                );
              })}
            </div>
          </div>
        </ScrollArea>
        <div className="flex flex-col gap-3 items-start p-6 w-full">
          <h1 className="text-lg font-bold">Selecione uma data</h1>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="self-center"
            fromDate={new Date()}
          ></Calendar>
          <ScrollArea className="w-full px-4">
            <HourSelection></HourSelection>
          </ScrollArea>
        </div>
      </Card>
    </main>
  );
}
