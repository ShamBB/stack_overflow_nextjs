import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) redirect("/sign-in");
  const user = await getUserById({ userId: clerkId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <Profile user={JSON.stringify(user)} clerkId={clerkId} />
    </>
  );
};

export default page;
