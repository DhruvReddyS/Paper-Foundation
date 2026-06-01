import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import mongoose from "mongoose";
import {
  ArticleModel,
  MythModel,
  ResourceModel,
  QuizItemModel,
} from "../lib/models";
import { readingTimeMinutes } from "../lib/utils";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in .env");
    process.exit(1);
  }
  await mongoose.connect(uri, {
    dbName: new URL(uri).pathname.replace("/", "") || "paper_foundation",
  });
  console.log("Connected to MongoDB");

  const load = (file: string) =>
    JSON.parse(readFileSync(resolve(process.cwd(), "content/seed", file), "utf8"));

  const articles = load("articles.json");
  const myths = load("myths.json");
  const resources = load("resources.json");
  const quiz = load("quiz.json");

  let upArticles = 0;
  for (const a of articles) {
    a.readingTimeMin = readingTimeMinutes(a.body || "");
    if (a.status === "published" && !a.publishedAt) a.publishedAt = new Date();
    await ArticleModel.updateOne({ slug: a.slug }, { $set: a }, { upsert: true });
    upArticles++;
  }
  console.log(`Articles: upserted ${upArticles}`);

  let upMyths = 0;
  for (const m of myths) {
    await MythModel.updateOne({ slug: m.slug }, { $set: m }, { upsert: true });
    upMyths++;
  }
  console.log(`Myths: upserted ${upMyths}`);

  let upRes = 0;
  for (const r of resources) {
    await ResourceModel.updateOne({ slug: r.slug }, { $set: r }, { upsert: true });
    upRes++;
  }
  console.log(`Resources: upserted ${upRes}`);

  await QuizItemModel.deleteMany({});
  await QuizItemModel.insertMany(quiz);
  console.log(`Quiz items: ${quiz.length}`);

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
