import ReactDOM from "react-dom";
import { NewsPage } from "../pages/newsPage";
import { ArticlePage } from "../pages/articlePage";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import { NewsApiContext } from "../context/newsApiContext";

describe("ArticlePage component", () => {
  it("shows loading screen", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ArticlePage />, domElement);
    expect(
      Array.from(domElement.querySelectorAll("h2")).map((e) => e.innerHTML)
    ).toEqual(["Loading..."]);
    expect(domElement).toMatchSnapshot();
  });

  it("shows error screen", async () => {
    const domElement = document.createElement("div");
    await act(async () => {
      const getNewsArticle = () => {
        throw new Error("Something went wrong");
      };

      ReactDOM.render(
        <Router>
          <NewsApiContext.Provider value={{ getNewsArticle }}>
            <NewsPage />
          </NewsApiContext.Provider>
        </Router>,
        domElement
      );
    });
    expect(
      Array.from(domElement.querySelectorAll("h2")).map((e) => e.innerHTML)
    ).toEqual(["ERROR"]);
    expect(domElement).toMatchSnapshot();
  });

  const article = {
    title: "testArticle0",
    authors: ["Student0"],
    image: "url0",
    categories: ["test0", "data0"],
    content: "this is the content",
  };

  it("shows article", async () => {
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <Router>
          <NewsApiContext.Provider value={{ getNewsArticle: () => article }}>
            <ArticlePage />
          </NewsApiContext.Provider>
        </Router>,
        domElement
      );
    });
    expect(
      Array.from(domElement.querySelectorAll("h1")).map((e) => e.innerHTML)
    ).toEqual(["testArticle0"]);
    expect(domElement).toMatchSnapshot();
  });
});
