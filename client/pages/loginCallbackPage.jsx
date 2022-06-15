import { useContext, useEffect, useState } from "react";
import { WaitingState } from "../components/states/waitingState";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorState } from "../components/states/errorState";
import { LoginApiContext } from "../context/loginApiContext";

export function LoginCallbackPage({ reload, config }) {
  const { provider } = useParams();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { registerLogin } = useContext(LoginApiContext);

  //Login is based on my mock-exam, which is heavily influenced by the lecture 12 reference
  // I've added comments to show I understand how the code works.

  //useEffect is called once - making sure it doesn't run for ever.
  useEffect(async () => {
    //gets the different tokens/errors/states/code from the search parameters. Substrind to remove the first ?
    const { access_token, error, error_description, state, code } =
      Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1))
      );

    //the expected_state is set when clicking the login-button, being a random string of 50 characters. It is made to
    //make sure the request is sent from inside the application - and not elsewhere.
    const expected_state = window.sessionStorage.getItem("expected_state");
    if (!state || expected_state !== state) {
      setError("Unexpected State");
      return;
    }

    //if there is an error from the params, we're setting them here and exiting.
    if (error || error_description) {
      setError(`Error: ${error} ${error_description}`);
      return;
    }

    //if you got a code - we'll try to make it into a token!
    // We're getting the config from the login-page, and selecting the endpoints and client_id for that provider.
    if (code) {
      const { client_id, token_endpoint } = config[provider];

      //we're getting the code_verifier from the local session storage, again making sure it is the same person the whole time.
      const code_verifier = window.sessionStorage.getItem("code_verifier");

      //getting the payload ready to send to the token_endpoint to retrieve the final token
      const payload = {
        grant_type: "authorization_code",
        code,
        client_id,
        code_verifier,
        redirect_uri: window.location.origin + "/login/microsoft/callback",
      };

      //sending a post-request to the endpoint with the payload above - waiting to get a token back
      const res = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams(payload),
      });

      //if the response is not ok, we're setting an error and exiting.
      if (!res.ok) {
        setError(`Failed to fetch token, ${res.status} ${res.statusText}`);
        return;
      }

      //if everything is STILL going well, we're getting the access-token from the response. We're then trying to register the
      //login at our side, sending the provider and token to the API.
      const { access_token } = await res.json();
      await registerLogin(provider, { access_token });

      //WOO! Everything went as planned - we're going back to the main page, and reloading. Job done.
      navigate("/");
      reload();
      return;
    }

    //There's no access token. ERROR! exit.
    if (!access_token) {
      setError("Missing access_token");
      return;
    }

    //you got an access-token? We'll give you a shot! Let's register you!
    await registerLogin(provider, { access_token });
    reload();
    navigate("/");
  }, []);

  //Oopsie, error. We'll return an error-state
  if (error) {
    return (
      <>
        <ErrorState error={error} />
      </>
    );
  }

  //You'll either get a redirect or an error in a second, but just in case, here's some waiting music.
  return <WaitingState />;
}
