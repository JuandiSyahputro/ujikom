"use client";

import CardWrapper from "@/components/card-wrapper";
import AlertComponent from "@/components/reusable/alert-component";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SpinnnerAnimate from "@/components/ui/spinner";
import { formatCapitalize } from "@/lib/utils";
import { addKategoriBuku, updateKategoriBuku } from "@/lib/wrapper-actions";
import { schemaKategoriBuku } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { KategoriBuku } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  type: string;
  title: string;
  data?: KategoriBuku;
}

const FormAddKategoriBuku = ({ type, title, data }: FormInputProps) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(schemaKategoriBuku),
    defaultValues: {
      kategori: data?.kategori ? data?.kategori : "",
    },
  });
  const handleCreateKategoriBuku = async (dataForm: z.infer<typeof schemaKategoriBuku>) => {
    setIsLoading(true);
    const { kategori } = dataForm;
    const formData = new FormData();

    formData.append("kategori", formatCapitalize(kategori));

    try {
      // post data to database
      const response = await addKategoriBuku(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Error creating kategori buku");
      } else {
        push("/kategori-buku");
      }
    } catch (error) {
      console.error("Add kategori buku failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditKategoriBuku = async (dataForm: z.infer<typeof schemaKategoriBuku>) => {
    setIsLoading(true);

    const { kategori } = dataForm;
    const formData = new FormData();

    formData.append("id", data!.id);
    formData.append("kategori", formatCapitalize(kategori));

    try {
      // update data ke database
      const response = await updateKategoriBuku(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Kategori not found");
      } else {
        push("/kategori-buku");
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
        <form onSubmit={form.handleSubmit(type === "add" ? handleCreateKategoriBuku : handleEditKategoriBuku)} className="space-y-6">
          <div className="space-y-4">
            {error ? <AlertComponent message={error} typeError={"destructive"} title="Error" /> : null}

            <FormField
              control={form.control}
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Buku</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Buku Kesahatan, dll...." />
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

export default FormAddKategoriBuku;
