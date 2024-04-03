import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

interface Tag {
  _id: string; // Use specific type if known, e.g., string or ObjectId
  name: string;
}

const page = async ({ params }: ParamsProps) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return null;
  }

  const mongooUser = await getUserById({ userId: clerkId });

  if (!mongooUser) {
    return null;
  }

  if (result.author._id.toString() !== mongooUser._id.toString()) {
    return null;
  }

  const tagNameArray: string[] = result.tags.map((tag: Tag) => tag.name);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question
          mongoseUserId={JSON.stringify(mongooUser._id)}
          type="edit"
          title={result.title}
          explanation={result.content}
          tags={tagNameArray}
          questionId={params.id}
          clerkId={clerkId}
        />
      </div>
    </>
  );
};

export default page;
