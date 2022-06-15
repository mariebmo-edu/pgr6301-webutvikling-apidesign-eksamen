import express from "express";
import {
  deleteCookie,
  getUserData,
  setCookieFromToken,
} from "../controller/loginController.js";

export function LoginApi() {
  const router = new express.Router();

  router.get("/", getUserData);
  router.post("/:provider", setCookieFromToken);
  router.delete("/", deleteCookie);

  return router;
}
