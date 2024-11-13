"use client";
import type { data } from "@prisma/client";

import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

import AlertDialogConfirmation from "@/components/reusable/alert-dialog-confirmation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteData } from "@/lib/wrapper-actions";
import Link from "next/link";
import { useState } from "react";

const ActionCellHome = ({ data }: { data: data }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Link href={`/edit/${data.id}`} className="">
          <Button variant="default" className="w-full justify-start gap-3">
            <SquarePen size={20} /> Edit
          </Button>
        </Link>
        <DropdownMenuSeparator />
        <AlertDialogConfirmation
          handleAction={async (id: string) => {
            return await deleteData(id);
          }}
          id={data.id}
          setOpen={setOpen}
          ahref="/">
          <Button variant="destructive" className="w-full justify-start gap-3 text-sm">
            <Trash2 size={20} className="text-slate-100" />
            Delete
          </Button>
        </AlertDialogConfirmation>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCellHome;
