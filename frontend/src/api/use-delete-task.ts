import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

//delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const muatation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/tasks/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);

      return data;
    },
    onSuccess: (ctx) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      console.log(ctx);
      toast.success(ctx.data.data.message);
    },
    onError: (err: any) => {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    },
  });

  return muatation;
};
