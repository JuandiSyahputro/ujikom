"use client";
import type { Users } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import ActionCellUsers from "@/components/users/action-cell-users";

export const columnUsers: ColumnDef<Users>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "namaUser",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Users" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellUsers data={row.original} />;
    },
  },
];
