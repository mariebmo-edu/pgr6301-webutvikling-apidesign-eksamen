import { fetchJSON, postJSON } from "../utils/jsonUtils";
import React from "react";

export const NewsApiContext = React.createContext({
  async listNews(query) {
    return await fetchJSON("/api/news?" + new URLSearchParams(query));
  },

  async createNewsArticle(news) {
    return await postJSON("/api/news", news);
  },

  async getNewsArticle(title) {
    return await fetchJSON("/api/news/article?" + new URLSearchParams(title));
  },
});
