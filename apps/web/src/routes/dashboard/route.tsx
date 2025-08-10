import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header";
export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen w-full relative">
        {/* Emerald Void */}
        <div
          className="fixed inset-0 z-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #000000 40%, #072607 100%)",
          }}
        />
        <div
          className="fixed inset-0 z-0 dark:hidden"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #f0fff0 40%, #b8eac6 100%)"
              //  "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #d3f5d3 100%)",
          }}
        />
        {/* Your Content/Components */}
        <div className="relative min-h-screen">
          <Header />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
