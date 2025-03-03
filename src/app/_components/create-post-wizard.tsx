import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { useState } from "react";
import toast from "react-hot-toast";

const CreatePostWizard = () => {
  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isPending: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      toast.success("Post created successfully");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errMessage = e.data?.zodError?.fieldErrors.content;
      if (errMessage?.[0]) {
        toast.error(errMessage[0]);
        return;
      } else {
        toast.error("Failed to create post");
      }
    },
  });

  const [input, setInput] = useState<string>("");

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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
      />
      <button onClick={() => mutate({ content: input })}>Post</button>
    </div>
  );
};

export default CreatePostWizard;
