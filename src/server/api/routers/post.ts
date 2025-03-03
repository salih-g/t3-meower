import { clerkClient, type User } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
  };
};

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const client = await clerkClient();

    const users = await client.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100,
    });
    const filteredUsers = users.data.map(filterUserForClient);

    return posts.map((post) => {
      const author = filteredUsers.find((user) => user.id === post.authorId);
      if (!author)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Author not found for post ${post.id}`,
        });

      return {
        post,
        author,
      };
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser?.id;
      const { success } = await ratelimit.limit(authorId);

      if (!success)
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "You are posting too fast",
        });

      const post = await ctx.db.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });

      return post;
    }),
});
