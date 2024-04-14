"use server";

import { User } from "@/database/user.mode";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import console, { error } from "console";
import { Question } from "@/database/question.model";
import { Tag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import { Answer } from "@/database/answer.model";
import { clerkClient } from "@clerk/nextjs";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("user not found");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof User> = searchQuery
      ? {
          $or: [
            { name: { $regex: new RegExp(searchQuery, "i") } },
            { username: { $regex: new RegExp(searchQuery, "i") } },
          ],
        }
      : {};

    let sortCriteria = {};
    switch (filter) {
      case "top_contributors":
        sortCriteria = { reputation: 1 }; // Sort by creation time, newest first
        break;
      case "new_users":
        sortCriteria = { joinedAt: -1 };
        break;
      case "old_users":
        sortCriteria = { joinedAt: 1 };
        break;

      default:
        sortCriteria = { createdAt: -1 }; // Default sorting
    }

    connectToDatabase();
    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
      .sort(sortCriteria)
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize);

    const islastPage = totalUsers <= page * pageSize;
    return { users, islastPage };
  } catch (error) {
    console.log(error);
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw error("User not found");
    }

    if (user.saved.includes(questionId)) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase(); // Make sure you're connected to the database

    const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          $or: [
            { title: { $regex: new RegExp(searchQuery, "i") } },
            { content: { $regex: new RegExp(searchQuery, "i") } },
          ],
        }
      : {};

    let sortCriteria = {};
    switch (filter) {
      case "most_recent":
        sortCriteria = { createdAt: -1 }; // Sort by creation time, newest first
        break;
      case "oldest":
        sortCriteria = { createdAt: 1 };
        break;
      case "most_voted":
        sortCriteria = { upvotes: -1 };
        break;
      case "most_viewed":
        sortCriteria = { views: -1 };
        break;
      case "most_answered":
        sortCriteria = { answers: -1 };
        break;

      default:
        sortCriteria = { createdAt: -1 }; // Default sorting
    }

    const totalQuestions = await User.findOne({ clerkId })
      .populate({
        path: "saved",
        match: query,
        select: "_id", // Only select the ids for counting
      })
      .then((result) => (result ? result.saved.length : 0));

    const userInfo = await User.findOne({
      clerkId,
    }).populate({
      path: "saved",
      model: Question,
      match: query,
      options: {
        sort: sortCriteria,
        skip: page > 0 ? (page - 1) * pageSize : 0,
        limit: pageSize,
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

    const isLastPage =
      (page - 1) * pageSize + userInfo.saved.length >= totalQuestions;

    if (!userInfo) {
      throw new Error("User not found");
    }
    return { savedQuestion: userInfo.saved, isLastPage }; // This will have the user info along with saved questions and their tags populated
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });
    const questions = await Question.find({ author: userId })
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ views: -1, upvotes: -1 })
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize);

    const islastPage = totalQuestions <= page * pageSize;

    return { totalQuestions, questions, islastPage };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });
    const answers = await Answer.find({ author: userId })
      .populate({
        path: "question",
        model: Question,
      })
      .populate({
        path: "author",
        model: User,
      })

      .sort({ upvotes: -1 })
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize);

    const islastPage = totalAnswers <= page * pageSize;

    return { totalAnswers, answers, islastPage };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUserInfo(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    // update clerk
    let firstName = "";
    let lastName = "";
    if (updateData.name) {
      const names = updateData.name.trim().split(" ");
      firstName = names[0];
      lastName = names.slice(1).join(" ");
    }

    const clerkUpdateData = {
      username: updateData.username,
      firstName,
      lastName,
    };

    await clerkClient.users.updateUser(clerkId, clerkUpdateData);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
