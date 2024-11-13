"use client";
import type { Anggota } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import ActionCellAnggota from "@/components/anggota/action-cell-anggota";
import { DataTableColumnHeader } from "@/components/data-table/column-header";

export const columnAnggota: ColumnDef<Anggota>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
  },
  {
    accessorKey: "noHp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Telp" />,
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "tglLahir",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tgl Lahir" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("tglLahir"));
      const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "tglDaftar",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tgl Daftar" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("tglDaftar"));
      const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellAnggota data={row.original} />;
    },
  },
];
