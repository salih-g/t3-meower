import { clerkClient, type User } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({ take: 100 });

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
});
