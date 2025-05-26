import Loader from "@/components/loader";
import AdminPage from "@/components/admin";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data } = await authClient.getSession();
    if (!data?.session) {
      return redirect({
        to: "/sign-in",
        params: { callbackURL: "/admin/" },
      });
    }
    if (data.user.role !== "admin") {
      return redirect({ to: "/dashboard" });
    }
  },
  pendingComponent: Loader,
});

function RouteComponent() {
  return <AdminPage />;
}
