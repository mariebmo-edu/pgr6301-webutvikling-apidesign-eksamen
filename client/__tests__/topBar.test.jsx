import ReactDOM from "react-dom";
import { TopBar } from "../components/layout/topBar";
import { BrowserRouter as Router } from "react-router-dom";

const user = [
  {
    google: {
      picture: "/img/img",
      name: "test user",
      email: "test@user.com",
      authority: "User",
    },
  },

  {
    microsoft: {
      picture: "something",
      name: "test user 2",
      email: "test@user.com",
      authority: "Admin",
    },
  },
  {},
];

describe("top bar component", () => {
  it("handles admins", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(
      <Router>
        <TopBar user={user[1]} />
      </Router>,
      domElement
    );

    expect(domElement).toMatchSnapshot();
    expect(
      Array.from(domElement.querySelectorAll(".nav-button")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Back", "test user 2", "Log out", "New Article"]);
  });

  it("handles users", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(
      <Router>
        <TopBar user={user[0]} />
      </Router>,
      domElement
    );

    expect(domElement).toMatchSnapshot();
    expect(
      Array.from(domElement.querySelectorAll(".nav-button")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Back", "test user", "Log out"]);
  });

  it("handles others", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(
      <Router>
        <TopBar user={user[2]} />
      </Router>,
      domElement
    );

    expect(domElement).toMatchSnapshot();
    expect(
      Array.from(domElement.querySelectorAll(".nav-button")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Back", "Log in"]);
  });
});
