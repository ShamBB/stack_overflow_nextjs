"use server";

import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import { Question } from "@/database/question.model";
import { User } from "@/database/user.mode";
import { Answer } from "@/database/answer.model";
import { Tag } from "@/database/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

// export async function globalSearch(
//   type: string | null,
//   globalText: string | null
// ) {
//   if (!globalText) return [];

//   const searchQuery = globalText.trim();
//   const items: any[] = [];

//   // Define the types to search for, defaulting to both if not specified
//   const typesToSearch = type ? [type] : ["question", "tag", "user"];
//   const pageSize = type ? 8 : 2;

//   try {
//     await connectToDatabase();

//     // Process each type in the array
//     for (const currentType of typesToSearch) {
//       switch (currentType) {
//         case "question": {
//           const result = await getQuestions({ searchQuery, pageSize });
//           const newQuestionArr = result.questions.map((item: any) => {
//             return { ...item.toJSON(), type: "Question" };
//           });
//           items.push(...newQuestionArr);
//           break;
//         }
//         case "tag": {
//           const result = await getAllTags({ searchQuery, pageSize });
//           const newTagArr = result?.tags.map((item: any) => {
//             return { ...item.toJSON(), type: "Tag" };
//           });
//           items.push(...(newTagArr || []));
//           break;
//         }
//         case "user": {
//           const result = await getAllUsers({ searchQuery, pageSize });
//           const userArr = result?.users.map((item: any) => {
//             return { ...item.toJSON(), type: "User" };
//           });
//           items.push(...(userArr || []));
//           break;
//         }
//       }
//     }

//     // Map the consolidated items to the desired structure
//     return items.map((item: any) => ({
//       id: item._id.toString(),
//       title: item.title || item.name,
//       type: item.type,
//     }));
//   } catch (error) {
//     console.error("Error during global search:", error);
//     throw new Error("Search operation failed");
//   }
// }

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;

    const regexQuery = { $regex: new RegExp(query || "", "i") };
    let results = <any[]>[];

    const modelsAndTypes = [
      {
        model: Question,
        searchField: "title",
        type: "question",
      },
      {
        model: User,
        searchField: "name",
        type: "user",
      },
      {
        model: Tag,
        searchField: "name",
        type: "tag",
      },
      {
        model: Answer,
        searchField: "content",
        type: "answer",
      },
    ];

    const typeLower = type?.toLocaleLowerCase();

    if (!typeLower && !SearchableTypes.includes(typeLower || "")) {
      for (const element of modelsAndTypes) {
        const queryResult = await element.model
          .find({
            [element.searchField]: regexQuery,
          })
          .limit(2);

        const extractedResult = queryResult.map((item) => ({
          title:
            element.type === "answer"
              ? `Answers contaning ${query}`
              : item[element.searchField],
          type: element.type,
          id:
            element.type === "user"
              ? item.clerkId
              : element.type === "answer"
              ? item.question
              : item._id,
        }));

        results.push(...extractedResult);
      }
    } else {
      const filteredModel = modelsAndTypes.find((item) => item.type === type);
      if (!filteredModel) {
        throw new Error("no such type");
      }

      const queryResult = await filteredModel.model
        .find({
          [filteredModel.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResult.map((item) => ({
        title:
          type === "answer"
            ? `Answers contaning ${query}`
            : item[filteredModel.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }

    return JSON.stringify(results || []);
  } catch (error) {
    console.error("Error during global search:", error);
    throw new Error("Search operation failed");
  }
}
