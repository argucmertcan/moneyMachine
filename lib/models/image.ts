import { Schema, InferSchemaType, model, models } from 'mongoose';

const ImageSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    url: { type: String, required: true },
    altText: { type: String, default: '' },
    prompt: { type: String, required: true }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export type ImageDocument = InferSchemaType<typeof ImageSchema>;

export const ImageModel = models.Image || model<ImageDocument>('Image', ImageSchema);
