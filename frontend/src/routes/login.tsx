import { LoginForm } from "@/components/auth/login-form";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { useAuth } from "@/hooks/use-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const isAuthenticated = useAuth();

    if (isAuthenticated) {
      // Redirect to login page
      window.location.href = "/";
      throw new Error("Redirecting to login...");
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MaxWidthWrapper className=" h-[calc(100vh-5.1rem)] flex items-center justify-center">
      <LoginForm />
    </MaxWidthWrapper>
  );
}
