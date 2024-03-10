"use server";

import { IQuestion, Question } from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { Tag } from "@/database/tag.model";

export async function createQuestion(values: any) {
  // make an async

  try {
    connectToDatabase();
    const getTags = await createTag(values.tags);

    const question: IQuestion = await Question.create({
      title: values.title,
      content: values.explanation,
      tags: getTags,
    });
    await question.save();
    // const questions = await Question.find().populate("tags");
    // console.log(JSON.stringify(questions, null, 2));
  } catch (error) {
    console.log(error);
  }
}

async function createTag(tagArray: string[]) {
  const tagsIdArr: string[] = [];
  for (const tagObj of tagArray) {
    const tag = await Tag.findOne({ name: tagObj });
    if (!tag) {
      const newTag = await Tag.create({
        name: tagObj,
        description: tagObj,
      });
      tagsIdArr.push(newTag._id.toString());
    } else {
      tagsIdArr.push(tag._id.toString());
    }
  }
  return tagsIdArr;
}

// insert tag, check if tag exists, if not create tag, then insert question
