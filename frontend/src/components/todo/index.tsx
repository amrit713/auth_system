import { useState } from "react";

import { TodoInput } from "./todo-input";
import { TodoContent } from "./todo-content";

export interface TodoProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export function Todo() {
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);

  //function to expand task and reveal description
  const toggleExpand = (id: string) => {
    setExpandedTodo(expandedTodo === id ? null : id);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Todo List
        </h1>
        <TodoInput />
        <TodoContent toggleExpand={toggleExpand} expandedTodo={expandedTodo} />
        <p className="text-sm text-gray-500 mt-4">remaining</p>
      </div>
    </div>
  );
}
