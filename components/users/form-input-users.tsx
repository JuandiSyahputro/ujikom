"use client";

import CardWrapper from "@/components/card-wrapper";
import AlertComponent from "@/components/reusable/alert-component";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SpinnnerAnimate from "@/components/ui/spinner";
import { formatCapitalize } from "@/lib/utils";
import { addUsers, updateUsers } from "@/lib/wrapper-actions";
import { schemaUsers, schemaUsersUpdate } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Users } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  type: string;
  title: string;
  data?: Users;
}

const FormAddUsers = ({ type, title, data }: FormInputProps) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(type === "add" ? schemaUsers : schemaUsersUpdate),
    defaultValues: {
      namaUser: data?.namaUser ? data?.namaUser : "",
      password: "",
    },
  });
  const handleCreateUsers = async (dataForm: z.infer<typeof schemaUsers>) => {
    setIsLoading(true);
    const { namaUser, password } = dataForm;
    const formData = new FormData();

    formData.append("namaUser", formatCapitalize(namaUser));
    formData.append("password", password);

    try {
      // post data to database
      const response = await addUsers(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Error creating users");
      } else {
        push("/users");
      }
    } catch (error) {
      console.error("Add users failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUsers = async (dataForm: z.infer<typeof schemaUsersUpdate>) => {
    setIsLoading(true);

    const { namaUser } = dataForm;
    const formData = new FormData();

    formData.append("id", data!.id);
    formData.append("namaUser", formatCapitalize(namaUser));

    try {
      const response = await updateUsers(formData);

      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Users not found");
      } else {
        push("/users");
      }
    } catch (error) {
      console.error("Update users failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper className="w-1/2 border-0 shadow-none lg:w-1/3" label="" title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(type === "add" ? handleCreateUsers : handleEditUsers)} className="space-y-6">
          <div className="space-y-4">
            {error ? <AlertComponent message={error} typeError={"destructive"} title="Error" /> : null}

            <FormField
              control={form.control}
              name="namaUser"
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

            {type === "add" && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="********" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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

export default FormAddUsers;
