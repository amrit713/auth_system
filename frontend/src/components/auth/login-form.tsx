import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";

import { loginSchema } from "@/schemas";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import { useLogin } from "@/api/use-login";
import { Loader } from "lucide-react";

export const LoginForm = () => {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      mutate(values);
    } catch (error) {}
  };

  return (
    <Card className="w-[450px] ">
      <CardContent>
        <CardHeader>
          <CardTitle className="text-center">Welcome back</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      placeholder={"user.doe@example.com"}
                      type={"email"}
                      disabled={isPending}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...field}
                      placeholder={"*******"}
                      type={"password"}
                      disabled={isPending}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type={"submit"} className={"w-full"} disabled={isPending}>
              {isPending ? (
                <Loader className="size-4 animate-spin " />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <CardFooter className={"flex justify-self-start "}>
          <p className="">Don't have an account? </p>
          <Button variant={"link"}>
            <Link to="/signup">Sign-up</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
