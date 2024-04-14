"use server";

import { IQuestion, Question } from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { Tag } from "@/database/tag.model";
import mongoose, { FilterQuery } from "mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import { User } from "@/database/user.mode";
import { revalidatePath } from "next/cache";
import { Answer } from "@/database/answer.model";
import { Interaction } from "@/database/interaction.model";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    // Construct the search query
    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          $or: [
            { title: { $regex: new RegExp(searchQuery, "i") } },
            { content: { $regex: new RegExp(searchQuery, "i") } },
          ],
        }
      : {};

    // Determine the sort criteria based on the filter
    let sortCriteria = {};
    switch (filter) {
      case "newest":
        sortCriteria = { createdAt: -1 };
        break;
      // case "recommended":
      //   sortCriteria = { createdAt: 1 }; // Sort by creation time, oldest first
      //   break;
      case "frequent":
        sortCriteria = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };

        break;
      default:
        sortCriteria = { createdAt: -1 };
    }

    await connectToDatabase(); // Connect to database

    const totalQuestions = await Question.countDocuments(query);

    // Execute the query with dynamic sorting
    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort(sortCriteria)
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize);

    const islastPage = totalQuestions <= page * pageSize;

    return { questions, islastPage };
  } catch (error) {
    console.error(error);
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
  await connectToDatabase();
  const session = await mongoose.startSession();

  try {
    const { questionId, path } = params;

    await session.startTransaction();

    // Include the session in each database operation
    await Question.deleteOne({ _id: questionId }).session(session);
    await Answer.deleteMany({ question: questionId }).session(session);
    await Interaction.deleteMany({ question: questionId }).session(session);
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } },
      { session } // Pass the session here
    );
    await User.updateMany(
      { saved: questionId },
      { $pull: { saved: questionId } },
      { session } // And here
    );

    await session.commitTransaction();

    revalidatePath(path); // Assuming this function call is not a part of the MongoDB operations and does not require a session
  } catch (error) {
    await session.abortTransaction();
    console.error(error); // It's a good practice to use console.error for logging errors
    throw error; // Rethrow the error if you want to handle it further up in the call stack
  } finally {
    session.endSession(); // Ensure the session is always ended to free up resources
  }
}

export async function editQuestion(params: EditQuestionParams) {
  await connectToDatabase();
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { questionId, title, content, tags, path } = params;

    // Find the question to ensure it exists
    const question = await Question.findById(questionId).session(session);
    if (!question) {
      throw new Error("Question not found");
    }

    // Step 1: Remove tag
    const allQuestionTag = await Tag.find({ questions: questionId }).session(
      session
    );
    for (const tagDocument of allQuestionTag) {
      const hasTag = tags.includes(tagDocument.name);
      if (!hasTag) {
        await Tag.updateOne(
          { _id: tagDocument._id },
          { $pull: { questions: questionId } },
          { session }
        );
      }
    }

    // Step 2: Update or create new tag
    const tagDocuments = [];
    for (const tagName of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tagName}$`, "i") } },
        {
          $setOnInsert: { name: tagName },
          $addToSet: { questions: questionId },
        },
        {
          new: true,
          upsert: true,
          session,
        }
      );
      tagDocuments.push(existingTag._id);
    }

    // Step 3: Update question with new tags
    // Here you might only need to set tags directly since you're synchronizing the tags array
    await Question.findByIdAndUpdate(
      questionId,
      { title, content, tags: tagDocuments },
      { session }
    );

    await session.commitTransaction();

    revalidatePath(path); // Assuming this is a non-database operation, related to Next.js or caching
  } catch (error) {
    await session.abortTransaction();
    console.error(error); // Use console.error for errors
    throw error; // Rethrowing the error might be necessary if you handle it further up the chain
  } finally {
    session.endSession();
  }
}

export async function getHotQuestions() {
  try {
    await connectToDatabase();
    const question = await Question.aggregate([
      {
        $addFields: {
          totalUpvotes: { $size: "$upvotes" },
          totalAnswers: { $size: "$answers" },
        },
      },
      {
        $sort: { views: -1, totalUpvotes: -1, totalAnswers: -1 },
      },
      {
        $limit: 5, // Limit to the top 5 records
      },
      {
        $project: { _id: 1, title: 1 }, // Only include the _id and title fields in the output
      },
    ]);
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
