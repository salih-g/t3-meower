import { HydrateClient } from "~/trpc/server";
import { AuthButtons } from "./_components/auth-buttons";
import Posts from "./_components/posts";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <AuthButtons />
          <Posts />
        </div>
      </main>
    </HydrateClient>
  );
}
