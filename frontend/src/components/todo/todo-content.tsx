import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetTasks } from "@/api/use-get-tasks";
import { useDeleteTask } from "@/api/use-delete-task";

interface TodoContentProps {
  toggleExpand: (id: string) => void;

  expandedTodo: string | null;
}

export const TodoContent = ({
  toggleExpand,
  expandedTodo,
}: TodoContentProps) => {
  //get all task
  const { data: tasks } = useGetTasks();

  //delete task
  const { mutate, isPending } = useDeleteTask();

  return (
    <AnimatePresence>
      {tasks?.data.tasks.map((todo: any) => (
        <motion.div
          key={todo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-50 rounded-md mb-2 overflow-hidden"
        >
          <div className="flex items-center gap-2 p-4">
            <span
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {todo.title}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleExpand(todo.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedTodo === todo.id ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={isPending}
              onClick={() => mutate(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
            </Button>
          </div>
          {expandedTodo === todo.id && todo.description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-4 text-sm text-gray-600"
            >
              {todo.description}
            </motion.div>
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
