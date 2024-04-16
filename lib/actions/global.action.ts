"use server";

import { getQuestions } from "./question.action";
import { getAllTags } from "./tag.action";
export async function globalSearch(
  type: string | null,
  globalText: string | null
) {
  if (!type && !globalText) return [];

  const searchQuery = globalText.trim();
  let items: any[] = [];
  console.log(searchQuery);
  try {
    switch (type) {
      case "question": {
        const result = await getQuestions({ searchQuery, pageSize: 8 });
        items.push(...result.questions);
        break;
      }
      case "tag": {
        const result = await getAllTags({ searchQuery, pageSize: 8 });
        items.push(...(result?.tags || []));
        break;
      }
      default: {
        // Fetch both questions and tags with smaller pageSize when type is not specified
        const questionResult = await getQuestions({ searchQuery, pageSize: 2 });
        const tagResult = await getAllTags({ searchQuery, pageSize: 2 });
        items = [...questionResult.questions, ...(tagResult?.tags || [])];
        break;
      }
    }

    return items.map((item: any) => ({
      id: item._id.toString(), // Ensuring _id is converted to string
      title: item.title || item.name, // Handling different property names
      type: "test", // Static value for demonstration purposes
    }));
  } catch (error) {
    console.error("Error during global search:", error);
    throw new Error("Search operation failed");
  }
}
