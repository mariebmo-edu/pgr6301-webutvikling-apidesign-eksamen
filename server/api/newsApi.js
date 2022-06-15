import express from "express";
import dotenv from "dotenv";

dotenv.config();

export function NewsApi({ mongoDb, getSockets }) {
  const router = express.Router();
  router.get("/", getNews);
  router.get("/article", getNewsArticle);
  router.post("/", postNews);

  async function getNews(req, res) {
    const query = {};
    const { category } = req.query;

    if (category) {
      query.categories = { $in: [category] };
    }

    try {
      const news = await mongoDb

        .collection("news")
        .find(query)
        .map(({ title, image, categories, authors }) => ({
          title,
          image,
          categories,
          authors,
        }))
        .limit(15)
        .toArray();

      return res.json(news);
    } catch (e) {
      return res.sendStatus(e.status);
    }
  }

  async function postNews(req, res) {
    const { title, authors, image, categories, content } = req.body;

    const exists = await mongoDb.collection("news").findOne({ title });

    if (!exists) {
      await mongoDb
        .collection("news")
        .insertOne({ title, authors, image, categories, content });

      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }

    const sockets = getSockets();

    for (const recipient of sockets) {
      recipient.send(title);
    }
  }

  async function getNewsArticle(req, res) {
    let { paramTitle } = req.query;

    if (paramTitle) {
      try {
        const article = await mongoDb
          .collection("news")
          .findOne({ title: { $regex: new RegExp(paramTitle, "i") } });
        return res.json(article);
      } catch (e) {
        console.log("ERROR");
        return res.sendStatus(e.status);
      }
    } else {
      return res.sendStatus(404);
    }
  }

  return router;
}
