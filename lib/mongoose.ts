import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing MONGODB_URL");
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    console.log("using new database connection");
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });
    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("error connecting to database", error);
  }
};

export const createQuestion = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("error creating question", error);
  }
};
