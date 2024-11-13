"use client";
import type { data } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import ActionCellHome from "@/components/home/action-cell-home";

export const columnHome: ColumnDef<data>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama User" />,
  },
  {
    accessorKey: "age",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Umur User" />,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellHome data={row.original} />;
    },
  },
];
