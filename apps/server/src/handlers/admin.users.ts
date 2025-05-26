import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { userPlans } from "@/db/schema/subscription";
import { adminProcedure } from "@/lib/orpc";
import { z } from "zod";
import { eq, like, or, desc, asc, count, sql, and, isNull } from "drizzle-orm";
import { ORPCError } from "@orpc/server";

export const userRoleSchema = z.enum(["user", "admin", "tester"]);

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const userSearchSchema = z
  .object({
    search: z.string().optional(),
    role: userRoleSchema.optional(),
    emailVerified: z.boolean().optional(),
    sortBy: z
      .enum(["createdAt", "updatedAt", "name", "email"])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .merge(paginationSchema);

 export type UserSearchSchema = z.infer<typeof userSearchSchema>;

export const userIdSchema = z.object({
  id: z.string().min(1),
});

export const updateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: userRoleSchema.optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().url().nullable().optional(),
});

// Get all users with advanced filtering, searching, and pagination
export const getAllUsersHandler = adminProcedure
  .input(userSearchSchema)
  .handler(async ({ input }) => {
    console.log(input);
    const { page, limit, search, role, emailVerified, sortBy, sortOrder } =
      input;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = [];

    if (search) {
      whereConditions.push(
        or(like(user.name, `%${search}%`), like(user.email, `%${search}%`))
      );
    }

    if (role) {
      whereConditions.push(eq(user.role, role));
    }

    if (emailVerified !== undefined) {
      whereConditions.push(eq(user.emailVerified, emailVerified));
    }

    // Build order by
    const orderByColumn = user[sortBy];
    const orderBy =
      sortOrder === "asc" ? asc(orderByColumn) : desc(orderByColumn);

    // Get total count for pagination
    const totalCountQuery = db.select({ count: count() }).from(user);

    if (whereConditions.length > 0) {
      totalCountQuery.where(
        sql`${whereConditions.reduce((acc, condition, i) =>
          i === 0 ? condition : sql`${acc} AND ${condition}`
        )}`
      );
    }

    const [{ count: totalCount }] = await totalCountQuery;

    // Get users with pagination and current plan
    let query = db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Current plan details
        currentPlan: {
          id: userPlans.id,
          planType: userPlans.planType,
          status: userPlans.status,
          startDate: userPlans.startDate,
          endDate: userPlans.endDate,
        },
      })
      .from(user)
      .leftJoin(
        userPlans,
        and(eq(user.id, userPlans.userId), eq(userPlans.status, "active"))
      )
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    if (whereConditions.length > 0) {
      // @ts-ignore
      query = query.where(
        sql`${whereConditions.reduce((acc, condition, i) =>
          i === 0 ? condition : sql`${acc} AND ${condition}`
        )}`
      );
    }

    const users = await query;

    // Transform the data to handle null plan cases
    const transformedUsers = users.map((user) => ({
      ...user,
      currentPlan: user?.currentPlan?.id
        ? user.currentPlan
        : {
            id: null,
            planType: "free" as "free" | "pro" | "enterprise",
            status: "active",
            startDate: null,
            endDate: null,
          },
    }));

    return {
      users: transformedUsers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page < Math.ceil(totalCount / limit),
        hasPrev: page > 1,
      },
    };
  });

// Get a single user by ID
export const getUserHandler = adminProcedure
  .input(userIdSchema)
  .handler(async ({ input }) => {
    const foundUser = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Current plan details
        currentPlan: {
          id: userPlans.id,
          planType: userPlans.planType,
          status: userPlans.status,
          startDate: userPlans.startDate,
          endDate: userPlans.endDate,
        },
      })
      .from(user)
      .leftJoin(
        userPlans,
        and(eq(user.id, userPlans.userId), eq(userPlans.status, "active"))
      )
      .where(eq(user.id, input.id))
      .limit(1);

    if (foundUser.length === 0) {
      throw new ORPCError("NOT_FOUND", {
        message: "User not found",
      });
    }

    const userData = foundUser[0];

    // Transform the data to handle null plan case
    return {
      ...userData,
      currentPlan: userData?.currentPlan?.id
        ? userData.currentPlan
        : {
            id: null,
            planType: "free" as "free" | "pro" | "enterprise",
            status: "active",
            startDate: null,
            endDate: null,
          },
    };
  });

// Update user information
export const updateUserHandler = adminProcedure
  .input(updateUserSchema)
  .handler(async ({ input }) => {
    const { id, ...updateData } = input;

    const existingUser = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (existingUser.length === 0) {
      throw new ORPCError("NOT_FOUND", {
        message: "User not found",
      });
    }

    if (updateData.email) {
      const emailExists = await db
        .select({ id: user.id })
        .from(user)
        .where(sql`${eq(user.email, updateData.email)} AND ${user.id} != ${id}`)
        .limit(1);

      if (emailExists.length > 0) {
        throw new ORPCError("CONFLICT", {
          message: "Email is already in use by another user",
        });
      }
    }

    const updatedUser = await db
      .update(user)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(user.id, id))
      .returning();

    return updatedUser[0];
  });

// Change user role
export const changeUserRoleHandler = adminProcedure
  .input(
    z.object({
      id: z.string().min(1),
      role: userRoleSchema,
    })
  )
  .handler(async ({ input }) => {
    const { id, role } = input;

    // Check if user exists
    const existingUser = await db
      .select({ id: user.id, role: user.role })
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (existingUser.length === 0) {
      throw new ORPCError("NOT_FOUND", {
        message: "User not found",
      });
    }

    // Update user role
    const updatedUser = await db
      .update(user)
      .set({
        role,
        updatedAt: new Date(),
      })
      .where(eq(user.id, id))
      .returning();

    return updatedUser[0];
  });

export const deleteUserHandler = adminProcedure
  .input(userIdSchema)
  .handler(async ({ input }) => {
    const { id } = input;

    const existingUser = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (existingUser.length === 0) {
      throw new ORPCError("NOT_FOUND", {
        message: "User not found",
      });
    }

    await db.delete(user).where(eq(user.id, id));

    return { success: true, message: "User deleted successfully" };
  });

// Get user statistics
export const getUserStatsHandler = adminProcedure.handler(async () => {
  const stats = await db
    .select({
      totalUsers: count(),
      totalAdmins: count(sql`CASE WHEN ${user.role} = 'admin' THEN 1 END`),
      totalTesters: count(sql`CASE WHEN ${user.role} = 'tester' THEN 1 END`),
      totalRegularUsers: count(sql`CASE WHEN ${user.role} = 'user' THEN 1 END`),
      verifiedUsers: count(
        sql`CASE WHEN ${user.emailVerified} = true THEN 1 END`
      ),
      unverifiedUsers: count(
        sql`CASE WHEN ${user.emailVerified} = false THEN 1 END`
      ),
    })
    .from(user);

  return stats[0];
});

// Bulk update users
export const bulkUpdateUsersHandler = adminProcedure
  .input(
    z.object({
      userIds: z.array(z.string()).min(1),
      updates: z.object({
        role: userRoleSchema.optional(),
        emailVerified: z.boolean().optional(),
      }),
    })
  )
  .handler(async ({ input }) => {
    const { userIds, updates } = input;

    if (Object.keys(updates).length === 0) {
      throw new ORPCError("BAD_REQUEST", {
        message: "No updates provided",
      });
    }

    const updatedUsers = await db
      .update(user)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(sql`${user.id} IN ${userIds}`)
      .returning();

    return {
      updatedCount: updatedUsers.length,
      users: updatedUsers,
    };
  });
