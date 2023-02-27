import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";
import "dotenv/config";
import "./firebase/config.js";
import { getAuth } from "firebase-admin/auth";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from 'graphql-ws/lib/use/ws';


const uri = `mongodb+srv://samnguyen:${process.env.password}@cluster0.ghyvv82.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// you can use await without async function just change the file extension to .mjs
await server.start();
const authorization = async (req, res, next) => {
  const accessToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (req.headers.authorization) {
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodeToken) => {
        res.locals.uid = decodeToken.uid;
        next();
      })
      .catch((error) => {
        return res.status(403).json({ message: "Forbidden", error });
      });
  } else {
    next()
    // return res.status(401).json({ message: "Unauthorized" });
  }
};
app.use(
  cors(),
  authorization,
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);
mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("connected database");
    await new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`server listen with port ${port}`);
  });

console.log("server ready");
