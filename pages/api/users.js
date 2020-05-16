/* eslint-disable @typescript-eslint/explicit-function-return-type */
import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { verify } from "jsonwebtoken";

const authenticated = (fn) => async (req, res) => {
  verify(
    req.headers.authorization,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(401).send({ message: "you are not authenticated" });
    }
  );
  return await fn(req, res);
};

const handler = nextConnect();

handler.use(middleware);

handler.get(
  authenticated(async (req, res) => {
    const doc = await req.db.collection(process.env.MONGO_COLLECTION).findOne();
    res.json(doc);
  })
);

export default handler;
