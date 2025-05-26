import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Users,
  Settings,
  BarChart3,
  Shield,
  Edit,
  Trash2,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Crown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { UserSearchSchema } from "@/types";
type UserRole = "user" | "admin" | "tester";
type PlanType = "free" | "pro" | "enterprise";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  currentPlan: {
    id: string | null;
    planType: PlanType;
    status: string;
    startDate: Date | null;
    endDate: Date | null;
  };
}

interface FeatureLimit {
  id: string;
  planType: PlanType;
  featureKey: string;
  limitType: "count" | "daily" | "monthly" | "concurrent";
  limitValue: number;
  resetPeriod: "daily" | "monthly" | "never" | null;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [userFilters, setUserFilters] = useState<UserSearchSchema>({
    search: "",
    role: undefined,
    emailVerified: undefined as boolean | undefined,
    page: 1,
    limit: 10,
    sortBy: "createdAt" as "createdAt" | "updatedAt" | "name" | "email",
    sortOrder: "desc" as "asc" | "desc",
  });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingFeatureLimit, setEditingFeatureLimit] =
    useState<FeatureLimit | null>(null);

  const queryClient = useQueryClient();

  // Queries
  const usersQuery = useQuery(
    orpc.admin.getAllUsers.queryOptions({
      input: userFilters,
    })
  );

  const userStatsQuery = useQuery(
    orpc.admin.getUserStats.queryOptions({
      input: undefined,
    })
  );

  const featureLimitsQuery = useQuery(
    orpc.admin.getFeatureLimits.queryOptions({
      input: undefined,
    })
  );

  // Mutations
  const updateUserMutation = useMutation(
    orpc.admin.updateUser.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "getAllUsers"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "getUserStats"] });
        toast.success("User updated successfully");
        setEditingUser(null);
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update user");
      },
    })
  );

  const deleteUserMutation = useMutation(
    orpc.admin.deleteUser.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "getAllUsers"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "getUserStats"] });
        toast.success("User deleted successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to delete user");
      },
    })
  );

  const changeUserRoleMutation = useMutation(
    orpc.admin.changeUserRole.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "getAllUsers"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "getUserStats"] });
        toast.success("User role updated successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update user role");
      },
    })
  );

  const upgradeUserPlanMutation = useMutation(
    orpc.admin.upgradeUserPlan.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "getAllUsers"] });
        toast.success("User plan updated successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update user plan");
      },
    })
  );

  const bulkUpdateUsersMutation = useMutation(
    orpc.admin.bulkUpdateUsers.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "getAllUsers"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "getUserStats"] });
        toast.success("Users updated successfully");
        setSelectedUsers([]);
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update users");
      },
    })
  );

  const updateFeatureLimitMutation = useMutation(
    orpc.admin.updateFeatureLimit.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["admin", "getFeatureLimits"],
        });
        toast.success("Feature limit updated successfully");
        setEditingFeatureLimit(null);
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update feature limit");
      },
    })
  );

  const handleUserSearch = (value: string) => {
    setUserFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleUserFilter = (key: string, value: any) => {
    setUserFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setUserFilters((prev) => ({ ...prev, page }));
  };

  const handleUserSelect = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && usersQuery.data?.users) {
      setSelectedUsers(usersQuery.data.users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "tester":
        return "secondary";
      default:
        return "default";
    }
  };

  const getPlanBadgeVariant = (planType: PlanType) => {
    switch (planType) {
      case "enterprise":
        return "destructive";
      case "pro":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, plans, and system settings
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Feature Limits
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or email..."
                      value={userFilters.search}
                      onChange={(e) => handleUserSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={userFilters.role || "all"}
                    onValueChange={(value) =>
                      handleUserFilter("role", value === "all" ? "" : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All roles</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="tester">Tester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Email Status</Label>
                  <Select
                    value={
                      userFilters.emailVerified === undefined
                        ? "all"
                        : userFilters.emailVerified.toString()
                    }
                    onValueChange={(value) =>
                      handleUserFilter(
                        "emailVerified",
                        value === "all" ? undefined : value === "true"
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="true">Verified</SelectItem>
                      <SelectItem value="false">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select
                    value={userFilters.sortBy}
                    onValueChange={(value) => handleUserFilter("sortBy", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="createdAt">Created Date</SelectItem>
                      <SelectItem value="updatedAt">Updated Date</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {selectedUsers.length} user(s) selected
                  </span>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Bulk Update Role
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Bulk Update User Roles</DialogTitle>
                          <DialogDescription>
                            Update the role for {selectedUsers.length} selected
                            user(s).
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>New Role</Label>
                            <Select
                              onValueChange={(role) => {
                                bulkUpdateUsersMutation.mutate({
                                  userIds: selectedUsers,
                                  updates: { role: role as UserRole },
                                });
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="tester">Tester</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        bulkUpdateUsersMutation.mutate({
                          userIds: selectedUsers,
                          updates: { emailVerified: true },
                        });
                      }}
                    >
                      Verify Emails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              {usersQuery.isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={
                              selectedUsers.length ===
                                usersQuery.data?.users?.length &&
                              usersQuery.data?.users?.length > 0
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersQuery.data?.users?.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={(checked) =>
                                handleUserSelect(user.id, checked as boolean)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getRoleBadgeVariant(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getPlanBadgeVariant(
                                user.currentPlan.planType
                              )}
                            >
                              {user.currentPlan.planType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {user.emailVerified ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                              <span className="text-sm">
                                {user.emailVerified ? "Verified" : "Unverified"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => setEditingUser(user)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    const newRole =
                                      user.role === "admin" ? "user" : "admin";
                                    changeUserRoleMutation.mutate({
                                      id: user.id,
                                      role: newRole,
                                    });
                                  }}
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  {user.role === "admin"
                                    ? "Remove Admin"
                                    : "Make Admin"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    const newPlan =
                                      user.currentPlan.planType === "pro"
                                        ? "free"
                                        : "pro";
                                    upgradeUserPlanMutation.mutate({
                                      userId: user.id,
                                      planType: newPlan,
                                    });
                                  }}
                                >
                                  <Crown className="h-4 w-4 mr-2" />
                                  {user.currentPlan.planType === "pro"
                                    ? "Downgrade to Free"
                                    : "Upgrade to Pro"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete User
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete{" "}
                                        {user.name}? This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          deleteUserMutation.mutate({
                                            id: user.id,
                                          })
                                        }
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {usersQuery.data?.pagination && (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Showing{" "}
                        {(usersQuery.data.pagination.page - 1) *
                          usersQuery.data.pagination.limit +
                          1}{" "}
                        to{" "}
                        {Math.min(
                          usersQuery.data.pagination.page *
                            usersQuery.data.pagination.limit,
                          usersQuery.data.pagination.totalCount
                        )}{" "}
                        of {usersQuery.data.pagination.totalCount} users
                      </div>
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                handlePageChange(
                                  usersQuery.data!.pagination.page - 1
                                )
                              }
                              className={
                                !usersQuery.data.pagination.hasPrev
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                          {Array.from(
                            {
                              length: Math.min(
                                5,
                                usersQuery.data.pagination.totalPages
                              ),
                            },
                            (_, i) => {
                              const page = i + 1;
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => handlePageChange(page)}
                                    isActive={
                                      page === usersQuery.data!.pagination.page
                                    }
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            }
                          )}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                handlePageChange(
                                  usersQuery.data!.pagination.page + 1
                                )
                              }
                              className={
                                !usersQuery.data.pagination.hasNext
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userStatsQuery.data && (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStatsQuery.data.totalUsers}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Admins
                    </CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStatsQuery.data.totalAdmins}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Testers
                    </CardTitle>
                    <UserPlus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStatsQuery.data.totalTesters}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Regular Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStatsQuery.data.totalRegularUsers}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Verified Users
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStatsQuery.data.verifiedUsers}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Unverified Users
                    </CardTitle>
                    <XCircle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStatsQuery.data.unverifiedUsers}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>

        {/* Feature Limits Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Limits</CardTitle>
              <CardDescription>
                Manage feature limits for different plan types
              </CardDescription>
            </CardHeader>
            <CardContent>
              {featureLimitsQuery.isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Feature</TableHead>
                      <TableHead>Limit</TableHead>
                      <TableHead>Enabled</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featureLimitsQuery.data?.map((limit) => (
                      <TableRow key={limit.id}>
                        <TableCell>
                          <Badge variant={getPlanBadgeVariant(limit.planType)}>
                            {limit.planType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {limit.featureKey}
                        </TableCell>
                        <TableCell>{limit.limitValue}</TableCell>
                        <TableCell>
                          <Switch checked={limit.enabled} disabled />
                        </TableCell>
                        <TableCell>
                          {new Date(limit.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingFeatureLimit(limit)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and settings.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateUserMutation.mutate({
                  id: editingUser.id,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  role: formData.get("role") as UserRole,
                  emailVerified: formData.get("emailVerified") === "true",
                });
              }}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingUser.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingUser.email}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" defaultValue={editingUser.role}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="tester">Tester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailVerified"
                    name="emailVerified"
                    value="true"
                    defaultChecked={editingUser.emailVerified}
                  />
                  <Label htmlFor="emailVerified">Email Verified</Label>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateUserMutation.isPending}>
                  {updateUserMutation.isPending ? "Updating..." : "Update User"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Feature Limit Dialog */}
      <Dialog
        open={!!editingFeatureLimit}
        onOpenChange={() => setEditingFeatureLimit(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Feature Limit</DialogTitle>
            <DialogDescription>
              Update feature limit settings for {editingFeatureLimit?.planType}{" "}
              plan.
            </DialogDescription>
          </DialogHeader>
          {editingFeatureLimit && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateFeatureLimitMutation.mutate({
                  planType: editingFeatureLimit.planType,
                  featureKey: editingFeatureLimit.featureKey,
                  limitValue: parseInt(formData.get("limitValue") as string),
                  enabled: formData.get("enabled") === "true",
                });
              }}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Plan Type</Label>
                  <Input value={editingFeatureLimit.planType} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Feature Key</Label>
                  <Input value={editingFeatureLimit.featureKey} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limitValue">Limit Value</Label>
                  <Input
                    id="limitValue"
                    name="limitValue"
                    type="number"
                    defaultValue={editingFeatureLimit.limitValue}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enabled"
                    name="enabled"
                    value="true"
                    defaultChecked={editingFeatureLimit.enabled}
                  />
                  <Label htmlFor="enabled">Enabled</Label>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingFeatureLimit(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateFeatureLimitMutation.isPending}
                >
                  {updateFeatureLimitMutation.isPending
                    ? "Updating..."
                    : "Update Limit"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
