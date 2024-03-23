"use server";

import { Question } from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import console from "console";
import { IAnswer, Answer } from "@/database/answer.model";

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
