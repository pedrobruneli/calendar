export const statusMapping = {
  upcoming: {
    label: "Próximo",
    color: "bg-blue-400",
  },
  done: {
    label: "Concluído",
    color: "bg-green-400",
  },
  canceled: {
    label: "Cancelado",
    color: "bg-red-400",
  },
  delayed: {
    label: "Atrasado",
    color: "bg-yellow-400",
  },
};

export type EventFilterContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};
