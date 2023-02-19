import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from 'mongoose';
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/index.js';
import 'dotenv/config'



const uri = `mongodb+srv://samnguyen:${process.env.password}@cluster0.ghyvv82.mongodb.net/?retryWrites=true&w=majority`
const port = process.env.PORT || 4000
const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


// you can use await without async function just change the file extension to .mjs
await server.start();
app.use(cors(), express.json(), expressMiddleware(server));
mongoose.set('strictQuery', false)
mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('connected database')
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`server listen with port ${port}`)
})

console.log("server ready");
