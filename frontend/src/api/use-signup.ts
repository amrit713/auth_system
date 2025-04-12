import { useMutation } from "@tanstack/react-query";

import { z } from "zod";
import axios from "axios";

import { signupSchema } from "@/schemas";
import { toast } from "sonner";

export const useSignup = () => {
  const mutation = useMutation({
    mutationFn: async (form: z.infer<typeof signupSchema>) => {
      const { data } = await axios.post(
        "/api/auth/signup",
        {
          email: form.email,
          password: form.password,
          name,
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
      toast.success("Sign up successfull");
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
