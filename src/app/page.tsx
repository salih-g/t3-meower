import { api, HydrateClient } from "~/trpc/server";
import { AuthButtons } from "./_components/auth-buttons";

export default async function Home() {
  const posts = await api.posts.getAll();

  return (
    <HydrateClient>
      <main>
        <AuthButtons />
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </HydrateClient>
  );
}
