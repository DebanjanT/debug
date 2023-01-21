import express from "express";
import cors from "cors";
const morgan = require("morgan");
require("dotenv").config();
import { readdirSync } from "fs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { handleApiKey, handleApiToken } from "./middleware/apiMd";
import { sendSlackMessage } from "./utils/slack";
import { reqBlocker } from "./middleware/reqblocker";
// import redis from "redis";
const logger = require("./utils/logger");
const dns = require("dns");
const { createServer } = require("http");
const si = require("systeminformation");
var CronJob = require("cron").CronJob;
var useragent = require("express-useragent");
const { Server } = require("socket.io");
// const { graphqlHTTP } = require("express-graphql");
// const { schema } = require("./graphql/typeDefs");
// const { resolvers } = require("./graphql/resolvers");

// ** create express app
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FTND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });

// use limit to express to allow user image upload upto 5mb , this is required to avoid "payload too large error" while api hit
app.use(express.json({ limit: "5mb" }));
app.use(cors());

// {
//   origin:
//     process.env.NODE_ENV === "Development"
//       ? "http://localhost:3000"
//       : "https://ysg-api-hrku.herokuapp.com",
// }
//morgan for debug requestsß
app.use(morgan("tiny"));
app.use(useragent.express());
app.use(reqBlocker);
app.use(cookieParser());

//Running Cron job in every 30 minutes
var job = new CronJob(
  "*/30 * * * *",
  async function () {
    console.log("[SLACK]: Sending slack message...");
  },
  null,
  true,
  "Asia/Kolkata"
);

/**
 *  routes using fileSystem of node by for loop after reading router folder
 */
readdirSync("./routes").map((r) =>
  app.use("/api/v1", require(`./routes/${r}`))
);

/**
 * These are YSGAPI-Node SDK library routes.
 * (Only for using sdk operation not for direct web client request from badminton.zclouds.in)
 */
readdirSync("./sdkroutes").map((r) =>
  app.use(
    "/api/sdk/v1",
    // handleApiToken,
    // handleApiKey,
    require(`./sdkroutes/${r}`)
  )
);

//Aws health check

/**
 * This is under developed graphql endpoint for zclouds
 */
// app.use(
//   "/gql",
//   graphqlHTTP({
//     graphiql: true,
//     schema: schema,
//     rootValue: resolvers,
//   })
// );

/**
 * Connecting mongoose ORM to mongodb atlas db <mongoURI> string
 */
mongoose

  .connect(process.env.LOCALDB)
  .then(() => console.log("🔘 [Database] : Atlas db connected"))
  .catch(
    async (err) =>
      await sendSlackMessage({
        text: `Database connection error at ${new Date(
          Date.now()
        ).toLocaleString()} => ${JSON.stringify(err, null, 4)}`,
      })
  );

/**
 * @default process.env.PORT
 * Initiating specific PORT for statring the server
 */
const port = process.env.PORT || 8000;
io.attach(httpServer);
global.io = io;
/**
 * Initiating server-side socket connection
 */
io.on("connection", (socket) => {
  /**
   * Displaying connected socket client id
   */
  console.log(`🔘 [Socket] : Connected ${socket.id}`);

  // Join user to the match page
  socket.on("join_match", (tournamentId) => {
    socket.join(tournamentId);
    console.log(`User connected with id ${tournamentId}`);
  });

  //send and emit the message
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("live_status", (data) => {
    socket.to(data.room).emit("receive_live_status", data);
  });
  //Recieve live match details
  socket.on("send_live_match_details", (data) => {
    socket.to(data.room).emit("recieve_live_match_details", data.match_data);
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

/**
 * Starting Express + httpSocekt Server at default PORT:8000
 */

httpServer.listen(port, () => {
  // logger.filelogger.log("info", "Server started");
  console.log(`Server Started on PORT: ${port}`);
});






//Error In Console
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

/Users/debanjantewary/Desktop/YSG/server/node_modules/@redis/client/dist/lib/cluster/cluster-slots.js:65
            if (node.client.options?.readonly)
                                    ^

SyntaxError: Invalid or unexpected token
    at Module._extensions..js (node:internal/modules/cjs/loader:1272:10)

Node.js v18.13.0
[nodemon] app crashed - waiting for file changes before starting...


