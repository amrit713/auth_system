import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";
import axios from "axios";

import { taskSchema } from "@/schemas";
import { toast } from "sonner";

//use to create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (json: z.infer<typeof taskSchema>) => {
      const { data } = await axios.post(
        "/api/tasks",
        {
          title: json.title,
          description: json.description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    },
    onSuccess: (ctx) => {
      console.log(ctx);
      toast.success("task created");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: any) => {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    },
  });

  return mutation;
};
