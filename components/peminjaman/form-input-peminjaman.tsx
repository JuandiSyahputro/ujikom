"use client";

import { PeminjamanById } from "@/app/peminjaman/edit/[id]/page";
import CardWrapper from "@/components/card-wrapper";
import AlertComponent from "@/components/reusable/alert-component";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SpinnnerAnimate from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { addPeminjaman, updatePeminjaman } from "@/lib/wrapper-actions";
import { schemaPeminjaman } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Anggota, Buku, Denda, Users } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  type: string;
  title: string;
  data?: PeminjamanById;
  anggota?: Anggota[];
  buku?: Buku[];
  denda?: Denda[];
  users?: Users[];
}

const FormAddPeminjaman = ({ type, title, data, anggota, buku, denda, users }: FormInputProps) => {
  const [loading, setIsLoading] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState({
    tglLahir: false,
    tglPengembalian: false,
  });
  const [open, setOpen] = useState({
    anggotaId: false,
    bukuId: false,
    dendaId: false,
    userId: false,
  });
  const [error, setError] = useState("");
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(schemaPeminjaman),
    defaultValues: {
      tglPinjam: data?.tglPinjam ? new Date(data?.tglPinjam) : new Date(),
      lamaPinjaman: data?.lamaPinjaman ? data?.lamaPinjaman : "",
      anggotaId: data?.anggotaId ? data?.anggotaId : "",
      bukuId: data?.bukuId ? data?.bukuId : "",
      dendaId: data?.dendaId ? data?.dendaId : "",
      userId: data?.userId ? data?.userId : "",
      tglKembali: data?.tglKembali ? new Date(data?.tglKembali) : new Date(),
      detailPinjamanId: data?.detailPinjamanId ? data?.detailPinjamanId : "",
    },
  });

  const handleCreatePeminjaman = async (dataForm: z.infer<typeof schemaPeminjaman>) => {
    setIsLoading(true);
    const { tglPinjam, lamaPinjaman, anggotaId, bukuId, dendaId, userId } = dataForm;
    const formData = new FormData();

    formData.append("tglPinjam", format(tglPinjam, "yyyy-MM-dd"));
    formData.append("lamaPinjaman", lamaPinjaman);
    formData.append("anggotaId", anggotaId);
    formData.append("bukuId", bukuId);
    formData.append("dendaId", dendaId);
    formData.append("userId", userId);

    try {
      // post data to database
      const response = await addPeminjaman(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Error creating peminjaman");
      } else {
        push("/peminjaman");
      }
    } catch (error) {
      console.error("Add peminjaman failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditHome = async (dataForm: z.infer<typeof schemaPeminjaman>) => {
    setIsLoading(true);

    const { tglPinjam, lamaPinjaman, anggotaId, bukuId, dendaId, userId, tglKembali } = dataForm;
    const formData = new FormData();

    if (tglKembali) formData.append("tglKembali", format(tglKembali, "yyyy-MM-dd"));
    if (data?.detailPinjamanId) formData.append("detailPinjamanId", data?.detailPinjamanId);
    formData.append("id", data!.id);
    formData.append("tglPinjam", format(tglPinjam, "yyyy-MM-dd"));
    formData.append("lamaPinjaman", lamaPinjaman);
    formData.append("anggotaId", anggotaId);
    formData.append("bukuId", bukuId);
    formData.append("dendaId", dendaId);
    formData.append("userId", userId);

    try {
      const response = await updatePeminjaman(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Peminjaman not found");
      } else {
        push("/peminjaman");
      }
    } catch (error) {
      console.error("Update Peminjaman failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper className="w-1/2 border-0 shadow-none lg:w-1/3" label="" title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(type === "add" ? handleCreatePeminjaman : handleEditHome)} className="space-y-6">
          <div className="space-y-4">
            {error ? <AlertComponent message={error} typeError={"destructive"} title="Error" /> : null}
            <FormField
              control={form.control}
              name="tglPinjam"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Peminjaman</FormLabel>
                  <Popover
                    open={isOpenCalendar.tglLahir}
                    onOpenChange={() =>
                      setIsOpenCalendar((prev) => ({
                        ...prev,
                        tglLahir: !prev.tglLahir,
                      }))
                    }>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Tanggal Peminjaman</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                        className="w-full p-0"
                        onDayClick={() => setIsOpenCalendar((prev) => ({ ...prev, tglLahir: false }))}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === "edit" && (
              <FormField
                control={form.control}
                name="tglKembali"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Pengembalian</FormLabel>
                    <Popover
                      open={isOpenCalendar.tglPengembalian}
                      onOpenChange={() =>
                        setIsOpenCalendar((prev) => ({
                          ...prev,
                          tglPengembalian: !prev.tglPengembalian,
                        }))
                      }>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Tanggal Peminjaman</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                          className="w-full p-0"
                          onDayClick={() => setIsOpenCalendar((prev) => ({ ...prev, tglPengembalian: false }))}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="lamaPinjaman"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lama Pinjaman</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} placeholder="1 = 1 hari" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bukuId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Buku</FormLabel>
                  <Popover
                    open={open.bukuId}
                    onOpenChange={() =>
                      setOpen((prev) => ({
                        ...prev,
                        bukuId: !prev.bukuId,
                      }))
                    }>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" aria-expanded={open.bukuId} className="w-full justify-between">
                        {field.value ? buku?.find((item) => item.id === field.value)?.judul : "Pilih Buku"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-[350px] p-0">
                      <Command>
                        <CommandInput placeholder="Search buku..." />
                        <CommandList defaultValue={field.value}>
                          <CommandEmpty>No data found.</CommandEmpty>
                          <CommandGroup>
                            {buku!.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id}
                                onSelect={(currentValue) => {
                                  setOpen((prev) => ({ ...prev, bukuId: false }));

                                  field.onChange(field.value == currentValue ? "" : currentValue);

                                  form.setValue("bukuId", item.id);
                                }}>
                                <Check className={cn("mr-2 h-4 w-4", field.value === item.id ? "opacity-100" : "opacity-0")} />
                                {item.judul}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="anggotaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Anggota</FormLabel>
                  <Popover
                    open={open.anggotaId}
                    onOpenChange={() =>
                      setOpen((open) => ({
                        ...open,
                        anggotaId: !open.anggotaId,
                      }))
                    }>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" aria-expanded={open.anggotaId} className="w-full justify-between">
                        {field.value ? anggota?.find((item) => item.id === field.value)?.nama : "Pilih Anggota"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-[350px] p-0">
                      <Command>
                        <CommandInput placeholder="Search anggota..." />
                        <CommandList defaultValue={field.value}>
                          <CommandEmpty>No data found.</CommandEmpty>
                          <CommandGroup>
                            {anggota!.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id}
                                onSelect={(currentValue) => {
                                  setOpen((prev) => ({ ...prev, anggotaId: false }));

                                  field.onChange(field.value == currentValue ? "" : currentValue);

                                  form.setValue("anggotaId", item.id);
                                }}>
                                <Check className={cn("mr-2 h-4 w-4", field.value === item.id ? "opacity-100" : "opacity-0")} />
                                {item.nama}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dendaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Nominal Denda</FormLabel>
                  <Popover
                    open={open.dendaId}
                    onOpenChange={() =>
                      setOpen((open) => ({
                        ...open,
                        dendaId: !open.dendaId,
                      }))
                    }>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" aria-expanded={open.dendaId} className="w-full justify-between">
                        {field.value ? denda?.find((item) => item.id === field.value)?.nominal : "Pilih Denda"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-[350px] p-0">
                      <Command>
                        <CommandInput placeholder="Search denda..." />
                        <CommandList defaultValue={field.value}>
                          <CommandEmpty>No data found.</CommandEmpty>
                          <CommandGroup>
                            {denda!.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id}
                                onSelect={(currentValue) => {
                                  setOpen((prev) => ({ ...prev, dendaId: false }));

                                  field.onChange(field.value == currentValue ? "" : currentValue);

                                  form.setValue("dendaId", item.id);
                                }}>
                                <Check className={cn("mr-2 h-4 w-4", field.value === item.id ? "opacity-100" : "opacity-0")} />
                                {item.nominal}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">User</FormLabel>
                  <Popover
                    open={open.userId}
                    onOpenChange={() =>
                      setOpen((open) => ({
                        ...open,
                        userId: !open.userId,
                      }))
                    }>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" aria-expanded={open.userId} className="w-full justify-between">
                        {field.value ? users?.find((item) => item.id === field.value)?.namaUser : "Pilih User"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-[350px] p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandList defaultValue={field.value}>
                          <CommandEmpty>No data found.</CommandEmpty>
                          <CommandGroup>
                            {users!.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id}
                                onSelect={(currentValue) => {
                                  setOpen((prev) => ({ ...prev, userId: false }));

                                  field.onChange(field.value == currentValue ? "" : currentValue);

                                  form.setValue("userId", item.id);
                                }}>
                                <Check className={cn("mr-2 h-4 w-4", field.value === item.id ? "opacity-100" : "opacity-0")} />
                                {item.namaUser}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="relative w-full" disabled={loading}>
            {loading ? "Submiting..." : "Submit"}
            {loading && <SpinnnerAnimate className="absolute right-2 top-1/3 h-4 w-4" />}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default FormAddPeminjaman;
