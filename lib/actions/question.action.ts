"use server";

import { IQuestion, Question } from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { Tag } from "@/database/tag.model";
import mongoose from "mongoose";

export async function createQuestion(params: any) {
  // make an async
  await connectToDatabase();
  const session = await mongoose.startSession();

  try {
    const { title, content, tags, author } = params;

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
    session.endSession();
    // const questions = await Question.find().populate("tags");
    // console.log(JSON.stringify(questions, null, 2));
    // const result = await Question.findByIdAndUpdate(question[0]._id, {
    //   $push: { tags: { $each: tagDocuments } },
    // });
    // console.log(JSON.stringify(question[0]._id));
    // const result = await Question.findOne({
    //   _id: JSON.stringify(question[0]._id),
    // });

    // console.log(result, "result");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    throw error;
  }
}

// insert tag, check if tag exists, if not create tag, then insert question
