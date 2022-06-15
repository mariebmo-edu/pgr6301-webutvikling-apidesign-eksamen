import { randomString, sha256 } from "../../utils/securityUtils";

export function LoginButton({ config, image, provider }) {
  //Login is based on my mock-exam, which is heavily influenced by the lecture 12 reference
  // I've added comments to show I understand how the code works.

  //Let's handle the login!
  async function handleLogin() {
    //We'll get all the things we need from the config in the API
    const {
      authorization_endpoint,
      response_type,
      scope,
      client_id,
      code_challenge_method,
    } = config[provider];

    //Making sure the request isn't generated elsewhere
    const state = randomString(42);
    window.sessionStorage.setItem("expected_state", state);

    //Adding the parameters for the url
    const parameters = {
      response_type,
      response_mode: "fragment",
      client_id,
      state,
      scope,
      redirect_uri: `${window.location.origin}/login/${provider}/callback`,
    };

    //if the provider is using a code_challenge_method (such as microsoft) we're creating a code challenge using
    //s256.
    if (code_challenge_method) {
      const code_verifier = randomString(50);
      window.sessionStorage.setItem("code_verifier", code_verifier);
      parameters.code_challenge_method = code_challenge_method;
      parameters.code_challenge = await sha256(code_verifier);
    }

    //we're setting the link to be the authorization_endpoint of the config, plus the parameters assigned above.
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }

  return (
    <button className={"login-button"} onClick={handleLogin}>
      <img
        className={"button-image"}
        src={image}
        alt={"login with " + provider}
      />
      <span className={"login-button-text"}>Log in with {provider}</span>
    </button>
  );
}
