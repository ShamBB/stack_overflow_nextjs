"use server";

import { IQuestion, Question } from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { Tag } from "@/database/tag.model";
import mongoose from "mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import { User } from "@/database/user.mode";
import { revalidatePath } from "next/cache";
import console from "console";
import { Answer } from "@/database/answer.model";
import { Interaction } from "@/database/interaction.model";

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

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  // make an async
  await connectToDatabase();
  const session = await mongoose.startSession();

  try {
    const { questionId, path } = params;

    await session.startTransaction();

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );
    await User.updateMany(
      { saved: questionId },
      { $pull: { saved: questionId } }
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
