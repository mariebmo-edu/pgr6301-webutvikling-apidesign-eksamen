import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginPage } from "../pages/loginPage";

describe("Log in component", () => {
  it("shows login options", () => {
    const domElement = document.createElement("div");
    const config = {};
    const reload = {};
    ReactDOM.render(
      <Router>
        <LoginPage config={config} reload={reload} />
      </Router>,
      domElement
    );

    expect(domElement.innerHTML).toMatchSnapshot();
    expect(
      Array.from(domElement.querySelectorAll(".login-button-text")).map(
        (element) => element.innerHTML
      )
    ).toEqual(["Log in with google", "Log in with microsoft"]);
  });
});
