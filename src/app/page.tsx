import AuthButtons from "./_components/auth-buttons";
import Feed from "./_components/posts";

export default async function Home() {
  return (
    <>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <AuthButtons />
          <Feed />
        </div>
      </main>
    </>
  );
}
