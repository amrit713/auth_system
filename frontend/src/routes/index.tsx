import { createFileRoute, redirect } from "@tanstack/react-router";
import { Todo } from "@/components/todo";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const isAuthenticated = useAuth();

    //if not auth redirect to login page
    if (!isAuthenticated) {
      // Redirect to login page
      window.location.href = "/login";
      throw new Error("Redirecting to login...");
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-200 flex items-center justify-center p-4">
      <Todo />
    </div>
  );
}
