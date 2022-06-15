import { fetchJSON } from "../utils/jsonServerUtils.js";
import fetch from "node-fetch";

//Login is based on my mock-exam, which is heavily influenced by lecture 12 reference -
// I've added comments to show I understand how the code works. I've also added Active Directory.

//removes the cookies - making the user "logged out"
export function deleteCookie(req, res) {
  res.clearCookie("google_access_token");
  res.clearCookie("microsoft_access_token");
  res.sendStatus(200);
}

//gets the provider from the url parameters, and access-token from the body. It creates a cookie named after the provider, and signs the cookie.
export function setCookieFromToken(req, res) {
  const { provider } = req.params;
  const { access_token } = req.body;

  console.log(provider + "  " + access_token);
  res.cookie(`${provider}_access_token`, access_token, { signed: true });
  res.sendStatus(200);
}

export async function fetchUser(access_token, config) {
  //sets the user info set in the scope based on the request to the userinfo-endpoint from the config and access_token
  const userInfo = await fetch(config.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  //if the info is okay, it returns the info as a json, else it returns undefined.
  if (userInfo.ok) {
    return await userInfo.json();
  } else {
    return undefined;
  }
}

//aquires the different configs, and sets a default (empty) user as response - to handle non-logged in users.
export async function getUserData(req, res) {
  const config = {
    google: await googleConfig(),
    microsoft: await microsoftConfig(),
  };

  const response = { config, user: {} };

  //looks at the browsers signed cookies and keeps them if they exist
  const { google_access_token, microsoft_access_token } = req.signedCookies;

  //if there is a google_access_token, it calls fetchUser with the access-token and correct config. It sets the response user to the result.
  if (google_access_token) {
    response.user.google = await fetchUser(google_access_token, config.google);
  }

  //if there is a microsoft_access_token, it calls fetchUser with the access-token and correct config. It sets the response user to the result.

  if (microsoft_access_token) {
    response.user.microsoft = await fetchUser(
      microsoft_access_token,
      config.microsoft
    );
  }

  //it returns the response - either an empty user object, or with the aquired response.
  res.json(response);
}

//Configuration for connecting to Google
export async function googleConfig() {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const discovery_endpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const { userinfo_endpoint, authorization_endpoint } = await fetchJSON(
    discovery_endpoint
  );

  return {
    response_type: "token",
    authorization_endpoint,
    scope: "profile email",
    userinfo_endpoint,
    client_id,
  };
}

//Configuration for connecting to Active Directory - uses token_endpoint and s256 - as well as different scope.
export async function microsoftConfig() {
  const client_id = process.env.AZURE_CLIENT_ID;
  const discovery_endpoint =
    "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration";
  const { userinfo_endpoint, authorization_endpoint, token_endpoint } =
    await fetchJSON(discovery_endpoint);

  return {
    response_type: "code",
    authorization_endpoint,
    code_challenge_method: "S256",
    scope: "openid profile",
    userinfo_endpoint,
    client_id,
    token_endpoint,
  };
}
