"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const HourSelection = () => {
  const hours = [
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-1 w-full justify-center">
      {hours.map((hour) => (
        <div key={hour} className="flex gap-1">
          <Button
            onClick={() => setSelectedHour(hour)}
            className="w-full"
            variant={selectedHour === hour ? "default" : "outline"}
          >
            {hour}
          </Button>
          {selectedHour === hour && (
            <Button key={hour + "arrow"} className="w-3/7">
              <ArrowRight size={16}></ArrowRight>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
