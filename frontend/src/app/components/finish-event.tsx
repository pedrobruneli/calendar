import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";

type FinishEventProps = {
  onFinish: () => void;
};

export const FinishEvent = ({ onFinish }: FinishEventProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Check className="w-5 h-5 text-green-500 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          Are you sure you want to mark this event as done?
          <div className="flex gap-2 justify-end">
            <Button onClick={onFinish}>Yes</Button>
            <PopoverClose asChild>
              <Button variant="destructive">No</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
