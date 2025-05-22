import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header";
import Pattern from "@/components/Pattern";
export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
    <Pattern/>
      <div className="relative min-h-screen">
        <Header />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
