import { Schema, model, Document, models } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdOn: Date;
}

// 2. Create a Schema corresponding to the document interface.
const tagSchema = new Schema<IInteraction>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdOn: { type: Date, immutable: true, default: Date.now() },
});

export const Interaction =
  models.Interaction || model("Interaction", tagSchema);
