"use client";

import CardWrapper from "@/components/card-wrapper";
import AlertComponent from "@/components/reusable/alert-component";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SpinnnerAnimate from "@/components/ui/spinner";
import { addDenda, updateDenda } from "@/lib/wrapper-actions";
import { schemaDenda } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Denda } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  type: string;
  title: string;
  data?: Denda;
}

const FormAddDenda = ({ type, title, data }: FormInputProps) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(schemaDenda),
    defaultValues: {
      nominal: data?.nominal ? String(data?.nominal) : "0",
    },
  });
  const handleCreateDenda = async (dataForm: z.infer<typeof schemaDenda>) => {
    setIsLoading(true);
    const { nominal } = dataForm;
    const formData = new FormData();

    formData.append("nominal", nominal);

    try {
      // post data to database
      const response = await addDenda(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Error creating denda");
      } else {
        push("/denda");
      }
    } catch (error) {
      console.error("Add denda failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditDenda = async (dataForm: z.infer<typeof schemaDenda>) => {
    setIsLoading(true);

    const { nominal } = dataForm;
    const formData = new FormData();

    formData.append("id", data!.id);
    formData.append("nominal", nominal);

    try {
      const response = await updateDenda(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Denda not found");
      } else {
        push("/denda");
      }
    } catch (error) {
      console.error("Update denda failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper className="w-1/2 border-0 shadow-none lg:w-1/3" label="" title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(type === "add" ? handleCreateDenda : handleEditDenda)} className="space-y-6">
          <div className="space-y-4">
            {error ? <AlertComponent message={error} typeError={"destructive"} title="Error" /> : null}

            <FormField
              control={form.control}
              name="nominal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nominal Denda</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="1000 = 1.000" />
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

export default FormAddDenda;
