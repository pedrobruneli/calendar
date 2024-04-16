"use client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { ReactNode, useState } from "react";

export default function CalendarLayout({ children }: { children: ReactNode }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <main className="md:h-screen flex items-center justify-center p-5">
      <Card className="flex flex-col w-11/12 h-full max-w-[800px] md:max-h-[700px] flex-1 md:flex-row">
        <div className="border-b p-6 md:border-r md:border-b-0">
          <ScrollArea
            className={cn("w-full h-full", !showMore && "max-h-[700px]")}
          >
            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-bold">1:1 Bruneli</h1>
              <div className="flex items-center gap-2">
                <Clock className="text-foreground" size={20}></Clock>
                <span>30 min</span>
              </div>
              <div>
                {[...new Array(20)].map((item, index) => {
                  return (
                    <p key={index}>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Qui officia voluptate ea eius aliquid ipsam ut
                      veritatisasdasdssad quas! Necessitatibus nihil, est nulla
                      dicta a molestias corrupti voluptatibus eius
                      exercitationem quos.
                    </p>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
          <span
            className="font-bold cursor-pointer md:hidden"
            onClick={() => setShowMore(!showMore)}
          >
            Show {showMore ? "less" : "more"}
          </span>
        </div>
        {children}
      </Card>
    </main>
  );
}
