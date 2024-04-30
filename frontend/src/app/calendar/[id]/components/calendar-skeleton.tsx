import { Skeleton } from "@/components/ui/skeleton";

export function CalendarSkeleton() {
  return (
    <>
      <div className="p-6 flex flex-col gap-3 w-full border-b md:border-r md:border-b-0 min-w-[475px]">
        <Skeleton className="w-28 h-6" />
        <Skeleton className="w-16 h-5" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-full grow h-4" />
            </div>
          </div>
        ))}
        <Skeleton className="w-10/12 h-4" />
      </div>
      <div className="w-full p-6 gap-3 flex flex-col">
        <Skeleton className="w-28 h-6" />
        <Skeleton className="w-10/12 h-72 self-center" />
      </div>
    </>
  );
}
