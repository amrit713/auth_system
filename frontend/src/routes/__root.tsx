import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { handleLogout } from "@/lib/logout";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => {
    const authenticated = useAuth();

    return (
      <>
        <div className="h-[5rem]">
          <MaxWidthWrapper className="flex justify-between items-center">
            <div className="">
              <Link to="/" className="[&.active]:font-bold  font-semibold">
                TASK_APP
              </Link>{" "}
            </div>
            <div className="flex gap-4 ">
              {authenticated && (
                <Button className="" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </MaxWidthWrapper>
        </div>
        <hr />

        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
