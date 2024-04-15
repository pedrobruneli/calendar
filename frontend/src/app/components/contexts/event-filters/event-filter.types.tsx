export const statusMapping = {
  upcoming: {
    label: "Upcoming",
    color: "bg-blue-400",
  },
  done: {
    label: "Done",
    color: "bg-green-400",
  },
  canceled: {
    label: "Canceled",
    color: "bg-red-400",
  },
  delayed: {
    label: "Delayed",
    color: "bg-yellow-400",
  },
};

export type EventFilterContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};
