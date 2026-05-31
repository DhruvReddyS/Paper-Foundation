import mongoose, { Schema, type InferSchemaType, type Model, models, model } from "mongoose";

/* ------------------------------ Article ------------------------------ */
const ReferenceSchema = new Schema(
  {
    title: { type: String, required: true },
    org: { type: String, required: true },
    url: { type: String, required: true },
    note: { type: String, default: "" },
  },
  { _id: false }
);

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      enum: [
        "forests",
        "recycling",
        "digital-vs-paper",
        "industry",
        "circularity",
        "policy",
        "research",
      ],
      required: true,
    },
    author: { type: String, default: "Paper Foundation Editorial" },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "" },
    },
    excerpt: { type: String, required: true },
    body: { type: String, required: true }, // HTML
    references: { type: [ReferenceSchema], default: [] },
    tags: { type: [String], default: [] },
    quickRead: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    publishedAt: { type: Date },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      ogImage: { type: String, default: "" },
    },
    readingTimeMin: { type: Number, default: 5 },
  },
  { timestamps: true }
);

/* ------------------------------ Myth ------------------------------ */
const MythSourceSchema = new Schema(
  { org: { type: String, required: true }, url: { type: String, required: true } },
  { _id: false }
);

const MythSchema = new Schema(
  {
    myth: { type: String, required: true },
    fact: { type: String, required: true },
    explanation: { type: String, required: true },
    category: {
      type: String,
      enum: ["forests", "recycling", "digital-vs-paper", "industry", "circularity"],
      required: true,
      index: true,
    },
    sources: { type: [MythSourceSchema], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    featured: { type: Boolean, default: false },
    slug: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

/* ------------------------------ Resource ------------------------------ */
const ResourceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      enum: ["report", "guide", "infographic", "dataset", "policy"],
      required: true,
    },
    org: { type: String, required: true },
    year: { type: Number },
    fileUrl: { type: String, required: true },
    fileSize: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    summary: { type: String, required: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  },
  { timestamps: true }
);

/* ------------------------------ Inquiry ------------------------------ */
const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    org: { type: String, default: "" },
    type: {
      type: String,
      enum: ["partnership", "press", "general", "volunteer", "research"],
      default: "general",
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in-review", "replied", "closed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

/* ------------------------------ Subscriber ------------------------------ */
const SubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    source: { type: String, default: "homepage" },
    confirmedAt: { type: Date },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true }
);

/* ------------------------------ QuizItem ------------------------------ */
const QuizItemSchema = new Schema(
  {
    statement: { type: String, required: true },
    answer: { type: Boolean, required: true },
    explanation: { type: String, required: true },
    sources: { type: [MythSourceSchema], default: [] },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* ------------------------------ Exports ------------------------------ */
export type Article = InferSchemaType<typeof ArticleSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type Myth = InferSchemaType<typeof MythSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type Resource = InferSchemaType<typeof ResourceSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type Inquiry = InferSchemaType<typeof InquirySchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type Subscriber = InferSchemaType<typeof SubscriberSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type QuizItem = InferSchemaType<typeof QuizItemSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ArticleModel: Model<Article> =
  (models.Article as Model<Article>) || model<Article>("Article", ArticleSchema);
export const MythModel: Model<Myth> =
  (models.Myth as Model<Myth>) || model<Myth>("Myth", MythSchema);
export const ResourceModel: Model<Resource> =
  (models.Resource as Model<Resource>) || model<Resource>("Resource", ResourceSchema);
export const InquiryModel: Model<Inquiry> =
  (models.Inquiry as Model<Inquiry>) || model<Inquiry>("Inquiry", InquirySchema);
export const SubscriberModel: Model<Subscriber> =
  (models.Subscriber as Model<Subscriber>) || model<Subscriber>("Subscriber", SubscriberSchema);
export const QuizItemModel: Model<QuizItem> =
  (models.QuizItem as Model<QuizItem>) || model<QuizItem>("QuizItem", QuizItemSchema);
