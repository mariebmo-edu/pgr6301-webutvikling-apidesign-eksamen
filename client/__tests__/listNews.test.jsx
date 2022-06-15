import ReactDOM from "react-dom";
import { NewsPage } from "../pages/newsPage";
import { NewsApiContext } from "../context/newsApiContext";
import { act, Simulate } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";

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
    categories: ["weather", "data3"],
    content: "this is the content",
  },
  {
    title: "testArticle4",
    authors: ["Student4"],
    image: "url4",
    categories: ["test4", "weather"],
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

describe("NewsPage component", () => {
  it("shows loading screen", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<NewsPage />, domElement);
    expect(
      Array.from(domElement.querySelectorAll("h2")).map((e) => e.innerHTML)
    ).toEqual(["Loading..."]);
    expect(domElement).toMatchSnapshot();
  });

  it("shows error screen", async () => {
    const domElement = document.createElement("div");
    await act(async () => {
      const listNews = () => {
        throw new Error("Something went wrong");
      };

      ReactDOM.render(
        <Router>
          <NewsApiContext.Provider value={{ listNews }}>
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

  it("shows news", async () => {
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <Router>
          <NewsApiContext.Provider value={{ listNews: () => news }}>
            <NewsPage />
          </NewsApiContext.Provider>
        </Router>,
        domElement
      );
    });
    expect(
      Array.from(domElement.querySelectorAll("h1")).map((e) => e.innerHTML)
    ).toEqual([
      "testArticle0",
      "testArticle1",
      "testArticle2",
      "testArticle3",
      "testArticle4",
      "testArticle5",
    ]);
    expect(domElement).toMatchSnapshot();
  });

  it("shows news category", async () => {
    const domElement = document.createElement("div");
    const listNews = jest.fn(() => []);

    await act(async () => {
      ReactDOM.render(
        <Router>
          <NewsApiContext.Provider value={{ listNews }}>
            <NewsPage />
          </NewsApiContext.Provider>
        </Router>,
        domElement
      );
    });

    Simulate.change(domElement.querySelector("#categories"), {
      target: { value: "weather" },
    });
    await act(async () => {
      Simulate.submit(domElement.querySelector("form"));
    });

    expect(listNews).toHaveBeenCalledWith({ category: "weather" });
  });
});
