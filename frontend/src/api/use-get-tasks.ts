import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//get all tasks
export const useGetTasks = () => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tasks", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    },
  });

  return query;
};
