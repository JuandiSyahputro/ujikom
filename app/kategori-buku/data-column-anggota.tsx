"use client";
import type { KategoriBuku } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import ActionCellKategoriBuku from "@/components/kategori-buku/action-cell-anggota";

export const columnKategoriBuku: ColumnDef<KategoriBuku>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "kategori",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori Buku" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellKategoriBuku data={row.original} />;
    },
  },
];
