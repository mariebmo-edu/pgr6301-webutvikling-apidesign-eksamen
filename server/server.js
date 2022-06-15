import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { NewsApi } from "./api/newsApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { LoginApi } from "./api/loginApi.js";
import {
  fetchUser,
  googleConfig,
  microsoftConfig,
} from "./controller/loginController.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Websocket
const sockets = [];
const webSocketServer = new WebSocketServer({ noServer: true });

function getSockets() {
  return sockets;
}

//Database
const mongoClient = new MongoClient(process.env.MONGODB_URL);

mongoClient.connect().then(async () => {
  console.log("Connected to MongoDB");
  const mongoDb = mongoClient.db(process.env.MONGO_DATABASE);
  app.use("/api/news", NewsApi({ mongoDb, getSockets }));
});

app.use("/api/login", LoginApi());

//Middleware
app.use(express.static(path.resolve(__dirname, "..", "client", "dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

app.use(async (req, res, next) => {
  const { microsoft_access_token, google_access_token } = req.signedCookies;
  let user = undefined;

  if (microsoft_access_token) {
    const config = await microsoftConfig();
    user = await fetchUser(microsoft_access_token, config);
    if (user !== undefined) {
      user.provider = "microsoft";
    } else {
      res.clearCookie("microsoft_access_token");
    }
  } else if (google_access_token) {
    const config = await googleConfig();
    user = await fetchUser(google_access_token, config);
    if (user !== undefined) {
      user.provider = "google";
    } else {
      res.clearCookie("google_access_token");
    }
  }

  req.user = user;
  next();
});

app.use(protectedRoutes);

function protectedRoutes(req, res, next) {
  const adminRoutes = [];
  adminRoutes.push({ path: "/api/news", request: "POST" });
  adminRoutes.push({ path: "/api/news", request: "PUT" });
  adminRoutes.push({ path: "/api/news", request: "DELETE" });
  adminRoutes.push({ path: "/api/news", request: "DELETE" });

  const userRoutes = [];
  userRoutes.push({ path: "/api/news/article", request: "GET" });

  let isProtected = false;
  let isAdminProtected = false;

  for (let i = 0; i < adminRoutes.length; i++) {
    if (
      req.path.toLowerCase() === adminRoutes[i].path.toLowerCase() &&
      req.method.toLowerCase() === adminRoutes[i].request.toLowerCase()
    ) {
      console.info("protected - admin");
      isAdminProtected = true;
      break;
    }
  }

  for (let i = 0; i < userRoutes.length; i++) {
    if (
      req.path.toLowerCase() === userRoutes[i].path.toLowerCase() &&
      req.method.toLowerCase() === userRoutes[i].request.toLowerCase()
    ) {
      console.info("protected - user");
      isProtected = true;
      break;
    }
  }

  if (req.user) {
    if (
      isAdminProtected ||
      (isProtected && req.user.provider === "microsoft")
    ) {
      console.info("authorized admin " + req.method + " " + req.path);
      return next();
    } else if (!isAdminProtected && isProtected) {
      console.info("authorized user " + req.method + " " + req.path);
      return next();
    } else if (!isAdminProtected && !isProtected) {
      console.info("authorized user " + req.method + " " + req.path);
      return next();
    }
  }
  if (!isAdminProtected && !isProtected) {
    console.info("authorized non-user " + req.method + " " + req.path);
    return next();
  } else {
    console.info("nop");
    res.sendStatus(401);
  }
}

const server = app.listen(process.env.PORT || 3000, () => {
  console.info(`Server running on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    webSocketServer.handleUpgrade(req, socket, head, (socket) => {
      sockets.push(socket);
      webSocketServer.emit("connection", socket, req);
    });
  });
});
