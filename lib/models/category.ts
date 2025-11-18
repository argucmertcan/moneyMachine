import { Schema, InferSchemaType, model, models } from 'mongoose';

const CategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

export type CategoryDocument = InferSchemaType<typeof CategorySchema>;

export const CategoryModel = models.Category || model<CategoryDocument>('Category', CategorySchema);
