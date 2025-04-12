import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";

import { signupSchema } from "@/schemas";
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
import { useSignup } from "@/api/use-signup";
import { Loader } from "lucide-react";

export const SignupForm = () => {
  const { mutate, isPending } = useSignup();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Card className="w-[450px] ">
      <CardContent>
        <CardHeader>
          <CardTitle className="text-center">Create an account</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input
                      {...field}
                      placeholder={"eg: John Wick"}
                      disabled={isPending}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                <Loader className="size-4 animate-spin" />
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>
        <CardFooter className={"flex justify-self-start "}>
          <p className="">Already have an account? </p>
          <Button variant={"link"}>
            <Link to="/login">Login</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
