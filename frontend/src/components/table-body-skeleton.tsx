import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";

type TableBodySkeletonProps = {
  colLength: number;
};

export function TableBodySkeleton({ colLength }: TableBodySkeletonProps) {
  return (
    <TableBody>
      {[...Array(5)].map((_, rowIndex) => (
        <TableRow key={`ROW_SKELETON_${rowIndex}`}>
          {[...Array(colLength)].map((_, cellIndex) => (
            <TableCell key={`CELL_SKELETON_${cellIndex}`}>
              <Skeleton className="w-32 h-5" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
