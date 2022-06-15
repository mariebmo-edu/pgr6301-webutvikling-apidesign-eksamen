import { Link } from "react-router-dom";

export function TopBar({ user }) {
  const provider = user.microsoft
    ? "microsoft"
    : user.google
    ? "google"
    : "not logged in";

  return (
    <div className={"top-bar-container primary-background"}>
      <div className={"top-bar-content-container"}>
        <Link to={"/"} className={"not-link-link"}>
          <h1>IMPORTANT NEWS PAGE</h1>
        </Link>
        <div className={"logged-in-container"}>
          <Link to={"/"} className={"nav-button"}>
            Back
          </Link>
          {!user || Object.keys(user).length === 0 ? (
            <Link to={"/login"} className={"nav-button"}>
              Log in
            </Link>
          ) : (
            <div className={"nav-bar-title"}>
              <Link to={"/profile"} className={"nav-button"}>
                {user[provider].name}
              </Link>
              <Link
                to={"/login/endsession"}
                id={"log-out-btn"}
                className={"nav-button"}
              >
                Log out
              </Link>
              {user.microsoft && (
                <Link to={"/new"} className={"nav-button"}>
                  New Article
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
