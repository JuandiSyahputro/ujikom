"use client";

import CardWrapper from "@/components/card-wrapper";
import AlertComponent from "@/components/reusable/alert-component";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SpinnnerAnimate from "@/components/ui/spinner";
import { addData, updateData } from "@/lib/bungkus-actions";
import { formatCapitalize } from "@/lib/utils";
import { dataSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { data } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  type: string;
  title: string;
  data?: data;
}

const FormAddHome = ({ type, title, data }: FormInputProps) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      name: data?.name ? data.name : "",
      age: data?.age ? Number(data.age) : 0,
      address: data?.address ? data.address : "",
    },
  });
  const handleCreateHome = async (dataForm: z.infer<typeof dataSchema>) => {
    setIsLoading(true);
    const { name, age, address } = dataForm;
    const formData = new FormData();
    formData.append("name", formatCapitalize(name));
    formData.append("address", address);
    formData.append("age", String(age));

    try {
      const response = await addData(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Error creating categories");
      } else {
        push("/");
      }
    } catch (error) {
      console.error("Add categories failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditHome = async (dataForm: z.infer<typeof dataSchema>) => {
    setIsLoading(true);

    const { name, age, address } = dataForm;
    const dataId = data?.id;
    const formData = new FormData();

    if (dataId) {
      formData.append("id", dataId);
    }
    formData.append("name", formatCapitalize(name));
    formData.append("address", address);
    formData.append("age", String(age));

    try {
      const response = await updateData(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Categories not found");
      } else {
        push("/");
      }
    } catch (error) {
      console.error("Update categories failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper className="w-1/2 border-0 shadow-none lg:w-1/3" label="" title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(type === "add" ? handleCreateHome : handleEditHome)} className="space-y-6">
          <div className="space-y-4">
            {error ? <AlertComponent message={error} typeError={"destructive"} title="Error" /> : null}

            <FormField
              control={form.control}
              name="name"
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
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Umur</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => {
                        const { value } = e.target;

                        field.onChange(Number(value));
                      }}
                      placeholder="perangkat komputer,printer,etc..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Jenis</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Jl. Bungur indah...." />
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

export default FormAddHome;
