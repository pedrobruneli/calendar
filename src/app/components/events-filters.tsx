import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { statusMapping } from "../page";
import { useEventFilter } from "./contexts/event-filter-context";

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
          <DropdownMenuCheckboxItem
            checked={filters.includes("upcoming")}
            onCheckedChange={(checked) => onCheckedChange(checked, "upcoming")}
          >
            Em breve
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.includes("canceled")}
            onCheckedChange={(checked) => onCheckedChange(checked, "canceled")}
          >
            Cancelado
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.includes("done")}
            onCheckedChange={(checked) => onCheckedChange(checked, "done")}
          >
            Concluido
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
