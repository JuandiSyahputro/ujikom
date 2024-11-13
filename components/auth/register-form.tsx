"use client";

import CardWrapper from "@/components/card-wrapper";
import AlertComponent from "@/components/reusable/alert-component";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SpinnerAnimate from "@/components/ui/spinner";
import { addUsers } from "@/lib/wrapper-actions";
import { LoginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
  const { push } = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      namaUser: "",
      password: "",
    },
  });

  const handleRegister = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("namaUser", data.namaUser);
    formData.append("password", data.password);

    try {
      const response = await addUsers(formData);
      if (!response?.success) {
        setError(response!.message);
      } else if (response === undefined || response === null) {
        setError("Error creating users");
      } else {
        push("/auth/login");
      }
    } catch (error) {
      console.error("Register failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper className="shadow-md md:w-1/2 xl:w-1/4" label="Register Form" title="Register">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
          <div className="space-y-4">
            {error ? <AlertComponent message={error} typeError={"destructive"} title="Error" /> : null}
            <FormField
              control={form.control}
              name="namaUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="jhondoe..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="relative w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
            {loading && <SpinnerAnimate className="absolute right-2 top-1/3 h-4 w-4" />}
          </Button>
        </form>
        <div className="flex gap-2 justify-center mt-3">
          <span>Already have an account?</span>
          <Link href="/auth/login" className="text-blue-500 underline">
            Login
          </Link>
        </div>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
