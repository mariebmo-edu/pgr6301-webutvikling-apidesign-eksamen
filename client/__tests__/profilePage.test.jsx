import ReactDOM from "react-dom";
import { ProfilePage } from "../pages/profilePage";

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

describe("Profile page component", () => {
  it("shows logged in google-user", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ProfilePage user={user[0]} />, domElement);
    expect(
      Array.from(domElement.querySelectorAll("h1")).map((e) => e.innerHTML)
    ).toEqual(["test user"]);

    expect(
      Array.from(domElement.querySelectorAll("h2")).map((e) => e.innerHTML)
    ).toEqual(["User"]);

    expect(domElement).toMatchSnapshot();
  });

  it("shows logged in microsoft-user", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ProfilePage user={user[1]} />, domElement);
    expect(
      Array.from(domElement.querySelectorAll("h1")).map((e) => e.innerHTML)
    ).toEqual(["test user 2"]);

    expect(
      Array.from(domElement.querySelectorAll("h2")).map((e) => e.innerHTML)
    ).toEqual(["Admin"]);

    expect(domElement).toMatchSnapshot();
  });

  it("shows not logged in", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ProfilePage user={user[2]} />, domElement);
    expect(
      Array.from(domElement.querySelectorAll("h2")).map((e) => e.innerHTML)
    ).toEqual(["ERROR"]);

    expect(
      Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["Your profile is not recognized. Have you logged in?"]);

    expect(domElement).toMatchSnapshot();
  });
});
