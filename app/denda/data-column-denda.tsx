"use client";
import type { Denda } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import ActionCellDenda from "@/components/denda/action-cell-denda";

export const columnDenda: ColumnDef<Denda>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "nominal",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nominal Denda" />,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("nominal"));

      const formatPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);

      return <div className="font-medium">{formatPrice}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellDenda data={row.original} />;
    },
  },
];
