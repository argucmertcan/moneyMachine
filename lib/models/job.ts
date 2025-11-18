import { Schema, InferSchemaType, model, models } from 'mongoose';

const GenerationJobSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['post'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'running', 'done', 'failed'],
      default: 'pending',
      index: true
    },
    errorMessage: { type: String },
    metadata: { type: Schema.Types.Mixed, default: {} },
    startedAt: { type: Date },
    finishedAt: { type: Date }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export type GenerationJobDocument = InferSchemaType<typeof GenerationJobSchema>;

export const GenerationJobModel =
  models.GenerationJob || model<GenerationJobDocument>('GenerationJob', GenerationJobSchema);
