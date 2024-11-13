"use client";
import { ColumnDef } from "@tanstack/react-table";

import { PeminjamanProps } from "@/app/peminjaman/page";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import ActionCellPeminjaman from "@/components/peminjaman/action-cell-peminjaman";

export const columnPeminjaman: ColumnDef<PeminjamanProps>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "judulBuku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Judul Buku" />,
  },
  {
    accessorKey: "tglPinjam",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Pinjam" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("tglPinjam"));
      const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "tglKembali",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Kembali" />,
    cell: ({ row }) => {
      if (row.getValue("tglKembali") !== null) {
        const date = new Date(row.getValue("tglKembali"));
        const formattedDate = date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        return <div className="font-medium">{formattedDate}</div>;
      }

      return <div className="font-medium">-</div>;
    },
  },
  {
    accessorKey: "lamaPinjaman",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lama Pinjaman" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.lamaPinjaman} Hari</div>;
    },
  },
  {
    accessorKey: "nominalDenda",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nominal Denda" />,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("nominalDenda"));

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
    accessorKey: "userName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
  },
  {
    accessorKey: "anggotaName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Anggota" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellPeminjaman data={row.original} />;
    },
  },
];
