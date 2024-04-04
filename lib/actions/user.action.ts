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
    connectToDatabase();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return users;
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

    const { clerkId, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const userInfo = await User.findOne({
      clerkId,
    }).populate({
      path: "saved",
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
    }); // Execute the query
    if (!userInfo) {
      throw new Error("User not found");
    }
    return { savedQuestion: userInfo.saved }; // This will have the user info along with saved questions and their tags populated
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 0 } = params;

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

    return { totalQuestions, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 0 } = params;

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

    return { totalAnswers, answers };
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
