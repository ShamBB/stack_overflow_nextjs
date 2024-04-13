"use server";

import { User } from "@/database/user.mode";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import { ITag, Tag } from "@/database/tag.model";
import { Question } from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Tag> = searchQuery
      ? {
          $or: [{ name: { $regex: new RegExp(searchQuery, "i") } }],
        }
      : {};

    let sortCriteria = {};
    switch (filter) {
      case "popular":
        sortCriteria = { questions: -1 };
        break;
      case "recent":
        sortCriteria = { createdOn: -1 };
        break;
      case "name":
        sortCriteria = { name: 1 };
        break;
      case "old":
        sortCriteria = { createdOn: 1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
    }

    connectToDatabase();

    const tags = await Tag.find(query).sort(sortCriteria);
    return tags;
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase(); // Make sure you're connected to the database

    const { tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          $or: [
            { title: { $regex: new RegExp(searchQuery, "i") } },
            { content: { $regex: new RegExp(searchQuery, "i") } },
          ],
        }
      : {};

    const questionByTag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        {
          path: "tags", // Further populate tags of each question
          model: Tag,
          select: "_id name",
        },
        {
          path: "author",
          model: User,
          select: "_id name picture clerkId",
        },
      ],
    });
    // Execute the query
    if (!questionByTag) {
      throw new Error("Question by tag not found");
    }
    return { questions: questionByTag.questions, tagName: questionByTag.name };
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

export async function topTags() {
  try {
    await connectToDatabase();
    const question = await Tag.aggregate([
      {
        $addFields: {
          totalQuestions: { $size: "$questions" },
          totalFollowers: { $size: "$followers" },
        },
      },
      { $sort: { totalQuestions: -1, totalFollowers: -1 } },
      { $limit: 5 },
      { $project: { _id: 1, name: 1, totalQuestions: 1 } },
    ]);
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
