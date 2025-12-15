import { Badge } from "./ui/badge";

export type ReservationStatus = "new" | "pending" | "confirmed" | "cancelled" | "docs-pending";

interface StatusBadgeProps {
  status: ReservationStatus;
}

const statusConfig: Record<ReservationStatus, { label: string; className: string }> = {
  new: {
    label: "Nueva",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100"
  },
  pending: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100"
  },
  confirmed: {
    label: "Confirmada",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  },
  cancelled: {
    label: "Cancelada",
    className: "bg-red-100 text-red-700 hover:bg-red-100"
  },
  "docs-pending": {
    label: "Docs Pendientes",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-100"
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}
