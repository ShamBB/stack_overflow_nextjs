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
    connectToDatabase();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const tags = await Tag.find({}).sort({ createdAt: -1 });
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
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
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
