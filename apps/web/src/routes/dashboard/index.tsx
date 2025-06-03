import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Prettify } from "better-auth";
import { toast } from "sonner";

type Session = Prettify<{
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
}>;

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [isListingSessions, setIsListingSessions] = useState(false);
  const { data: currentSession, isPending } = authClient.useSession();
  const getAllSessions = async () => {
    try {
      setIsListingSessions(true);
      const { data, error } = await authClient.listSessions();
      if (error) throw error;
      setSessions(data);
    } catch (error) {
      toast.error("Error fetching sessions", {
        description: "Please try again later.",
      });
    } finally {
      setIsListingSessions(false);
    }
  };

  const navigate = Route.useNavigate();

  const privateData = useQuery(orpc.privateData.queryOptions());

  useEffect(() => {
    if (!currentSession && !isPending) {
      navigate({
        to: "/sign-in",
      });
    }
    getAllSessions();
  }, [currentSession, isPending, navigate]);

  if (isPending || privateData.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {currentSession?.user && (
        <div className="mb-6 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p>
            <strong>Name:</strong> {currentSession.user.name}
          </p>
          <p>
            <strong>Email:</strong> {currentSession.user.email}
          </p>
          {privateData.data?.user && (
            <div>
              <h3 className="text-lg font-medium mt-2 mb-1">
                Additional User Details:
              </h3>
              <div className="bg-gray-100 p-3 rounded text-sm">
                {Object.entries(privateData.data.user).map(([key, value]) => (
                  <p key={key}>
                    <strong className="capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </strong>{" "}
                    {typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : String(value)}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {isListingSessions && <p>Loading sessions...</p>}
      {sessions && sessions.length > 0 && (
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Active Sessions</h2>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="p-3 border rounded-md bg-gray-50"
              >
                <p>
                  <strong>Session ID:</strong> {session.id}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(session.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Expires At:</strong>{" "}
                  {new Date(session.expiresAt).toLocaleString()}
                </p>
                <p>
                  <strong>User Agent:</strong> {session.userAgent || "N/A"}
                </p>
                <p>
                  <strong>IP Address:</strong> {session.ipAddress || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {sessions === null && !isListingSessions && (
        <p>No session information available.</p>
      )}
    </div>
  );
}
