import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navbar06 } from "@/components/ui/shadcn-io/navbar-06";

export const Route = createFileRoute("/_pathlessLayout")({
  component: PathlessLayoutComponent,
});

function PathlessLayoutComponent() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen w-full relative">
        <div
          className="absolute inset-0 z-[-1] dark:hidden"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
            backgroundSize: "20px 30px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-[-1] hidden dark:block"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
            backgroundSize: "20px 30px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <Navbar06
          onNavItemClick={(link) => {
            navigate({
              to: link,
            });
          }}
        />
        <Outlet />
      </div>
    </>
  );
}
