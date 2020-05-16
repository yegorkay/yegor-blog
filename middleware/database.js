/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const MONGO_CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_URI}`;

const client = new MongoClient(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, _res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("achievement-db");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
