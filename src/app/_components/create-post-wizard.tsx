import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.imageUrl}
        alt="Profile image"
        width={32}
        height={32}
        className="rounded-full"
      />
      <input
        placeholder="Type something!"
        type="text"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

export default CreatePostWizard;
