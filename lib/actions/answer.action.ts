"use server";

import { Question } from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import console from "console";
import { IAnswer, Answer } from "@/database/answer.model";
import { Interaction } from "@/database/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
  // make an async
  await connectToDatabase();
  const session = await mongoose.startSession();

  try {
    const { content, author, question, path } = params;

    await session.startTransaction();
    const answer: IAnswer[] = await Answer.create(
      [
        {
          author,
          content,
          question,
        },
      ],
      { session }
    );

    await Question.findByIdAndUpdate(
      question,
      {
        $push: { answers: answer[0]._id },
      },
      {
        session,
      }
    );

    await answer[0].save();

    await session.commitTransaction();

    revalidatePath(path);
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  } finally {
    session.endSession();
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });
    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $push: { downvotes: userId },
        $pull: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  // make an async
  await connectToDatabase();
  const session = await mongoose.startSession();

  try {
    const { answerId, path } = params;

    await session.startTransaction();

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("answer not found");
    }

    await Answer.deleteOne({ _id: answerId });
    await Interaction.deleteMany({ answer: answerId });
    await Question.updateMany(
      { answers: answerId },
      { $pull: { answers: answerId } }
    );

    await session.commitTransaction();

    revalidatePath(path);
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  } finally {
    session.endSession();
  }
}
