import { Schema, InferSchemaType, model, models, Types } from 'mongoose';

const PostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true
    },
    language: {
      type: String,
      enum: ['tr', 'en'],
      default: 'en',
      index: true
    },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    publishedAt: { type: Date }
  },
  {
    timestamps: true
  }
);

export type PostDocument = InferSchemaType<typeof PostSchema> & {
  categoryId: Types.ObjectId;
  images: Types.ObjectId[];
};

export const PostModel = models.Post || model<PostDocument>('Post', PostSchema);
