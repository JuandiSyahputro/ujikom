"use client";
import { ColumnDef } from "@tanstack/react-table";

import { BukuProps } from "@/app/buku/page";
import ActionCellBuku from "@/components/buku/action-cell-buku";
import { DataTableColumnHeader } from "@/components/data-table/column-header";

export const columnBuku: ColumnDef<BukuProps>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "judul",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Judul Buku" />,
  },
  {
    accessorKey: "pengarang",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pengarang Buku" />,
  },
  {
    accessorKey: "penerbit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Penerbit" />,
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tahun" />,
  },
  {
    accessorKey: "isbn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ISBN" />,
  },
  {
    accessorKey: "jmlHalaman",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah Halaman" />,
  },
  {
    accessorKey: "tglInput",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tgl Input" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("tglInput"));
      const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "kategori",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori Buku" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellBuku data={row.original} />;
    },
  },
];
