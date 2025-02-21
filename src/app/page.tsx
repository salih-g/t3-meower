import { HydrateClient } from "~/trpc/server";
import { AuthButtons } from "./_components/auth-buttons";

export default function Home() {
  return (
    <HydrateClient>
      <main>
        <AuthButtons />
      </main>
    </HydrateClient>
  );
}
