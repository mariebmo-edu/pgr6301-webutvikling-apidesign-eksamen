import request from "supertest";
import express from "express";
import { NewsApi } from "../api/newsApi";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
let mongoClient;

function getSockets() {
  return [];
}

beforeAll(async () => {
  //Database

  mongoClient = new MongoClient(process.env.MONGODB_URL);
  await mongoClient.connect().then(async () => {
    const mongoDb = mongoClient.db("unit_tests");
    await mongoDb.collection("news").deleteMany({});
    console.log("Connected to MongoDB");
    app.use("/api/news", NewsApi({ mongoDb, getSockets }));
  });
});

afterAll(() => {
  mongoClient.close();
});

const news = [
  {
    title: "testArticle0",
    authors: ["Student0"],
    image: "url0",
    categories: ["test0", "data0"],
    content: "this is the content",
  },
  {
    title: "testArticle1",
    authors: ["Student1"],
    image: "url1",
    categories: ["test1", "data1"],
    content: "this is the content",
  },
  {
    title: "testArticle2",
    authors: ["Student2"],
    image: "url2",
    categories: ["test2", "data2"],
    content: "this is the content",
  },
  {
    title: "testArticle3",
    authors: ["Student3"],
    image: "url3",
    categories: ["test3", "data3"],
    content: "this is the content",
  },
  {
    title: "testArticle4",
    authors: ["Student4"],
    image: "url4",
    categories: ["test4", "data4"],
    content: "this is the content",
  },
  {
    title: "testArticle5",
    authors: ["Student5"],
    image: "url5",
    categories: ["test5", "data5"],
    content: "this is the content",
  },
];

describe("news api", () => {
  it("adds a new article", async () => {
    const article = news[0];

    await request(app).post("/api/news").send(article).expect(200);

    expect(
      (
        await request(app)
          .get("/api/news")
          .query({ title: article.title })
          .expect(200)
      ).body.map(({ title }) => title)
    ).toContain(article.title);
  });

  it("lists all news", async () => {
    const article1 = news[1];
    const article2 = news[2];

    await request(app).post("/api/news").send(article1).expect(200);

    await request(app).post("/api/news").send(article2).expect(200);

    expect(
      (await request(app).get("/api/news").query({}).expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain(article1.title);
  });

  it("doesn't let user post duplicates", async () => {
    const article1 = news[3];
    const article2 = news[3];

    await request(app).post("/api/news").send(article1).expect(200);

    await request(app).post("/api/news").send(article2).expect(400);
  });

  it("gets a single article", async () => {
    const article = news[5];

    await request(app).post("/api/news").send(article).expect(200);

    expect(
      (
        await request(app)
          .get("/api/news/article?paramTitle=testArticle5")
          .expect(200)
      ).body.title
    ).toContain(article.title);
  });
});
