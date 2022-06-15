import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginCallbackPage } from "./loginCallbackPage";
import { LoginApiContext } from "../context/loginApiContext";
import { WaitingState } from "../components/states/waitingState";
import { LoginButton } from "../components/modules/loginButton";

//Login is based on my mock-exam, which is heavily influenced by the lecture 12 reference
// I've added comments to show I understand how the code works.

export function EndSession({ reload }) {
  //removes the cookies (endSession) and redirects user to root.
  const navigate = useNavigate();
  const { endSession } = useContext(LoginApiContext);
  useEffect(async () => {
    await endSession();
    reload();
    navigate("/");
  });

  return <WaitingState />;
}

export function StartLogin({ config }) {
  return (
    <div className={"center-buttons"}>
      <LoginButton
        image={
          "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
        }
        config={config}
        provider={"google"}
      />
      <br />
      <LoginButton
        image={
          "https://img.cppng.com/download/2020-06/28348-7-microsoft-logo-hd.png"
        }
        config={config}
        provider={"microsoft"}
      />
    </div>
  );
}

export function LoginPage({ config, reload }) {
  //returns routes connected to the different components inside LoginPage.
  //Start Login -> Buttons to take you to the corresponding OpenId provider
  //provider/callback -> The landing page after logging in, handles codes -> token and token -> cookie-exchange
  //endsession -> logs the user out
  //Start Login (again) - If you access any other link after /login, you are redirected to StartLogin.

  return (
    <div className={"window-content-container"}>
      <Routes>
        <Route path={"/"} element={<StartLogin config={config} />} />
        <Route
          path={"/:provider/callback"}
          element={<LoginCallbackPage config={config} reload={reload} />}
        />
        <Route path={"/endsession"} element={<EndSession reload={reload} />} />
        <Route path={"*"} element={<StartLogin config={config} />} />
      </Routes>
    </div>
  );
}
