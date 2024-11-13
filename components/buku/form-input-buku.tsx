"use client";

import CardWrapper from "@/components/card-wrapper";
import AlertComponent from "@/components/reusable/alert-component";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SpinnnerAnimate from "@/components/ui/spinner";
import { cn, formatCapitalize } from "@/lib/utils";
import { addBuku, updateBuku } from "@/lib/wrapper-actions";
import { schemaBuku } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Buku, KategoriBuku } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  type: string;
  title: string;
  data?: Buku;
  kategoriBuku?: KategoriBuku[];
}

const FormAddBuku = ({ type, title, data, kategoriBuku }: FormInputProps) => {
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState({
    tglLahir: false,
    tglDaftar: false,
  });
  const [error, setError] = useState("");
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(schemaBuku),
    defaultValues: {
      judul: data?.judul ? data.judul : "",
      pengarang: data?.pengarang ? data.pengarang : "",
      penerbit: data?.penerbit ? data.penerbit : "",
      tahun: data?.tahun ? data.tahun : "",
      isbn: data?.isbn ? data.isbn : "",
      tglInput: data?.tglInput ? new Date(data.tglInput) : new Date(),
      jmlHalaman: data?.jmlHalaman ? String(data.jmlHalaman) : String(0),
      kategoriId: data?.kategoriId ? data.kategoriId : "",
    },
  });
  const handleCreateBuku = async (dataForm: z.infer<typeof schemaBuku>) => {
    setIsLoading(true);
    const { isbn, jmlHalaman, judul, penerbit, pengarang, tahun, tglInput, kategoriId } = dataForm;
    const formData = new FormData();

    formData.append("isbn", isbn.toLocaleUpperCase());
    formData.append("jmlHalaman", String(jmlHalaman));
    formData.append("judul", formatCapitalize(judul));
    formData.append("penerbit", formatCapitalize(penerbit));
    formData.append("pengarang", formatCapitalize(pengarang));
    formData.append("tahun", tahun);
    formData.append("kategoriId", kategoriId);
    formData.append("tglInput", format(tglInput, "yyyy-MM-dd"));

    try {
      // post data to database
      const response = await addBuku(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Error creating buku");
      } else {
        push("/buku");
      }
    } catch (error) {
      console.error("Add categories failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditHome = async (dataForm: z.infer<typeof schemaBuku>) => {
    setIsLoading(true);

    const { isbn, jmlHalaman, judul, penerbit, pengarang, tahun, tglInput, kategoriId } = dataForm;
    const formData = new FormData();

    formData.append("id", data!.id);
    formData.append("isbn", isbn.toLocaleUpperCase());
    formData.append("jmlHalaman", String(jmlHalaman));
    formData.append("judul", formatCapitalize(judul));
    formData.append("penerbit", formatCapitalize(penerbit));
    formData.append("pengarang", formatCapitalize(pengarang));
    formData.append("tahun", tahun);
    formData.append("kategoriId", kategoriId);
    formData.append("tglInput", format(tglInput, "yyyy-MM-dd"));

    try {
      const response = await updateBuku(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Buku not found");
      } else {
        push("/buku");
      }
    } catch (error) {
      console.error("Update buku failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper className="w-1/2 border-0 shadow-none lg:w-1/3" label="" title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(type === "add" ? handleCreateBuku : handleEditHome)} className="space-y-6">
          <div className="space-y-4">
            {error ? <AlertComponent message={error} typeError={"destructive"} title="Error" /> : null}

            <FormField
              control={form.control}
              name="kategoriId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Kategori Buku</FormLabel>
                  <Popover open={open} onOpenChange={() => setOpen(!open)}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                        {field.value ? kategoriBuku?.find((item) => item.id === field.value)?.kategori : "Pilih Kategori Buku"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-[350px] p-0">
                      <Command>
                        <CommandInput placeholder="Search nomor PO..." />
                        <CommandList defaultValue={field.value}>
                          <CommandEmpty>No data found.</CommandEmpty>
                          <CommandGroup>
                            {kategoriBuku!.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id}
                                onSelect={(currentValue) => {
                                  setOpen(!open);

                                  field.onChange(field.value == currentValue ? "" : currentValue);

                                  form.setValue("kategoriId", item.id);
                                }}>
                                <Check className={cn("mr-2 h-4 w-4", field.value === item.id ? "opacity-100" : "opacity-0")} />
                                {item.kategori}
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
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Buku</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Judul Buku..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pengarang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pengarang Buku</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Pengarang Buku..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="penerbit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Penerbit Buku</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Penerbit Buku...." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tahun"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Buku</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} placeholder="Tahun Diterbitkan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="ISBN" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tglInput"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Input</FormLabel>
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
                          {field.value ? format(field.value, "PPP") : <span>Tanggal Masuk Barang</span>}
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

            <FormField
              control={form.control}
              name="jmlHalaman"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Halaman</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} placeholder="Jumlah Halaman..." />
                  </FormControl>
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

export default FormAddBuku;
