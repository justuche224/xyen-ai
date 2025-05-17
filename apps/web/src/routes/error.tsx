import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/error")({
  validateSearch: z.object({
    error: z.string().optional(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { error } = Route.useSearch();
  return <div>{error}</div>;
}
