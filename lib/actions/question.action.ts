"use server";

import { IQuestion, Question } from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { Tag } from "@/database/tag.model";
import mongoose from "mongoose";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "./shared.types";
import { User } from "@/database/user.mode";
import { revalidatePath } from "next/cache";
import console from "console";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find()
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  // make an async
  await connectToDatabase();
  const session = await mongoose.startSession();

  try {
    const { title, content, tags, author, path } = params;

    await session.startTransaction();

    const question: IQuestion[] = await Question.create(
      [
        {
          title,
          content,
          author,
        },
      ],
      { session }
    );

    const tagDocuments = [];
    for (const tagId of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tagId}$`, "i") } },
        {
          $setOnInsert: { name: tagId },
          $push: { questions: question[0]._id },
        },
        {
          new: true,
          upsert: true,
          session,
        }
      );

      tagDocuments.push(existingTag._id);
    }
    question[0].tags = tagDocuments;

    await question[0].save();

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

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const question = await Question.findById(params.questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
