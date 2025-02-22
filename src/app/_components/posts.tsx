"use client";

import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { type RouterOutputs, api } from "~/trpc/react";
import { LoadingOverlay } from "./loading";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.imageUrl}
        alt={`${author.fullName}'s profile image`}
        width={32}
        height={32}
        className="h-8 w-8 rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <span>
            {author.fullName}{" "}
            <span className="font-thin">
              {` · ${dayjs(post.createdAt).fromNow()}`}
            </span>
          </span>
        </div>
        <span className="">{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data: posts, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <LoadingOverlay />;

  if (!posts) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {posts.map((postWithUser) => (
        <PostView key={postWithUser.post.id} {...postWithUser} />
      ))}
    </div>
  );
};

export default Feed;
