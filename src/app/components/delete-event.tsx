import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash } from "lucide-react";

type DeleteEventProps = {
  onDelete: () => void;
};

export const DeleteEvent = ({ onDelete }: DeleteEventProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Trash className="w-5 h-5 text-red-500 cursor-pointer"></Trash>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          Are you sure you want to delete this event?
          <div className="flex gap-2 justify-end">
            <Button onClick={onDelete}>Yes</Button>
            <PopoverClose asChild>
              <Button variant="destructive">No</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
