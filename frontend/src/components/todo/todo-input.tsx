import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { taskSchema } from "@/schemas";
import { useCreateTask } from "@/api/use-create-task";

export const TodoInput = () => {
  const { mutate, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof taskSchema>) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input
                {...field}
                placeholder={"eg: Meeting, event, gym etc"}
                disabled={isPending}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...field}
                placeholder={"eg: description "}
                disabled={isPending}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader className="size-4 animate-spin" /> : "Add Todo"}
        </Button>
      </form>
    </Form>
  );
};
