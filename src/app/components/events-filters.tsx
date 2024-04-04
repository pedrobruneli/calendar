import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { useEventFilter } from "./contexts/event-filters/event-filter.context";
import { statusMapping } from "./contexts/event-filters/event-filter.types";
import { cn } from "@/lib/utils";

type Status = keyof typeof statusMapping;

export const EventsFilters = () => {
  const { filters, setFilters } = useEventFilter();

  const onCheckedChange = (checked: boolean, status: Status) => {
    setFilters((prev) =>
      checked ? [...prev, status] : prev.filter((filter) => filter !== status)
    );
  };

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-5 w-5" />
            <span className="sr-only">Filtrar eventos</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Object.entries(statusMapping).map(([status, { label, color }]) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={filters.includes(status as Status)}
              onCheckedChange={(checked) =>
                onCheckedChange(checked, status as Status)
              }
            >
              <span
                className={cn("rounded-full h-2 w-2 inline-block mr-2", color)}
              ></span>
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
