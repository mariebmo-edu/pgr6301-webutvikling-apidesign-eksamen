import { ErrorState } from "../components/states/errorState";

export function ProfilePage({ user }) {
  if (Object.keys(user)[0] === "microsoft") {
    user = user["microsoft"];
    user.picture =
      "https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg";
    user.authority = "Admin";
  } else if (Object.keys(user)[0] === "google") {
    user = user["google"];
    user.authority = "User";
  } else {
    return (
      <ErrorState
        error={"Your profile is not recognized. Have you logged in?"}
      />
    );
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>{user.authority}</h2>
      <img src={user.picture} alt={"profile picture of " + user.name} />
      <p>Email: {user.email}</p>
    </>
  );
}
