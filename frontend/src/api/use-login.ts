import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";

import { loginSchema } from "@/schemas";
import { toast } from "sonner";

//login to user
export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (form: z.infer<typeof loginSchema>) => {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email: form.email,
          password: form.password,
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
      toast.success("login successfully");
      window.location.href = "/";
      window.location.reload();
    },
    onError: (err: any) => {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    },
  });

  return mutation;
};
