import { Schema, model, Document, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions?: Schema.Types.ObjectId[];
  followers?: Schema.Types.ObjectId[];
  createdOn: Date;
}

// 2. Create a Schema corresponding to the document interface.
const tagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, immutable: true, default: Date.now() },
});

export const Tag = models.Tag || model("Tag", tagSchema);
