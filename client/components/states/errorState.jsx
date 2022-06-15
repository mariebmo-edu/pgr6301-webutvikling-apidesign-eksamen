import { Link } from "react-router-dom";

export function ErrorState({ error }) {
  const message = error.message ? error.message : error;
  let errorCode;

  try {
    errorCode = message.match(/(\d+)/)[0];
  } catch (e) {
    errorCode = "";
  }

  console.log(message.match(/(\d+)/));

  if (!error) {
    return (
      <div>
        <h2>ERROR</h2>
        <h3>Something went wrong</h3>
      </div>
    );
  }

  if (errorCode === "401") {
    return (
      <div>
        <p>Oops! Looks like you're not logged in. Would you like to log in?</p>
        <Link to={"/"}>Back</Link>
        <Link to={"/login"}>Log in</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>ERROR</h2>
      <h3>{message}</h3>
    </div>
  );
}
