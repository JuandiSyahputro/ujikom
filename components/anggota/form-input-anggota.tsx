"use client";

import CardWrapper from "@/components/card-wrapper";
import AlertComponent from "@/components/reusable/alert-component";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SpinnnerAnimate from "@/components/ui/spinner";
import { cn, formatCapitalize } from "@/lib/utils";
import { addAnggota, updateAnggota } from "@/lib/wrapper-actions";
import { schemaAnggota } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Anggota } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  type: string;
  title: string;
  data?: Anggota;
}

const FormAddAnggota = ({ type, title, data }: FormInputProps) => {
  const [loading, setIsLoading] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState({
    tglLahir: false,
    tglDaftar: false,
  });
  const [error, setError] = useState("");
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(schemaAnggota),
    defaultValues: {
      nama: data?.nama ? data?.nama : "",
      alamat: data?.alamat ? data?.alamat : "",
      noHp: data?.noHp ? data?.noHp : "",
      email: data?.email ? data?.email : "",
      tglLahir: data?.tglLahir ? data?.tglLahir : new Date(),
      tglDaftar: data?.tglDaftar ? data?.tglDaftar : new Date(),
    },
  });
  const handleCreateAnggota = async (dataForm: z.infer<typeof schemaAnggota>) => {
    setIsLoading(true);
    const { nama, alamat, email, noHp, tglDaftar, tglLahir } = dataForm;
    const formData = new FormData();

    formData.append("nama", formatCapitalize(nama));
    formData.append("alamat", alamat);
    formData.append("email", email);
    formData.append("noHp", noHp);
    formData.append("tglDaftar", format(tglDaftar, "yyyy-MM-dd"));
    formData.append("tglLahir", format(tglLahir, "yyyy-MM-dd"));

    try {
      // post data to database
      const response = await addAnggota(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Error creating anggota");
      } else {
        push("/anggota");
      }
    } catch (error) {
      console.error("Add categories failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditHome = async (dataForm: z.infer<typeof schemaAnggota>) => {
    setIsLoading(true);

    const { nama, alamat, email, noHp, tglDaftar, tglLahir } = dataForm;
    const formData = new FormData();

    formData.append("id", data!.id);
    formData.append("nama", formatCapitalize(nama));
    formData.append("alamat", alamat);
    formData.append("email", email);
    formData.append("noHp", noHp);
    formData.append("tglDaftar", format(tglDaftar, "yyyy-MM-dd"));
    formData.append("tglLahir", format(tglLahir, "yyyy-MM-dd"));

    try {
      const response = await updateAnggota(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Anggota not found");
      } else {
        push("/anggota");
      }
    } catch (error) {
      console.error("Update anggota failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper className="w-1/2 border-0 shadow-none lg:w-1/3" label="" title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(type === "add" ? handleCreateAnggota : handleEditHome)} className="space-y-6">
          <div className="space-y-4">
            {error ? <AlertComponent message={error} typeError={"destructive"} title="Error" /> : null}

            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Jhon doe..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Jl. Bungur indah...." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noHp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Telp</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="0823942823.." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="jhon@yopmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tglLahir"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Lahir</FormLabel>
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
              name="tglDaftar"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Daftar</FormLabel>
                  <Popover open={isOpenCalendar.tglDaftar} onOpenChange={() => setIsOpenCalendar((prev) => ({ ...prev, tglDaftar: !prev.tglDaftar }))}>
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
                        onDayClick={() => setIsOpenCalendar((prev) => ({ ...prev, tglDaftar: false }))}
                      />
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

export default FormAddAnggota;
