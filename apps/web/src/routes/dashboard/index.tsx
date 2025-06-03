import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Prettify } from "better-auth";
import { toast } from "sonner";
import { User, Calendar, Clock, Globe, Shield, Monitor, MapPin, RefreshCw, LogOut, Trash2, Moon, Sun } from "lucide-react";

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
  const [revokingSessions, setRevokingSessions] = useState<Set<string>>(new Set());
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const { data: currentSession, isPending } = authClient.useSession();
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newDarkMode.toString());
    }
  };

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

  const revokeSession = async (sessionToken: string, sessionId: string) => {
    try {
      setRevokingSessions(prev => new Set(prev).add(sessionId));
      const { error } = await authClient.revokeSession({
        token: sessionToken
      });
      
      if (error) throw error;
      
      // Remove the session from local state
      setSessions(prev => prev ? prev.filter(s => s.id !== sessionId) : null);
      toast.success("Session revoked successfully");
    } catch (error) {
      toast.error("Error revoking session", {
        description: "Please try again later.",
      });
    } finally {
      setRevokingSessions(prev => {
        const newSet = new Set(prev);
        newSet.delete(sessionId);
        return newSet;
      });
    }
  };

  const navigate = Route.useNavigate();
  const privateData = useQuery(orpc.privateData.queryOptions());

  const signOut = async () => {
    try {
      await authClient.signOut();
      navigate({ to: "/sign-in" });
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const formatUserAgent = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown Browser';
  };

  const getSessionStatus = (expiresAt: Date) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const hoursUntilExpiry = Math.floor((expires.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (hoursUntilExpiry <= 0) return { 
      status: 'Expired', 
      color: darkMode ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50' 
    };
    if (hoursUntilExpiry <= 24) return { 
      status: 'Expires Soon', 
      color: darkMode ? 'text-yellow-400 bg-yellow-900/30' : 'text-yellow-600 bg-yellow-50' 
    };
    return { 
      status: 'Active', 
      color: darkMode ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-50' 
    };
  };

  useEffect(() => {
    if (!currentSession && !isPending) {
      navigate({ to: "/sign-in" });
    }
    getAllSessions();
  }, [currentSession, isPending, navigate]);

  if (isPending || privateData.isPending) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="flex items-center space-x-2 text-gray-600">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }

  const themeClasses = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    headerBg: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    text: darkMode ? 'text-gray-100' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    gradientFrom: darkMode ? 'from-blue-900/50' : 'from-blue-50',
    gradientTo: darkMode ? 'to-indigo-900/50' : 'to-indigo-50',
    gradientFromGreen: darkMode ? 'from-green-900/50' : 'from-green-50',
    gradientToGreen: darkMode ? 'to-emerald-900/50' : 'to-emerald-50',
    accentBg: darkMode ? 'bg-gray-700' : 'bg-gray-50',
    buttonBg: darkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : 'bg-white hover:bg-gray-50 border-gray-300',
    buttonDanger: darkMode ? 'bg-red-900/30 hover:bg-red-900/50 border-red-700 text-red-400' : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600',
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} mt-12`}>
      {/* Header */}
      <div className={`${themeClasses.cardBg} shadow-sm border-b ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className={`text-3xl font-bold ${themeClasses.text}`}>Dashboard</h1>
              <p className={`${themeClasses.textSecondary} mt-1`}>
                Welcome back, {currentSession?.user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-md ${themeClasses.buttonBg} border transition-colors`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={signOut}
                className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors ${themeClasses.buttonBg} ${themeClasses.textSecondary} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {/* User Information Card */}
          {currentSession?.user && (
            <div className={`${themeClasses.cardBg} rounded-lg shadow-sm border ${themeClasses.border} overflow-hidden`}>
              <div className={`px-6 py-4 bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} border-b ${themeClasses.border}`}>
                <div className="flex items-center">
                  <div className={`p-2 ${darkMode ? 'bg-blue-800/50' : 'bg-blue-100'} rounded-lg`}>
                    <User className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h2 className={`ml-3 text-xl font-semibold ${themeClasses.text}`}>Profile Information</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textMuted}`}>Full Name</label>
                      <p className={`text-lg ${themeClasses.text} mt-1`}>{currentSession.user.name}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textMuted}`}>Email Address</label>
                      <p className={`text-lg ${themeClasses.text} mt-1`}>{currentSession.user.email}</p>
                    </div>
                  </div>

                  {privateData.data?.user && (
                    <div className={`${themeClasses.accentBg} rounded-lg p-4`}>
                      <h3 className={`text-lg font-medium ${themeClasses.text} mb-3 flex items-center`}>
                        <Shield className={`w-5 h-5 mr-2 ${themeClasses.textSecondary}`} />
                        Account Details
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(privateData.data.user).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className={`text-sm font-medium ${themeClasses.textSecondary} capitalize`}>
                              {key.replace(/([A-Z])/g, " $1")}:
                            </span>
                            <span className={`text-sm ${themeClasses.text}`}>
                              {key === 'emailVerified' ? (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  value ? (darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800') 
                                        : (darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800')
                                }`}>
                                  {value ? 'Verified' : 'Not Verified'}
                                </span>
                              ) : key.includes('createdAt') || key.includes('updatedAt') ? (
                                new Date(String(value)).toLocaleDateString()
                              ) : typeof value === "boolean" ? (
                                value ? "Yes" : "No"
                              ) : (
                                String(value)
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Active Sessions Card */}
          <div className={`${themeClasses.cardBg} rounded-lg shadow-sm border ${themeClasses.border} overflow-hidden`}>
            <div className={`px-6 py-4 bg-gradient-to-r ${themeClasses.gradientFromGreen} ${themeClasses.gradientToGreen} border-b ${themeClasses.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 ${darkMode ? 'bg-green-800/50' : 'bg-green-100'} rounded-lg`}>
                    <Monitor className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <h2 className={`ml-3 text-xl font-semibold ${themeClasses.text}`}>Active Sessions</h2>
                </div>
                <button
                  onClick={getAllSessions}
                  disabled={isListingSessions}
                  className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 ${themeClasses.buttonBg} ${themeClasses.textSecondary}`}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isListingSessions ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            <div className="p-6">
              {isListingSessions ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className={`w-6 h-6 animate-spin ${themeClasses.textMuted} mr-2`} />
                  <span className={themeClasses.textSecondary}>Loading sessions...</span>
                </div>
              ) : sessions && sessions.length > 0 ? (
                <div className="grid gap-4">
                  {sessions.map((session, index) => {
                    const sessionStatus = getSessionStatus(session.expiresAt);
                    const isCurrentSession = session.id === currentSession?.session?.id;
                    const isRevoking = revokingSessions.has(session.id);
                    
                    return (
                      <div
                        key={session.id}
                        className={`border rounded-lg p-4 transition-all hover:shadow-md ${themeClasses.border} ${
                          isCurrentSession 
                            ? (darkMode ? 'ring-2 ring-blue-500 bg-blue-900/20' : 'ring-2 ring-blue-500 bg-blue-50')
                            : themeClasses.accentBg
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${themeClasses.text}`}>
                              Session {index + 1}
                            </span>
                            {isCurrentSession && (
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                              }`}>
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sessionStatus.color}`}>
                              {sessionStatus.status}
                            </span>
                            {!isCurrentSession && (
                              <button
                                onClick={() => revokeSession(session.token, session.id)}
                                disabled={isRevoking}
                                className={`p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 ${themeClasses.buttonDanger}`}
                                title="Revoke Session"
                              >
                                {isRevoking ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className={`flex items-center ${themeClasses.textSecondary}`}>
                              <Calendar className="w-4 h-4 mr-2" />
                              <span className="font-medium">Created:</span>
                              <span className="ml-2">{new Date(session.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className={`flex items-center ${themeClasses.textSecondary}`}>
                              <Clock className="w-4 h-4 mr-2" />
                              <span className="font-medium">Expires:</span>
                              <span className="ml-2">{new Date(session.expiresAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className={`flex items-center ${themeClasses.textSecondary}`}>
                              <Globe className="w-4 h-4 mr-2" />
                              <span className="font-medium">Browser:</span>
                              <span className="ml-2">{session.userAgent ? formatUserAgent(session.userAgent) : "Unknown"}</span>
                            </div>
                            <div className={`flex items-center ${themeClasses.textSecondary}`}>
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="font-medium">IP Address:</span>
                              <span className="ml-2">{session.ipAddress || "Not available"}</span>
                            </div>
                          </div>
                        </div>

                        <div className={`mt-3 pt-3 border-t ${themeClasses.border}`}>
                          <p className={`text-xs ${themeClasses.textMuted} font-mono truncate`}>
                            ID: {session.id}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Monitor className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-4`} />
                  <p className={themeClasses.textMuted}>No active sessions found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}