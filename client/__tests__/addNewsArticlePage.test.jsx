import { BrowserRouter as Router } from "react-router-dom";
import { AddNewsArticlePage } from "../pages/addNewsArticlePage";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { NewsApiContext } from "../context/newsApiContext";

describe("Add news article component", () => {
  it("shows article form", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(
      <Router>
        <AddNewsArticlePage userName={"TestUser"} />
      </Router>,
      domElement
    );

    expect(domElement.innerHTML).toMatchSnapshot();
    expect(
      Array.from(domElement.querySelectorAll(".checkbox-label")).map(
        (element) => element.innerHTML
      )
    ).toEqual(
      [
        "corona",
        "international",
        "sport",
        "culture",
        "weather",
        "nature",
        "education",
        "local",
        "politics",
        "economy",
        "debate",
      ].sort()
    );
    expect(
      Array.from(domElement.querySelectorAll(".input-label")).map(
        (element) => element.innerHTML
      )
    ).toEqual(["Title:", "Image Url:", "Content:"]);
  });

  it("adds news article", () => {
    const createNewsArticle = jest.fn();
    const title = "Breaking News";

    const domElement = document.createElement("div");
    ReactDOM.render(
      <Router>
        <NewsApiContext.Provider value={{ createNewsArticle }}>
          <AddNewsArticlePage userName={"TestUser"} />
        </NewsApiContext.Provider>
      </Router>,
      domElement
    );

    Simulate.change(domElement.querySelector("#title-input"), {
      target: { value: title },
    });
    Simulate.change(domElement.querySelector("#content-input"), {
      target: {
        value:
          "BREAKING NEWS! Student is writing jest-tests to get great coverage.",
      },
    });
    Simulate.change(domElement.querySelector("#image-input"), {
      target: { value: "url/url" },
    });

    Simulate.submit(domElement.querySelector("form"));

    expect(createNewsArticle).toBeCalledTimes(1);
  });
});
